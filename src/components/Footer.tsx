import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import { SALON } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold">
                <Sparkles className="h-4 w-4 text-gold-foreground" />
              </span>
              <span className="font-serif text-xl">{SALON.name}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">"{SALON.tagline}"</p>
            <div className="mt-5 flex gap-3">
              <a href={SALON.socials.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SALON.socials.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={SALON.socials.youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/booking" className="hover:text-foreground">Book Appointment</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /><span>{SALON.address}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /><a href={`tel:${SALON.phoneRaw}`} className="hover:text-foreground">{SALON.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /><a href={`mailto:${SALON.email}`} className="hover:text-foreground">{SALON.email}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SALON.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-12" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SALON.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
