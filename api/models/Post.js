const mongoose= require('mongoose');

const {Schema, model}=mongoose;

const PostSchema = new Schema({
    image: String
});

const PostModel = model('Post', PostSchema);
module.exports = PostModel;