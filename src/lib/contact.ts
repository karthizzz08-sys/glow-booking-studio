// Central contact info — replace these placeholders with real values.
export const SALON = {
  name: "Glow Beauty Parlour",
  tagline: "Enhancing Your Natural Beauty",
  phone: "+91 99999 99999",
  phoneRaw: "+919999999999",
  whatsappRaw: "919999999999", // no + sign for wa.me
  email: "hello@glowbeauty.com",
  address: "Shop No. 12, Beauty Lane, Mumbai 400001, India",
  hours: [
    { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
    { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74110055!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMumbai!5e0!3m2!1sen!2sin!4v1700000000000",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SALON.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

export function callUrl() {
  return `tel:${SALON.phoneRaw.replace(/\s/g, "")}`;
}
