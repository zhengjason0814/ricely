import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import duckLogo from "../assets/duckLogo.png";

export default function Register({ onSwitch }) {
  const { register } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(form.name, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="flex flex-col md:flex-row w-19/20 min-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
        <div className="hidden md:flex flex-2 flex-col justify-between bg-amber-300 p-12">
          <div className="flex items-center gap-2">
            <img src={duckLogo} alt="Ricely logo" className="w-14 h-14 object-contain" />
            <span className="text-amber-700 text-lg font-bold">Ricely</span>
          </div>

          <div>
            <h1 className="text-5xl font-bold text-amber-700 leading-tight mb-4">
              Join the
              <br />
              Flock!
            </h1>
            <p className="text-amber-900 text-sm max-w-xs leading-relaxed">
              Start your effortless money story and watch your savings grow with every ripple.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end bg-white">
          <div className="w-full max-w-sm px-12 py-16">
            <h2 className="text-2xl font-bold mb-1 text-gray-900">Create Account</h2>
            <p className="text-gray-400 text-sm mb-8">
              Start your effortless savings journey today.
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handle} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Jason Zheng"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email Address
                </label>
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
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                />
              </div>

              <button className="w-full bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-all">
                Watch Your Savings Grow →
              </button>
            </form>

            <p className="text-sm text-center mt-8 text-gray-400">
              Already have an account?{" "}
              <button
                className="text-amber-500 hover:text-amber-600 font-medium underline"
                onClick={onSwitch}
              >
                Waddle back to login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
