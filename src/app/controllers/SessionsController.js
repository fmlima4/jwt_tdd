const {User} = require('../models');


class SessionsControler {
    async store(req,res){
        const { email, password} = req.body

        const user = await User.findOne({ where: { email }})

        console.log(user)

        if(!User){
            return res.status(401).json({message: 'user not found'});
        }

        if(!(await user.checkPassword(password))){
            console.log(password)
            return res.status(401).json({message: 'wrong password'});
        }

        return res.status(200).send();
    }
}

module.exports = new SessionsControler();