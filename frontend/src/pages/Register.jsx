import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';

export default function Register({ onSwitch }) {
  const { register } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">🍚 Create your account</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handle} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border rounded px-3 py-2 text-sm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2 text-sm"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2 text-sm"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded">
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{' '}
        <button className="text-yellow-500 underline" onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
}
