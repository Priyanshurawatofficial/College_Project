const { Schema, model } = require('mongoose');


function Datenow() {
  const date = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}








const FoundItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  dateFound: {
    type: Date,
  },
  contact: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s',
  },
  imagePublicId: {
    type: String,
    default: null,
  },
  erp: {
    type: String,
    required: true,
  },
  posted_at: {
    type: Date,
    default: Datenow(),
  }
});

module.exports = model('FoundItem', FoundItemSchema);