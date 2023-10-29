const mongoose  =  require('mongoose');
const Schema = mongoose;
bookingsSchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId
    },
    email:{
        type:'String'
    },
    designation:{
        type:'String',
        enum:['Staff','Student','Others']
    },
    reason:{
        type:'String'
    },
    pastIssues:{
        type:'String'
    },
    currentIssues:{
        type:'String'
    },
    desiredDate:{
        type:'Date',
        required:true
    }
})
const Bookings = mongoose.model('Bookings', bookingsSchema);
module.exports = Bookings;