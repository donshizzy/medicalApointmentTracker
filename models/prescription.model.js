const mongoose = require('mongoose');
const Schema = mongoose;

const prescriptionSchema = new Schema({
    name :{
        type: 'String'
    },
    pastDiagnosis:{
        type: 'String',
        required: true
    },
    presentDiagnosis:{
        type: 'String',
        required: true
    },
    prescribedDrugs:{
        type: 'String'
    },
    addmission:{
        type:'boolean',
    }
});

const prescription = mongoose.model('Prescribed', prescriptionSchema);
module.exports = prescription;