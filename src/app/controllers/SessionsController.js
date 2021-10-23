const {User} = require('../models');

class SessionsControler {
    async store(req,res){
        const { email, password} = req.body

        const user = await User.findOne({ where: { email }})

        if(!User){
            return res.status(401).json({message: 'user not found'});
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({message: 'wrong password'});
        }

        return res.json({user, token: user.generateToken()});
    }
}

module.exports = new SessionsControler();