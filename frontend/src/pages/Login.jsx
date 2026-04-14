import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import duckLogo from "../assets/duckLogo.png";

export default function Login({ onSwitch }) {
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="flex flex-col md:flex-row w-19/20 min-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
        <div className="hidden md:flex flex-2 flex-col items-center justify-center bg-amber-100 p-12 gap-6">
          <img src={duckLogo} alt="Ricely logo" className="w-40 h-40 object-contain" />
          <div className="">
            <h1 className="text-3xl font-bold text-amber-900">Ricely</h1>
            <p className="text-amber-700 mt-2 max-w-xs text-sm leading-relaxed">
              Effortless, bright, and stable. Budget like a bowl of rice — simple, nourishing,
              always enough.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end bg-white">
          <div className="w-full max-w-sm px-12 py-16">
            <h2 className="text-2xl font-bold mb-1 text-gray-900">Welcome back to Ricely</h2>
            <p className="text-gray-400 text-sm mb-8">Please enter your login!</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handle} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button className="w-full bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-all">
                Waddle in →
              </button>
            </form>

            <p className="text-sm text-center mt-8 text-gray-400">
              No account?{" "}
              <button
                className="text-amber-500 hover:text-amber-600 font-medium underline"
                onClick={onSwitch}
              >
                Join today!
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
