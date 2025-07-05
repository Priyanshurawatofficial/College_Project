const {Schema, model} =require('mongoose');

const SellSchema = new Schema({
    type: {
        type: String,
        enum: ['sell', 'buy'], // restricts to only 'sell' or 'buy'
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
    },
    image:{
        type:String,
         default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s', // Default image if none provided
        
    },
    posted_at:{
        type: Date,
        default: Date.now,
    }
});

module.exports = model('Sell', SellSchema);