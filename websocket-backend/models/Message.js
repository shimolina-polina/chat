const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ссылка на пользователя
    chatId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
module.exports = mongoose.model('Message', messageSchema);