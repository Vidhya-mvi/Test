const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
   },
  description: String,
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem'
   }]
}, { timestamps: true });

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;
