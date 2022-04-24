# SNS

| client / react | server / node.js | database / mongoDB |
| -------------- | ---------------- | ------------------ |
|                | postman          | mongoose           |
|                |                  |                    |

# Refactoring

| file            | middleware / end point           | import                                |
| --------------- | -------------------------------- | ------------------------------------- |
| server.js       | app.use('/api/users', userRoute) | userRoute = require('./routes/users') |
| server.js       | app.use('/api/auth', authRoute)  | authRoute = require('./routes/auth')  |
| server.js       | app.use('/api/posts', postRoute) | postRoute = require('./routes/posts') |
| routes/users.js |                                  |                                       |
| routes/auth.js  |                                  |                                       |
| routes/posts.js |                                  |                                       |

# Database

| file           | import                           | export                                              |
| -------------- | -------------------------------- | --------------------------------------------------- |
| models/User.js |                                  | module.exports = mongoose.model('User', UserSchema) |
| routes/auth.js | User = require('../models/User') |                                                     |

# mongoDB

| client / react | server / node.js | database / mongoDB |
| -------------- | ---------------- | ------------------ |
|                |                  | models/User.js     |
|                |                  | models/Post.js     |
