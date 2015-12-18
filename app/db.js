import mongoose, {
    connect, connection
}
from 'mongoose';
mongoose.connect('mongodb://localhost:27017/onboard');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
    console.log('db is open');
});

export default mongoose.connection;
