import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SERVICES, type ServiceCategory } from "@/lib/services";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Glow Beauty Parlour" },
      { name: "description", content: "Explore our full menu of facials, hair care, bridal packages, and makeup. Transparent pricing and online booking." },
      { property: "og:title", content: "Services & Pricing — Glow Beauty Parlour" },
      { property: "og:description", content: "Facials, hair care, bridal packages and makeup with transparent pricing." },
    ],
  }),
  component: ServicesPage,
});

const CATS: (ServiceCategory | "All")[] = ["All", "Skin Care", "Hair Care", "Makeup", "Bridal Packages"];

function ServicesPage() {
  const [active, setActive] = useState<(ServiceCategory | "All")>("All");
  const list = active === "All" ? SERVICES : SERVICES.filter((s) => s.category === active);

  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our Menu</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Services & Pricing</h1>
          <div className="gold-divider mx-auto my-5 w-24" />
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A curated menu of indulgent treatments to refresh, restore and renew.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-5 py-2 text-sm transition-all",
                active === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "border border-border bg-background text-foreground/80 hover:bg-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <article key={s.id} className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[5/4] overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{s.category}</p>
                <h3 className="mt-2 font-serif text-2xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-gold" /> {s.duration}
                  </span>
                  <span className="font-serif text-2xl text-primary">₹{s.price.toLocaleString("en-IN")}</span>
                </div>
                <Link
                  to="/booking"
                  search={{ service: s.id }}
                  className="mt-5 block w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
