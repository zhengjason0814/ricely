const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plaidTransactionId: { type: String, unique: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: [String],
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
