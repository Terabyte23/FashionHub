import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, logout, updateUser, isAuthenticated, isLoading } = useAuth();
  const { favorites, cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleSaveProfile = () => {
    updateUser({ name: editedName });
    setIsEditing(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("http://localhost/web-market/server/upload_avatar.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });      

      const text = await res.text();
      console.log("raw response", text);

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Сервер вернул не JSON, смотри консоль");
        console.error("upload_avatar not JSON:", text);
        return;
      }

      if (!data.success) {
        alert(data.message || "Ошибка загрузки аватарки");
        return;
      }

      if (data.avatarUrl) {
        updateUser({ avatar: data.avatarUrl });
      }

      setShowAvatarUpload(false);
    } catch (err) {
      console.error("fetch error", err);
      alert("Не удалось подключиться к серверу");
    }
  };

  const removeAvatar = () => {
    updateUser({ avatar: undefined });
    setShowAvatarUpload(false);
  };

  const totalSpent = getTotalPrice();
  const accountAge = "New Member";

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-[#FAF5EB] to-[#E8DCC8] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-black/10 p-8 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowAvatarUpload(!showAvatarUpload)}
                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Change Avatar"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="sr-only">Change Avatar</span>
              </button>

              {showAvatarUpload && (
                <>
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowAvatarUpload(false)}
                  />
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-black/10 p-6 z-50 w-80">
                    <h3 className="font-semibold text-gray-800 mb-4 text-center text-lg">Change Avatar</h3>
                    <div className="space-y-3">
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                          id="avatar-upload"
                        />
                        <div className="w-full py-3 px-4 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition cursor-pointer text-sm font-medium">
                          Upload Image
                        </div>
                      </label>
                      {user.avatar && (
                        <button
                          onClick={removeAvatar}
                          className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                        >
                          Remove Avatar
                        </button>
                      )}
                      <button
                        onClick={() => setShowAvatarUpload(false)}
                        className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="mb-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 outline-none bg-transparent"
                  />
                </div>
              ) : (
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{user.name}</h1>
              )}
              <p className="text-gray-600 text-lg mb-1">{user.email}</p>
              <p className="text-gray-500 text-sm">{accountAge}</p>

              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(user.name);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
            <p className="text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">{favorites.length}</div>
            <p className="text-gray-600">Favorite Items</p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{cartItems.length}</div>
            <p className="text-gray-600">Cart Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Personal Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-lg font-semibold text-gray-800">2025</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Shopping Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Current Cart Value</p>
                <p className="text-xl font-bold text-green-600">{totalSpent.toFixed(2)} EUR</p>
            </div>
 

              <div className="flex justify-between items-center">
                <p className="text-gray-600">Items in Cart</p>
                <p className="text-xl font-bold text-gray-800">{cartItems.length}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Favorite Items</p>
                <p className="text-xl font-bold text-pink-600">{favorites.length}</p>
              </div>
              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-4 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <button
              onClick={() => navigate("/cart")}
              className="py-3 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-center font-semibold"
            >
              View Shopping Cart
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  logout();
                  navigate("/");
                }
              }}
              className="py-3 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-center font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
