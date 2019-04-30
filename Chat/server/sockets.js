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
            callback(conv.logs);
        else
            callback(null);
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
                loadChat(conversationId, callback);
                socket.join(conversationId);
            });
        });

        /// On message, displays the message
        /// I'm stocking every message one by one for now, this will probably change later on
        socket.on('message', async (message, callback) => {
            let formattedMessage = currentUser.name + ' ' + currentUser.email + ': ' + message
            messageArray.push(formattedMessage);
            /// Should keep this to 15, and to remove this condition if the user is alone in the room
            //if (messageArray.length > 15) {
            pushChat(conversationId, messageArray);
            messageArray = [];
            //}
            io.to(conversationId).emit('message', formattedMessage);
            callback(true);
        });

        /// Pushing the messageArray when the client disconnects
        socket.on('disconnect', () => {
            if (currentUser && receiver && conversationId) {
                //pushChat(conversationId, messageArray);
                io.to(conversationId).emit('message', currentUser.name + ' has disconnected');
            }
        });
    });

    return io;
}

module.exports = Sockets;