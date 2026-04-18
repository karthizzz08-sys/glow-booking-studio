import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero-salon.jpg";
import { Sparkles, Heart, Award, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Glow Beauty Parlour" },
      { name: "description", content: "Meet Glow Beauty Parlour — over a decade of crafting elegance, confidence, and natural beauty." },
      { property: "og:title", content: "About Us — Glow Beauty Parlour" },
      { property: "og:description", content: "Over a decade of crafting elegance, confidence and natural beauty." },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { icon: Users, label: "Happy Clients", value: "5,000+" },
  { icon: Award, label: "Awards Won", value: "12" },
  { icon: Heart, label: "Bridal Looks", value: "800+" },
  { icon: Sparkles, label: "Years of Glow", value: "12" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our Story</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Beauty Crafted with Care</h1>
          <div className="gold-divider mx-auto my-5 w-24" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img src={hero} alt="Salon interior" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-elegant" />
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">A sanctuary for the modern woman</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founded in 2012, Glow Beauty Parlour was born from a simple belief — that every woman deserves to feel her most beautiful, every single day. Our team of seasoned artists blend traditional techniques with the latest beauty innovations, creating bespoke experiences in a serene, indulgent setting.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From a glowing bride to a refreshed mother of two, we celebrate every story that walks through our doors with the same loving attention to detail.
            </p>
            <Link to="/booking" className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:scale-105 transition-transform">
              Visit Us
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-background p-6 text-center shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold">
                <s.icon className="h-5 w-5 text-gold-foreground" />
              </div>
              <div className="mt-4 font-serif text-3xl text-primary">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-3xl sm:text-4xl">Our Promise</h2>
        <div className="gold-divider mx-auto my-5 w-24" />
        <p className="text-muted-foreground leading-relaxed">
          Hygienic, premium-grade products. Trained, empathetic artists. Honest pricing.
          And an unwavering commitment to making you fall in love with your reflection.
        </p>
      </section>
    </SiteLayout>
  );
}
