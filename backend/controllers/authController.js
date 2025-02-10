const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    const {emailId, username, password, preferences} = req.body;
    try{
        console.log('Try Registering');
        
        const user = await User.create({emailId, username, password, preferences});
        console.log('Created User');
        
        const token = jwt.sign({id: user._id},'secretKey',{expiresIn: '1h'});
        res.json({token});
    }catch(err){
        res.status(400).json({message: "Error Registering the User", error: err});
    }
}

exports.login = async(req,res) => {
    const  {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return  res.status(401).json({message: "Invalid Username"});
    }else if(!(await user.comparePassword(password))){
        return  res.status(401).json({message: "Invalid Password"});
    }

    const token = jwt.sign({id: user._id}, 'secretKey',{expiresIn: '1h'});
    res.json({token});
}

// Get current user's profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching profile', error: err });
    }
};
