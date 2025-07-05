const {Schema, model} =require('mongoose');

function Datenow() {
  const date = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}



const BuySchema = new Schema({
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
        required:false,
    },
    price:{
        type:String,
       required:false,
    },
    contact:{
        type:String,
    },
    image:{
        type:String,
        default:"https://grafkom.io/wp-content/uploads/2021/01/wanttobuy.jpg",
    },
    posted_at:{
        type: Date,
        default: Datenow,
    }
});

module.exports = model('Buy', BuySchema);