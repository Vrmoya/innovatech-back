const { User } = require('../db');

const userGithubById = async (req, res) => {
    try {
        const { githubId } = req.params;
        const userGithub = await User.findOne({ where: { githubId, isActive: true } });
        res.status(200).json(userGithub);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

module.exports = userGithubById;