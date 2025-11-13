import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import type { Product } from "../../../context/CartContext";

type Item = {
    id: string;
    title: string;
    price: string;
    src: string;
  };

  const items: Item[] = [
    { id: "hotdrop-1", title: "\"Roheline Horisont\" T-särk", price: "€39.90", src: "/icon/hot-drop1.png" },
    { id: "hotdrop-2", title: "\"Metsaline\" Jope", price: "€99.00", src: "/icon/hot-drop2.png" },
    { id: "hotdrop-3", title: "\"Varjumäng\" Püksid", price: "€89.90", src: "/icon/hot-drop3.png" },
    { id: "hotdrop-4", title: "\"Tulekera\" Müts", price: "€24.90", src: "/icon/hot-drop4.png" },
    { id: "hotdrop-5", title: "\"Smiley Fade\" Huppar", price: "€69.90", src: "/icon/hot-drop5.png" },
    { id: "hotdrop-6", title: "\"Stone Runner\" Tossud", price: "€119.00", src: "/icon/hot-drop6.png" },
  ];

  function Heart({ active }: { active?: boolean }) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.93 0-3.64 1.126-4.312 2.733-.672-1.607-2.382-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
          className={`${active ? "fill-black" : "fill-none"} stroke-black`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function Card({ item }: { item: Item }) {
    const { addToFavorites, removeFromFavorites, isFavorite, addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showSizeSelector, setShowSizeSelector] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");

    const itemAsProduct: Product = {
      id: item.id,
      name: item.title,
      price: parseFloat(item.price.replace("€", "").replace(",", ".")),
      image: item.src,
      category: "mees",
      availableSizes: ["S", "M", "L", "XL", "XXL"],
    };

    const isLiked = isFavorite(item.id);

    const handleHeartClick = () => {
      if (!isAuthenticated) {
        alert("Please sign in to add items to favorites");
        navigate("/login");
        return;
      }
      if (isLiked) {
        removeFromFavorites(item.id);
      } else {
        addToFavorites(itemAsProduct);
      }
    };

    const handleAddToCart = () => {
      if (!isAuthenticated) {
        alert("Please sign in to add items to cart");
        navigate("/login");
        return;
      }
      if (!selectedSize) {
        setShowSizeSelector(true);
        return;
      }
      addToCart(itemAsProduct, selectedSize, 1);
      setShowSizeSelector(false);
      setSelectedSize("");
      alert(`${item.title} added to cart!`);
    };

    return (
      <article className="rounded-2xl border bg-white overflow-hidden hover:shadow transition">
        <div className="aspect-[3/4] bg-[#FAF5EB] relative">
          <img
            src={item.src}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {showSizeSelector && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 p-4">
              <p className="text-white text-sm font-semibold">Select Size</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded ${
                      selectedSize === size
                        ? "bg-white text-black"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="px-4 py-1 bg-white text-black rounded text-sm disabled:opacity-50"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowSizeSelector(false)}
                  className="px-4 py-1 bg-white/20 text-white rounded text-sm hover:bg-white/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            aria-label="Add to favorites"
            onClick={handleHeartClick}
            className="absolute right-2 bottom-2 rounded-full p-1.5 bg-white/80 hover:bg-white transition"
          >
            <Heart active={isLiked} />
          </button>

          <button
            onClick={() => setShowSizeSelector(true)}
            className="absolute left-2 bottom-2 px-3 py-1 text-xs uppercase bg-black text-white rounded hover:bg-black/80 transition"
          >
            Add to Cart
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
          <div className="mt-1 font-semibold">{item.price}</div>
        </div>
      </article>
    );
  }

  export default function MeesRiidedHotDrop() {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-wide">selle hooaja hot drop</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <Card key={it.id} item={it} />
          ))}
        </section>
      </main>
    );
  }
  