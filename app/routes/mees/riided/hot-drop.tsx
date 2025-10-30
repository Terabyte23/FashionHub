type Item = {
    id: string;
    title: string;
    price: string;
    src: string;
  };
  
  const items: Item[] = [
    { id: "1", title: "„Roheline Horisont” T-särk", price: "€39.90", src: "/icon/hot-drop1.png" },
    { id: "2", title: "„Metsaline” Jope", price: "€99.00", src: "/icon/hot-drop2.png" },
    { id: "3", title: "„Varjumäng” Püksid", price: "€89.90", src: "/icon/hot-drop3.png" },
    { id: "4", title: "„Tulekera” Müts", price: "€24.90", src: "/icon/hot-drop4.png" },
    { id: "5", title: "„Smiley Fade” Huppar", price: "€69.90", src: "/icon/hot-drop5.png" },
    { id: "6", title: "„Stone Runner” Tossud", price: "€119.00", src: "/icon/hot-drop6.png" },
  ];
  
  export default function MeesRiidedHotDrop() {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-wide">selle hooaja hot drop</h1>
  
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <article
              key={it.id}
              className="rounded-2xl border bg-white overflow-hidden hover:shadow transition"
            >
              <div className="aspect-[3/4] bg-[#FAF5EB]">
                <img
                  src={it.src}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
  
              <div className="p-4">
                <h3 className="text-sm font-medium line-clamp-2">{it.title}</h3>
                <div className="mt-1 font-semibold">{it.price}</div>
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }
  