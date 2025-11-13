import { useEffect, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  Link,
} from "react-router";
import "./app.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";

const slugify = (label: string) =>
  label
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

function MegaPanel({
  open,
  onEnter,
  onLeave,
  children,
}: {
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={[
        "fixed z-50 left-0 right-0 top-16",
        "px-[clamp(8px,3vw,28px)]",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        "transition-opacity duration-150",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div className="bg-[#FAF5EB] border border-black/30 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

function Col({ title, items, basePath }: { title: string; items: string[]; basePath: string }) {
  return (
    <div>
      <h3 className="font-semibold uppercase tracking-wide mb-3">{title}</h3>
      <ul className="space-y-2 text-[#2e3850]">
        {items.map((label) => {
          const href = `${basePath}/${slugify(label)}`;
          return (
            <li key={href}>
              <Link className="hover:text-black" to={href} prefetch="intent">
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Header() {
  const [active, setActive] = useState<"mees" | "naiste" | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="relative bg-[#FAF5EB] border-b border-black/20">
      <div className="h-16 w-full pr-4 grid grid-cols-3 items-center">
        <a
          className="justify-self-start pl-5 font-serif text-2xl tracking-[0.18em] cursor-pointer"
          onClick={() => navigate("/")}
        >
          FashionHub
        </a>

        <nav className="justify-self-center flex items-center gap-10 text-2xl uppercase tracking-[0.2em] font-serif">
          <div
            onMouseEnter={() => setActive("mees")}
            onFocus={() => setActive("mees")}
            onBlur={() => setActive(null)}
          >
            <button
              className="outline-none cursor-pointer"
              aria-haspopup="true"
              aria-expanded={active === "mees"}
              type="button"
              onClick={() => navigate("/mees")}
            >
              Mees
            </button>
          </div>

          <div
            onMouseEnter={() => setActive("naiste")}
            onFocus={() => setActive("naiste")}
            onBlur={() => setActive(null)}
          >
            <button
              className="outline-none cursor-pointer"
              aria-haspopup="true"
              aria-expanded={active === "naiste"}
              type="button"
              onClick={() => navigate("/naiste")}
            >
              Naiste
            </button>
          </div>
        </nav>

        <div className="justify-self-end flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
                title="Shopping Cart"
              >
                <svg
                  className="w-6 h-6 text-[#27190C]"
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
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 p-1.5 hover:bg-black/5 rounded-full transition-colors"
                title={`${user?.name}'s Profile`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-1 px-3 py-1 rounded-full border text-sm border-[#27190C] text-[#27190C] transition-colors duration-300 ease-in-out hover:bg-[#27190C] hover:text-white cursor-pointer"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>

      <MegaPanel open={active === "mees"} onEnter={() => setActive("mees")} onLeave={() => setActive(null)}>
        <Col
          title="Riided"
          basePath="/mees/riided"
          items={[
            "HITT",
            "HOT DROP",
            "POPULAARNE",
            "Warm n Soft",
            "Ülerõivad, mantlid",
            "Dressipluusid",
            "Teksapüksid",
            "T-särgid, topid",
            "Püksid",
            "Kleidid",
            "Sviitrid",
            "Särgid, pluusid",
            "Seelikud",
            "Sörtssid, bermudad",
            "Basic",
            "Komplektid",
            "Müügile tulemas",
          ]}
        />
        <Col
          title="Jalatsid"
          basePath="/mees/jalatsid"
          items={["Vaata kõiki", "Tennised", "Jalatsid, Espadrillid", "Snow boots", "Sussid", "Spordijalatsid"]}
        />
        <Col
          title="Aksessuaarid"
          basePath="/mees/aksessuaarid"
          items={[
            "Vaata kõiki",
            "Kotid, seljakotid",
            "Homewear",
            "Sokid, sukad",
            "Pidžaamad, sussid",
            "Talvised aksessuaarid",
            "Pesu",
            "Mütsid",
            "Sallid",
            "Kindad",
            "Vööd",
            "Rahakоtid",
            "Suvised aksessuaarid",
            "Ehted",
            "Muu",
            "Basic",
            "Ujumisriided",
          ]}
        />
        <Col
          title="Litsents"
          basePath="/mees/litsents"
          items={["Vaata kõiki", "League of Legends", "Music", "Gamer", "Cartoons", "Disney", "Hello Kitty"]}
        />
      </MegaPanel>

      <MegaPanel open={active === "naiste"} onEnter={() => setActive("naiste")} onLeave={() => setActive(null)}>
        <Col
          title="Riided"
          basePath="/naiste/riided"
          items={["Uued", "Kleitid", "Pluusid", "Sviitrid", "Püksid", "T-särgid, topid", "Jakid & Mantlid", "Komplektid", "Seelikud", "Sport", "Basic"]}
        />
        <Col
          title="Jalatsid"
          basePath="/naiste/jalatsid"
          items={["Kõik jalatsid", "Ketsid", "Kontsakingad", "Saapad", "Ballerinad", "Sandaalid"]}
        />
        <Col
          title="Aksessuaarid"
          basePath="/naiste/aksessuaarid"
          items={["Kõik aksessuaarid", "Kotid", "Ehted", "Peakatteid", "Vööd", "Sokid & Sukad", "Ujumisriided"]}
        />
        <Col
          title="Brändid/Litsents"
          basePath="/naiste/litsents"
          items={["Disney", "Barbie", "Hello Kitty", "Anime", "TV & Movies", "Music"]}
        />
      </MegaPanel>
    </header>
  );
}

export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap" },
  ];
}

export function Layout() {
  return (
    <html lang="et">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}