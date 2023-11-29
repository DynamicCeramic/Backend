const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true}
})

const timeslotSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
})

const User = mongoose.model('User', userSchema);
const Timeslot = mongoose.model('Timeslot', timeslotSchema);

module.exports = {User, Timeslot}