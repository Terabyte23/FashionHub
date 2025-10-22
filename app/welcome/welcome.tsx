export function Welcome() {
  return (
    <main className="px-[clamp(8px,3vw,28px)] pt-3 pb-0">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(8px,1.8vw,20px)] min-h-[calc(100vh-65px-12px)]">
        <article className="relative min-h-full border border-[#2C1C0D] overflow-hidden">
          <img
            src="public/icon/image-2.png"
            alt="Woman suit"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center">  
            <h2 className="font-serif uppercase tracking-[0.35em] text-[#352313] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              TERE TULEMAST
            </h2>
          </div>
        </article>
        <article className="relative min-h-full border border-[#2C1C0D] overflow-hidden">
          <img
            src="/icon/image-3.png"
            alt="Man suit"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center">
            <h2 className="font-serif uppercase tracking-[0.35em] text-[#FDF1E0] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              FASHIONHUBISSE
            </h2>
          </div>
        </article>
      </section>
    </main>
  );
}
