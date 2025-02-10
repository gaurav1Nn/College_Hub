const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    emailId: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    preferences: [String], // Content Based
    likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    createdAt: { type: Date, default: Date.now },
});

//Hasing before Saving Password
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bycrpt.hash(this.password, 12);
    next();
})

// Compare Password During Login
UserSchema.methods.comparePassword = function(candidatePassword){
    return bycrpt.compare(candidatePassword, this.password);
}

//Export MModel
module.exports = mongoose.model('User', UserSchema);