const PostModel = require('../models/postModel')
const UserModel = require('../../userService/models/userModel')

exports.createPost = async (req, res) => {
    try {
        const { title, description, price, city, region, subscriptionType } = req.body
        const userId = req.params.id
        console.log("id"+userId)
        const user = await UserModel.findById(userId)
        console.log("user"+user)

        if (subscriptionType === 'Free' && user.subscription === 'Free') {
            const newPost = new PostModel({
                title,
                description,
                price,
                city,
                region,
                subscriptionType,
                userId:userId
            })
            await newPost.save()
            res.json({ message: 'Post successfully created' })
        } else if (subscriptionType === 'Lite' && user.subscription === 'Lite' && user.postsLite < 1) {
            const newPost = new PostModel({
                title,
                description,
                price,
                city,
                region,
                subscriptionType,
            })
            await newPost.save()
            user.postsLite = 1
            await user.save()
            res.json({ message: '"Lite" post successfully created' })
        } else if (subscriptionType === 'Premium' && user.subscription === 'Premium') {
            const newPost = new PostModel({
                title,
                description,
                price,
                city,
                region,
                subscriptionType,
            })
            await newPost.save()
            res.json({ message: '"Premium" post successfully created' })
        } else {
            res.status(403).json({ message: 'You dont have access to create a post' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error with creating a post', error })
    }
}

exports.getActivePosts = async (req, res) => {
    try {
        const posts = await PostModel.find({ archive: false })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Error with getting a post', error })
    }
}

exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.params.id
        console.log("id"+userId)
        const posts = await PostModel.find({ userId})
        console.log("posts"+posts)
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Error with getting user posts', error })
    }
}

exports.archivePost = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        post.archive = true
        await post.save()
        res.json({ message: 'Post archived' })
    } catch (error) {
        res.status(500).json({ message: 'Error with archiving post', error })
    }
}

