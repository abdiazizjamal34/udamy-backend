const mongoose = require('mongoose');

const pymentSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
  
    category: {
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: false
    },
   
   
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pyment', pymentSchema);
