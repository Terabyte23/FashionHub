type Item = {
    id: string;
    title: string;
    price: string;
    src: string;
  };
  
  const items: Item[] = [
    { id: "1", title: "“Päikeseseen” T-särk", price: "€39.90", src: "/icon/naiste-uus1.png" },
    { id: "2", title: "“Metsik Tiiger” Huppar", price: "€69.90", src: "/icon/naiste-uus2.png" },
    { id: "3", title: "“Draakonituli” Püksid", price: "€119.00", src: "/icon/naiste-uus3.png" },
    { id: "4", title: "Kosmiline Tühjus” Jope", price: "€59.90", src: "/icon/naiste-uus4.png" },
    { id: "5", title: "“Säde” Müts", price: "€24.90", src: "/icon/naiste-uus5.png" },
    { id: "6", title: "“Linnakaru” Mantel", price: "€139.00", src: "/icon/naiste-uus6.png" },
  ];
  
  export default function NaisteRiidedUus() {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-wide">Uued naisteriided</h1>
  
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
  