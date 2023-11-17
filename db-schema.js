const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: email, required: true },
    password: {type: String}
})

const timeslotSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
})

const User = mongoose.model('User', userSchema);
const Timeslot = mongoose.model('Timeslot', timeslotSchema);

module.exports = {User, Timeslot}