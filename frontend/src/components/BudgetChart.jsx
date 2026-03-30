import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function BudgetChart({ transactions }) {
  const byCategory = transactions.reduce((acc, t) => {
    const cat = t.category?.[0] || 'Other';
    acc[cat] = (acc[cat] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(byCategory).map(([name, amount]) => ({ name, amount }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
        <XAxis dataKey="name" angle={-30} textAnchor="end" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => [`$${v.toFixed(2)}`, 'Spent']} />
        <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={`hsl(${(i * 47) % 360}, 65%, 55%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
