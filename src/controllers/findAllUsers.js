const {User} = require('../db');

const findAllUsers = async (req, res) => {
try {
    const userList = await User.findAll();

    res.status(200).json(userList)
    
} catch (error) {
    res.status(500).json({error:error.message})
}
 

}
module.exports = findAllUsers;