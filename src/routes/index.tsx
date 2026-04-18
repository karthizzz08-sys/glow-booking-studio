import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SALON, whatsappUrl } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import heroImg from "@/assets/hero-salon.jpg";
import { Sparkles, Star, Quote, ArrowRight, Calendar, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow Beauty Parlour — Enhancing Your Natural Beauty" },
      { name: "description", content: "Premium beauty salon offering bridal makeup, facials, hair spa, and skincare. Book your appointment online today." },
      { property: "og:title", content: "Glow Beauty Parlour — Enhancing Your Natural Beauty" },
      { property: "og:description", content: "Premium beauty salon offering bridal makeup, facials, hair spa, and skincare." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const featured = ["classic-facial", "bridal-classic", "hair-spa", "gold-facial"];

const TESTIMONIALS = [
  { name: "Priya Sharma", text: "The bridal makeup was breathtaking. I felt like royalty on my wedding day!", role: "Bride" },
  { name: "Aanya Mehta", text: "Their hydra facial gave my skin the most beautiful glow I've ever had. Heavenly experience.", role: "Regular client" },
  { name: "Sneha Kapoor", text: "Such an elegant space and the staff is incredibly skilled. Highly recommend the gold facial.", role: "Skincare lover" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div className="animate-float-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/80">
              <Sparkles className="h-3 w-3 text-gold" /> Luxury Beauty Studio
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              Enhancing Your <span className="italic text-primary">Natural</span> Beauty
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              From bridal glamour to everyday glow — discover signature treatments crafted for the modern woman in a serene, indulgent setting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-105"
              >
                <Calendar className="h-4 w-4" /> Book Appointment
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/50 px-7 py-3.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span><span className="text-foreground font-medium">4.9</span> from 500+ happy clients</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-gold opacity-30 blur-2xl" />
            <img
              src={heroImg}
              alt="Elegant beauty parlour interior with pink and gold accents"
              width={1536}
              height={1024}
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-elegant"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-4 shadow-elegant sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-serif text-lg leading-none">12+ Years</div>
                  <div className="text-xs text-muted-foreground">of crafted beauty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFER BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold px-6 py-8 text-gold-foreground sm:px-12">
          <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] opacity-80">Limited Time</p>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl">First Visit? Enjoy 20% Off Any Facial</h3>
            </div>
            <a
              href={whatsappUrl("Hi! I'd like to claim the 20% off first facial offer.")}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:scale-105 transition-transform"
            >
              Claim Offer <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-background/20 blur-2xl" />
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our Signature</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Featured Treatments</h2>
          <div className="gold-divider mx-auto my-5 w-24" />
          <p className="text-muted-foreground">Indulge in our most-loved services, designed to leave you radiant.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((id) => {
            const s = SERVICES.find((x) => x.id === id)!;
            return (
              <Link
                key={s.id}
                to="/booking"
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{s.category}</p>
                  <h3 className="mt-2 font-serif text-xl">{s.name}</h3>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{s.duration}</span>
                    <span className="font-medium text-primary">₹{s.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Love Notes</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">What Our Clients Say</h2>
            <div className="gold-divider mx-auto my-5 w-24" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl bg-background p-7 shadow-soft">
                <Quote className="h-6 w-6 text-gold" />
                <p className="mt-4 font-serif text-lg italic text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Glimpses</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Moments of Beauty</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <GalleryPreview />
      </section>
    </SiteLayout>
  );
}

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

function GalleryPreview() {
  const imgs = [g1, g2, g3, g4];
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
      {imgs.map((img, i) => (
        <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl">
          <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}
