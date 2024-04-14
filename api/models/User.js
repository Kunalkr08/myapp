const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        requitre: true,
        unique: true
    }
});

const UserModel=mongoose.model('User', userSchema);
module.exports=UserModel;