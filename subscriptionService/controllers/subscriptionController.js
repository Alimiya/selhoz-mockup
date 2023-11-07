exports.buySubscription = async (req, res) => {
    const { userId, plan } = req.params;
    const user = req.user;
    const plans = ['Free', 'Lite', 'Premium'];

    if (!plans.includes(plan)) {
        return res.status(400).json({ message: 'Неправильный план подписки' });
    }

    const planCost = plan === 'Lite' ? 1500 : plan === 'Premium' ? 2500 : 0;

    if (user.amount < planCost) {
        return res.status(400).json({ message: 'Недостаточно средств' });
    }

    if (plan === 'Premium' && user.subscription === 'Lite' && user.subscriptionExpiry > new Date()) {
        const daysRemaining = Math.ceil((user.subscriptionExpiry - new Date()) / (24 * 60 * 60 * 1000));
        const priceDifference = 2500 - 1500;
        const additionalCost = (priceDifference / 30) * daysRemaining;

        if (user.amount < additionalCost) {
            return res.status(400).json({ message: 'Недостаточно средств для перехода на Premium' });
        }

        user.amount -= additionalCost;
    }

    // Check if the user is purchasing the same subscription while the current one is active
    if (user.subscription === plan && user.subscriptionExpiry > new Date()) {
        // Extend the subscription duration by adding 30 days to the current expiry date
        user.subscriptionExpiry = new Date(user.subscriptionExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
        user.amount -= planCost;
    } else {
        // Deduct the subscription cost
        user.amount -= planCost;
        user.subscription = plan;
        user.subscriptionExpiry = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    // Save the updated user document to the database
    await user.save();

    res.json({ message: 'Подписка успешно куплена' });
};