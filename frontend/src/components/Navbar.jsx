import useAuthStore from '../store/useAuthStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <span className="text-xl font-bold">🍚 Ricely</span>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, {user.name}</span>
          <button
            onClick={logout}
            className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
