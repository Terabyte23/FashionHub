import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { sampleProducts } from "../../data/products";
import type { Product } from "../../context/CartContext";

type Item = { id: string; title: string; price: string; src: string };

const items: Item[] = [
  { id: "5", title: "Šerpa jope", price: "36,99 EUR", src: "/icon/image-8.png" },
  { id: "6", title: "Lühike kapuutsiga bomber-jakk", price: "54,99 EUR", src: "/icon/image-9.png" },
  { id: "7", title: "Teksapüksid baggy", price: "43,99 EUR", src: "/icon/image-10.png" },
  { id: "8", title: "Ruuduline miniseelik", price: "29,99 EUR", src: "/icon/image-11.png" },
];

const womenProducts = sampleProducts.filter(p => p.category === "naiste");

function Heart({ active }: { active?: boolean }) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 relative top-[2px]">
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
      price: parseFloat(item.price.replace(",", ".").replace(" EUR", "")),
      image: item.src,
      category: "naiste",
      availableSizes: ["XS", "S", "M", "L", "XL"],
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
      <article className="group max-w-[260px] sm:max-w-[300px] mx-auto">
        <div className="relative aspect-[300/544] overflow-hidden bg-[#FAF5EB] p-2">
          <img src={item.src} alt={item.title} className="w-full h-full object-contain" />

          {showSizeSelector && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 p-4">
              <p className="text-white text-sm font-semibold">Select Size</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["XS", "S", "M", "L", "XL"].map((size) => (
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
            className="absolute right-2 bottom-4 rounded-full p-1 bg-white/80 hover:bg-white transition"
          >
            <Heart active={isLiked} />
          </button>

          <button
            onClick={() => setShowSizeSelector(true)}
            className="absolute left-2 bottom-4 px-3 py-1 text-xs uppercase bg-black text-white rounded hover:bg-black/80 transition"
          >
            Add to Cart
          </button>
        </div>
        <div className="mt-2">
          <div className="text-[11px] uppercase tracking-wide line-clamp-2">{item.title}</div>
          <div className="mt-1 font-semibold">{item.price}</div>
        </div>
      </article>
    );
  }

  function ProductCard({ product }: { product: Product }) {
    const { addToFavorites, removeFromFavorites, isFavorite, addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showSizeSelector, setShowSizeSelector] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const isLiked = isFavorite(product.id);

    const handleHeartClick = () => {
      if (!isAuthenticated) {
        alert("Please sign in to add items to favorites");
        navigate("/login");
        return;
      }
      if (isLiked) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
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
      addToCart(product, selectedSize, 1);
      setShowSizeSelector(false);
      setSelectedSize("");
      alert(`${product.name} added to cart!`);
    };

    return (
      <article className="group max-w-[260px] sm:max-w-[300px] mx-auto">
        <div className="relative aspect-[300/544] overflow-hidden bg-[#FAF5EB] p-2">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />


          {showSizeSelector && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 p-4">
              <p className="text-white text-sm font-semibold">Select Size</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {product.availableSizes.map((size) => (
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
            className="absolute right-2 bottom-4 rounded-full p-1 bg-white/80 hover:bg-white transition"
          >
            <Heart active={isLiked} />
          </button>

          <button
            onClick={() => setShowSizeSelector(true)}
            className="absolute left-2 bottom-4 px-3 py-1 text-xs uppercase bg-black text-white rounded hover:bg-black/80 transition"
          >
            Add to Cart
          </button>
        </div>
        <div className="mt-2">
          <div className="text-[11px] uppercase tracking-wide line-clamp-2">{product.name}</div>
          <div className="mt-1 font-semibold">{product.price.toFixed(2)} EUR</div>
        </div>
      </article>
    );
  }



export default function Naiste() {
  return (
    <main className="px-[clamp(12px,3vw,32px)] py-6 bg-[#FAF5EB]">
      <h1 className="font-serif text-[28px] tracking-[0.12em] mb-4">NAISTE</h1>


      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {items.map((it) => (
          <Card key={it.id} item={it} />
        ))}
      </section>

      <h2 className="font-serif text-[24px] tracking-[0.12em] mb-4 mt-8">POPULAR ITEMS</h2>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <div className="mt-8">
        <button className="inline-flex items-center gap-3 border border-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition">
          Näita rohkem
          <span className="inline-block translate-x-0 group-hover:translate-x-1 transition">→</span>
        </button>
      </div>
    </main>
  );
}
