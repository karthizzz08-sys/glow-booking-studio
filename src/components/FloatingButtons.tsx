import { Phone, MessageCircle } from "lucide-react";
import { SALON, whatsappUrl, callUrl } from "@/lib/contact";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={callUrl()}
        aria-label={`Call ${SALON.name}`}
        className="group flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-gold text-gold-foreground shadow-elegant animate-shimmer hover:scale-110 transition-transform"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
      </a>
      <a
        href={whatsappUrl("Hi, I want to book an appointment")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" />
      </a>
    </div>
  );
}
