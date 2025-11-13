import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-[#FAF5EB] to-[#E8DCC8] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-black/10 p-8 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">You are successfully signed in</p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Profile
            </button>
          </div>

          
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center relative">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
                <p className="text-sm text-gray-600">{cartItems.length} items</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              View Cart
            </button>
          </div>

          
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center relative">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.93 0-3.64 1.126-4.312 2.733-.672-1.607-2.382-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
                  />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {favorites.length}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Favorites</h2>
                <p className="text-sm text-gray-600">{favorites.length} items</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="mt-4 w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              View Favorites
            </button>
          </div>

          
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Logout</h2>
                <p className="text-sm text-gray-600">Sign out of your account</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        
        <div className="mt-8 bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-center"
            >
              My Orders
            </button>
            <button
              onClick={() => navigate("/")}
              className="py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-center"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
