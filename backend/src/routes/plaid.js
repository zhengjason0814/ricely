const router = require('express').Router();
const { createLinkToken, exchangePublicToken, syncTransactions } = require('../controllers/plaidController');
const { protect } = require('../middleware/authMiddleware');

router.post('/link-token', protect, createLinkToken);
router.post('/exchange-token', protect, exchangePublicToken);
router.post('/sync', protect, syncTransactions);

module.exports = router;
