const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
   },
  description: String,
  price: { 
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = MenuItem;
