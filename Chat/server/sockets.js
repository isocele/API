const { User, Chat } = require('./schemas');

/// Pushes the newly sent messages to the database
function pushChat(conversationId, messageArray) {
    Chat.findOneAndUpdate({ _id: conversationId }, { $push: { logs: messageArray } }, (err, res) => {
    });
}

/// Loads the conversation's logs before sending it to the client
function loadChat(conversationId, callback) {
    Chat.findOne({ _id: conversationId }, (err, conv) => {
        if (conv.logs)
            callback({ logs: conv.logs });
        else
            callback({ logs: null });
    });
}

/// Finds if a conversation exists. If one does not exist, creates a new one
async function findChat(sender, receiver) {
    let conversation1 = await Chat.findOne({ 'firstUser.id': await sender.id, 'secondUser.id': await receiver.id }).lean();
    let conversation2 = await Chat.findOne({ 'firstUser.id': await receiver.id, 'secondUser.id': await sender.id }).lean();
    if (conversation1)
        return await conversation1._id;
    else if (conversation2)
        return await conversation2._id;
    else {
        let newConv = await new Chat({
            firstUser: sender,
            secondUser: receiver,
            logs: []
        });
        await newConv.save();
        return await newConv._id;
    }
}

async function Sockets(http) {
    const io = require('socket.io')(http);

    /// Allowing everyone to connect (should change)
    io.origins('*:*');

    /// Catches connection, returns the socket on connection
    io.on('connection', (socket) => {
        const token = socket.request._query['token'];
        let messageArray = [];
        let currentUser = {};
        let receiver = {};
        let conversationId = '';

        /// Checks whether or not the user exists. If he doesn't, disconnect the socket
        User.findOne({ token: token }, (err, user) => {
            if (err || !user)
                socket.disconnect();
            else
                currentUser = { name: user.name, email: user.email, id: user._id };
        })

        /// On start: tries to find a conversation between the currentUser and the receiver
        socket.on('start', (id, callback) => {
            User.findOne({ _id: id }, async (err, user) => {
                conversationId = await findChat(currentUser, receiver = { name: user.name, email: user.email, id: user._id });
                await loadChat(conversationId, callback);
            });
        });

        /// On message, displays the message
        socket.on('message', async (message, callback) => {
            // Je ne devrais pas avoir besoin de re find l'user => Beaucoup trop de requêtes pour rien
            // Je devrais vérifier s'il l'autre membre de la conversation est connecté. Si oui, je lui envoie le message, sinon je le save directement
            await messageArray.push(currentUser.name + ': ' + message);
            if (await messageArray.length > 15) {
                pushChat(conversationId, messageArray);
                messageArray = [];
            }
            await callback(currentUser.name + ': ' + message);
            // io to les membres de la conversation
        });

        /// Pushing the messageArray when the client disconnects
        socket.on('disconnect', () => {
            if (currentUser && receiver && conversationId) {
                pushChat(conversationId, messageArray);
            }
        });
    });

    return io;
}

module.exports = Sockets;