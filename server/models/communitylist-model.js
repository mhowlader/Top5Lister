const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        likes: {type: [String], required: true},
        dislikes: {type: [String], required: true},
        views: {type: Number, required: true},
        comments: {type: [[String]], required: true},
        rankings: {type: [[String, Number]], required: true},
        votes: {type:Number,required: true},
        date: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
