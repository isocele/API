# Chat

This application is built using [Express node.js Framework](https://koajs.com/) and [Socket.IO](https://socket.io/) and is used for the EpiCare project.
The application's default port is 8081, and is accessible through sockets on chat.epicare.fr.

All rights reserved

# Socket authentification

Openning a socket always requires authentification, thanks to the User token.

**Namespace** : `/`

**Data type** : `Query`

**Data constraints**:

```js
io.connect('endpoint', { query: 'token', transports: ['websocket'] });
```

**Data example**:
```js
io.connect('http://localhost:8081', { query: 'token=6d3c7a6c1b621bc131407150606f76d253bbcab0', transports: ['websocket'] });
```

# Socket endpoints
## Start

Allows the user to create a new conversation with a user. If a conversation already exists, loads history.

**Endpoint** : `start`

**Data type** : `parameter + callback`

**Data constraint**: 
```js
socket.emit('start', 'token', callback);
```

**Data example**: 
```js
socket.emit('start', '5caa16038afe1c1c8ce91adb', function());
```

**Response**: 
```js
callback({logs: logs});
```
*if the conversation doesn't exist, logs == null*

## Message
Allows the user to send message to an existing conversation.

*The user must be connected AND have already started a conversation throught the start Endpoint*

**Endpoint** : `message`

**Data type** : `parameter + callback`

**Data constraint**: 
```js
socket.emit('message', 'your message', callback);
```

**Data example**: 
```js
socket.emit('start', 'Hello world!', function());
```

**Response**: 
```js
callback('Username: ' + message);
```

## Example
**A basic example can be found in [index.html](index.html)**
