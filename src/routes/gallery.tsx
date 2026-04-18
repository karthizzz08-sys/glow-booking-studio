import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import bridal from "@/assets/service-bridal.jpg";
import facial from "@/assets/service-facial.jpg";
import hair from "@/assets/service-hair.jpg";
import skincare from "@/assets/service-skincare.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Glow Beauty Parlour" },
      { name: "description", content: "Browse our work — bridal makeup, before-and-after transformations, and salon ambience." },
      { property: "og:title", content: "Gallery — Glow Beauty Parlour" },
      { property: "og:description", content: "Bridal looks, transformations, and salon moments." },
    ],
  }),
  component: GalleryPage,
});

const ALL = [
  { src: bridal, label: "Bridal Glam", tag: "Bridal" },
  { src: g1, label: "Nail Art", tag: "Beauty" },
  { src: g4, label: "Bridal Mehndi", tag: "Bridal" },
  { src: g3, label: "Spa Ambience", tag: "Salon" },
  { src: g2, label: "Makeup Studio", tag: "Makeup" },
  { src: facial, label: "Facial Care", tag: "Skincare" },
  { src: g6, label: "Bridal Jewelry", tag: "Bridal" },
  { src: hair, label: "Hair Spa", tag: "Hair" },
  { src: g5, label: "Beauty Tools", tag: "Salon" },
  { src: skincare, label: "Skincare Ritual", tag: "Skincare" },
];

function GalleryPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Portfolio</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Our Gallery</h1>
          <div className="gold-divider mx-auto my-5 w-24" />
          <p className="mx-auto max-w-xl text-muted-foreground">
            Real moments from our salon — bridal transformations, signature treatments, and quiet beauty.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ALL.map((item, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-soft"
              style={{ aspectRatio: i % 5 === 0 ? "3/4" : "1/1" }}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/70 via-foreground/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold">{item.tag}</span>
                <span className="font-serif text-lg text-background">{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
