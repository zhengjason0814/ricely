import { useEffect, useState } from 'react';
import Duck from '../components/Duck';
import BudgetChart from '../components/BudgetChart';
import PlaidLinkButton from '../components/PlaidLinkButton';
import useBudgetStore from '../store/useBudgetStore';

export default function Dashboard() {
  const { transactions, summary, fetchTransactions, fetchSummary, setBudget, syncTransactions } = useBudgetStore();
  const [budgetInput, setBudgetInput] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState('');

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    await setBudget(Number(budgetInput));
    setBudgetInput('');
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncError('');
    try {
      await syncTransactions();
      await fetchSummary();
    } catch (err) {
      setSyncError(err.response?.data?.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const handleLinked = async () => {
    await handleSync();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center my-8">
        <Duck mood={summary?.duckMood || 'happy'} />
        {summary && (
          <div className="mt-4 text-center">
            <p className="text-3xl font-bold">🍚 {summary.rice.toFixed(0)} rice left</p>
            <p className="text-gray-500 text-sm">
              ${summary.totalSpent.toFixed(2)} spent of ${summary.budget.toFixed(2)} budget
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        <form onSubmit={handleSetBudget} className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Set budget ($)"
            className="border rounded px-3 py-2 text-sm w-36"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            required
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm font-semibold">
            Set
          </button>
        </form>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold disabled:opacity-50"
        >
          {syncing ? 'Syncing...' : 'Sync Transactions'}
        </button>
        <PlaidLinkButton onLinked={handleLinked} />
      </div>

      {syncError && <p className="text-red-500 text-sm text-center mb-4">{syncError}</p>}

      {transactions.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Spending by Category</h3>
          <BudgetChart transactions={transactions} />
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-sm">No transactions yet. Link your bank to get started.</p>
        ) : (
          <ul className="divide-y">
            {transactions.slice(0, 20).map((t) => (
              <li key={t._id} className="flex justify-between py-2 text-sm">
                <span>{t.name}</span>
                <span className="text-red-500">-${t.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
