const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:[true,'Entrez votre email']
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: [true,'Veuillez tapez un mot de passe']
    },
    token:{
        type:String,
    },
},{
    timestamps:true
})

const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel;