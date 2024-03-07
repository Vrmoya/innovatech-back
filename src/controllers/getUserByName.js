const { User } = require("../db.js");
const { Op } = require("sequelize");
const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const userName = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    res.status(200).json(userName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserByName;
