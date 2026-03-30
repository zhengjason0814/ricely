const router = require('express').Router();
const { getTransactions, getBudgetSummary, setBudget } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTransactions);
router.get('/summary', protect, getBudgetSummary);
router.put('/budget', protect, setBudget);

module.exports = router;
