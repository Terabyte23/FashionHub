import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Cart() {
  const { user, isAuthenticated } = useAuth();
  const {
    favorites,
    cartItems,
    addToCart,
    removeFromCart,
    removeFromFavorites,
    updateCartItemQuantity,
    updateCartItemSize,
    getTotalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"favorites" | "cart">("favorites");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleAddToCart = (productId: string) => {
    const product = favorites.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.availableSizes[0], 1);
    }
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-[#FAF5EB] to-[#E8DCC8] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-black/10 p-6 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
          <p className="text-gray-600">
            {activeTab === "favorites"
              ? `You have ${favorites.length} favorite items`
              : `You have ${cartItems.length} items in your cart`}
          </p>
        </div>

        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "favorites"
                ? "bg-white text-black shadow-md"
                : "bg-white/50 text-gray-600 hover:bg-white/70"
            }`}
          >
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "cart"
                ? "bg-white text-black shadow-md"
                : "bg-white/50 text-gray-600 hover:bg-white/70"
            }`}
          >
            Cart ({cartItems.length})
          </button>
        </div>

        
        {activeTab === "favorites" && (
          <div>
            {favorites.length === 0 ? (
              <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-12 text-center">
                <svg
                  className="w-24 h-24 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">Start adding items to your favorites!</p>
                <button
                  onClick={() => navigate("/mees")}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white/80 backdrop-blur rounded-xl border border-black/10 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                      <p className="text-xl font-bold mb-4">{product.price.toFixed(2)} EUR</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition text-sm"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Remove from favorites?")) {
                              removeFromFavorites(product.id);
                            }
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        
        {activeTab === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-12 text-center">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-400 mb-4"
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
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Add items from your favorites to start shopping!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-4 flex gap-4"
                    >
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.price.toFixed(2)} EUR</p>

                        <div className="flex flex-wrap items-center gap-4">
                          
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Size:</label>
                            <select
                              value={item.selectedSize}
                              onChange={(e) =>
                                updateCartItemSize(item.id, item.selectedSize, e.target.value)
                              }
                              className="px-2 py-1 border border-black/20 rounded text-sm"
                            >
                              {item.availableSizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>

                          
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Qty:</label>
                            <div className="flex items-center border border-black/20 rounded">
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2 py-1 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x border-black/20">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-red-500 hover:text-red-700 text-sm underline"
                          >
                            Remove
                          </button>
                        </div>

                        <p className="mt-2 font-semibold">
                          Subtotal: {(item.price * item.quantity).toFixed(2)} EUR
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 sticky top-4">
                  <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">{getTotalPrice().toFixed(2)} EUR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold">FREE</span>
                    </div>
                    <div className="border-t border-black/10 pt-2 mt-2">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span>{getTotalPrice().toFixed(2)} EUR</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-black/80 transition mb-3">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Clear all items from cart?")) {
                        clearCart();
                      }
                    }}
                    className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
