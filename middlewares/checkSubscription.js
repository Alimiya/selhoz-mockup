const UserModel = require('../userService/models/userModel')

async function checkSubscription (req, res, next) {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.subscription !== 'Free') {
        const currentDate = new Date();
        if (currentDate > user.subscriptionExpiry) {
            user.subscription = 'Free';
            await user.save();
        }
    }

    req.user = user;
    next();
}

module.exports = checkSubscription