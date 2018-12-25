const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie-user:abcd1234@ds143474.mlab.com:43474/movie-api', { useNewUrlParser: true });

    mongoose.connection.on('open', () => {
         console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};