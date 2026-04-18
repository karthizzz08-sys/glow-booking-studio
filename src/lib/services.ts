import facial from "@/assets/service-facial.jpg";
import bridal from "@/assets/service-bridal.jpg";
import hair from "@/assets/service-hair.jpg";
import skincare from "@/assets/service-skincare.jpg";

export type ServiceCategory = "Hair Care" | "Skin Care" | "Bridal Packages" | "Makeup";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number; // INR
  duration: string;
  description: string;
  image: string;
}

export const SERVICES: Service[] = [
  // Skin Care
  { id: "classic-facial", name: "Classic Glow Facial", category: "Skin Care", price: 1499, duration: "60 min", description: "Deep cleansing facial with fruit extracts for instant radiance.", image: facial },
  { id: "gold-facial", name: "24K Gold Facial", category: "Skin Care", price: 2999, duration: "75 min", description: "Luxury gold-infused treatment for ageless, glowing skin.", image: skincare },
  { id: "hydra-facial", name: "Hydra Facial", category: "Skin Care", price: 3499, duration: "60 min", description: "Advanced hydration therapy for plump, dewy skin.", image: facial },

  // Hair Care
  { id: "hair-spa", name: "Signature Hair Spa", category: "Hair Care", price: 1299, duration: "60 min", description: "Nourishing oil massage with steam and deep conditioning.", image: hair },
  { id: "keratin", name: "Keratin Smoothening", category: "Hair Care", price: 4999, duration: "180 min", description: "Frizz-free silky hair that lasts up to 6 months.", image: hair },
  { id: "haircut-style", name: "Haircut & Blow-Dry", category: "Hair Care", price: 899, duration: "45 min", description: "Precision cut paired with a luxurious blow-dry finish.", image: hair },

  // Makeup
  { id: "party-makeup", name: "Party Makeup", category: "Makeup", price: 2499, duration: "60 min", description: "Glam look perfect for cocktails and celebrations.", image: skincare },
  { id: "engagement-makeup", name: "Engagement Makeup", category: "Makeup", price: 4999, duration: "90 min", description: "Soft romantic glam for your special day.", image: bridal },

  // Bridal
  { id: "bridal-classic", name: "Classic Bridal Package", category: "Bridal Packages", price: 14999, duration: "240 min", description: "Bridal makeup, hair styling, and draping.", image: bridal },
  { id: "bridal-luxury", name: "Luxury Bridal Package", category: "Bridal Packages", price: 24999, duration: "360 min", description: "Pre-bridal facial, mehndi prep, full makeup & hair.", image: bridal },
];

export const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];
