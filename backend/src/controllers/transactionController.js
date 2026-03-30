const Transaction = require('../models/Transaction');
const User = require('../models/User');

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  res.json(transactions);
};

const getBudgetSummary = async (req, res) => {
  const user = await User.findById(req.user.id).select('budget');
  const transactions = await Transaction.find({ user: req.user.id });

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const rice = Math.max(0, user.budget - totalSpent);

  res.json({
    budget: user.budget,
    totalSpent,
    rice,
    duckMood: rice > user.budget * 0.5 ? 'happy' : rice > user.budget * 0.2 ? 'neutral' : 'sad',
  });
};

const setBudget = async (req, res) => {
  const { budget } = req.body;
  if (typeof budget !== 'number' || budget < 0)
    return res.status(400).json({ message: 'Invalid budget value' });

  const user = await User.findByIdAndUpdate(req.user.id, { budget }, { new: true }).select('-password');
  res.json(user);
};

module.exports = { getTransactions, getBudgetSummary, setBudget };
