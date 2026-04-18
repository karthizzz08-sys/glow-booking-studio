import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SALON, whatsappUrl, callUrl } from "@/lib/contact";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Glow Beauty Parlour" },
      { name: "description", content: "Visit, call, or WhatsApp us. Find directions, business hours, and our location on the map." },
      { property: "og:title", content: "Contact Us — Glow Beauty Parlour" },
      { property: "og:description", content: "Visit, call or WhatsApp us. Hours, address and directions." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Get in Touch</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">We'd Love to Hear From You</h1>
          <div className="gold-divider mx-auto my-5 w-24" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card icon={Phone} title="Call us" body={SALON.phone} cta="Call now" href={callUrl()} />
          <Card icon={MessageCircle} title="WhatsApp" body="Chat instantly with our team" cta="Open WhatsApp"
            href={whatsappUrl("Hi, I'd like to know more about your services.")} external accent="#25D366" />
          <Card icon={MapPin} title="Visit our salon" body={SALON.address} cta="Get directions"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SALON.address)}`} external />
          <Card icon={Mail} title="Email us" body={SALON.email} cta="Send email" href={`mailto:${SALON.email}`} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              <h3 className="font-serif text-xl">Business Hours</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {SALON.hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-soft md:col-span-2">
            <iframe
              title="Salon location"
              src={SALON.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full md:h-full"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({
  icon: Icon, title, body, cta, href, external, accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string; body: string; cta: string; href: string; external?: boolean; accent?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group block rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: accent ?? "var(--gradient-gold)" }}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="mt-5 font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary transition-all group-hover:gap-2">
        {cta} →
      </span>
    </a>
  );
}
