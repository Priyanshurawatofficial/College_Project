const {Schema, model} =require('mongoose');

function Datenow() {
  const date = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
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
    password: {
  type: String,
  required: true
},
    posted_at:{
        type: Date,
        default: Datenow(),
    }
});

module.exports = model('Market', MarketSchema);