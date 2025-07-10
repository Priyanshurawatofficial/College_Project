const {Schema, model} =require('mongoose');

const MarketSchema = new Schema({
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
    imagePublicId: {
    type: String,
    default: null,
  },
    erp: {
  type: String,
  required: true
},
    posted_at:{
        type: Date,
        default:Date.now(),
    }
});

module.exports = model('Market', MarketSchema);