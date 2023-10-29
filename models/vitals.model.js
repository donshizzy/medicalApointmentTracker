const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const vitalsSchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:'String',
        required: true
    },
    bloodGroup:{
        type:'String',
    },
    pulseRate:{
        type:'Number'
    },
    respiratoryRate:{
        type:'Number'
    },
    bloodPressure:{
        type:'Number'
    },
    bodyTemp:{
        type:'Number'
    }
});  

const Vital = mongoose.model('Vital', vitalsSchema);
module.exports = Vital;