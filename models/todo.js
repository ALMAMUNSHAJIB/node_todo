const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
       type: Date,
       default: Date.now
    }
},{
    timestamps: true
}
);


module.exports = mongoose.model('Todo', todoSchema);