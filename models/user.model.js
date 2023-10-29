const mongoose = require('mongoose');
const {Schema}  = mongoose;

const UserSchema = new Schema({
    id:{
        type: mongoose.Types.ObjectId
    },
     email:{
        type:'String',
        required: true,
        unique: true
    },
    username: {
        type:'String'
    },
    password:{
        type:'String',
        required: true
    },
   profile:{
    type:mongoose.Types.ObjectId,
    ref:'Profile'
   },
   registered:{
    type:'Boolean'

   }

});

const User  = mongoose.model('User', UserSchema);
module.exports = User;