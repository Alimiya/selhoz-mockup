const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    city: { type: String, required: true },
    region: { type: String, required: true },
    subscription: {type: String,enum:["Free", "Lite", "Premium"], default:"Free"},
    views: { type: Number, default: 0 },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    archive: { type: Boolean, default: false }
})

const PostModel = mongoose.model('PostModel', postSchema)

module.exports = PostModel
