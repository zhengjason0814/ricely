const { PlaidApi, PlaidEnvironments, Configuration, Products, CountryCode } = require('plaid');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(plaidConfig);

const createLinkToken = async (req, res) => {
  const { data } = await plaidClient.linkTokenCreate({
    user: { client_user_id: req.user.id },
    client_name: 'Ricely',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
  });
  res.json({ link_token: data.link_token });
};

const exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;
  const { data } = await plaidClient.itemPublicTokenExchange({ public_token });
  await User.findByIdAndUpdate(req.user.id, { plaidAccessToken: data.access_token });
  res.json({ message: 'Bank account linked successfully' });
};

const syncTransactions = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.plaidAccessToken)
    return res.status(400).json({ message: 'No bank account linked' });

  const end = new Date().toISOString().split('T')[0];
  const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data } = await plaidClient.transactionsGet({
    access_token: user.plaidAccessToken,
    start_date: start,
    end_date: end,
  });

  for (const t of data.transactions) {
    await Transaction.findOneAndUpdate(
      { plaidTransactionId: t.transaction_id },
      {
        user: user._id,
        plaidTransactionId: t.transaction_id,
        name: t.name,
        amount: t.amount,
        category: t.category || [],
        date: new Date(t.date),
      },
      { upsert: true }
    );
  }

  res.json({ synced: data.transactions.length });
};

module.exports = { createLinkToken, exchangePublicToken, syncTransactions };
