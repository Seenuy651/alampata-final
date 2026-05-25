import wine from "@/assets/products/wine.jpg";
import cica from "@/assets/products/cica.jpg";
import green from "@/assets/products/green.jpg";
import radiating from "@/assets/products/radiating.jpg";
import combo from "@/assets/products/combo.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  mrp: number;
  image: string;
  tags: string[];
  badge?: string;
  size: string;
};

export const products: Product[] = [
  {
    id: "luminous-wine",
    name: "Luminous Wine Shower Gel",
    tagline: "Shower Gel · Wine Series",
    description:
      "A luxurious wine-infused shower gel for a rejuvenating bathing experience. Stay refreshed with clean, glowing skin — perfect for all skin types.",
    price: 349,
    mrp: 649,
    image: wine,
    tags: ["Wine Extract", "All Skin Types", "Rejuvenating"],
    badge: "Bestseller",
    size: "250ml / 8.45 fl.oz",
  },
  {
    id: "cica-ceramide",
    name: "Cica & Ceramide Moisturizer",
    tagline: "Moisturizer · Acne Care",
    description:
      "Cica & Ceramide oil-free moisturizer for oily, acne-prone skin. With Niacinamide & Hyaluronic Acid to soothe, calm and reduce dark spots.",
    price: 349,
    mrp: 649,
    image: cica,
    tags: ["Cica", "Ceramide", "Niacinamide", "Hyaluronic"],
    size: "100ml / 3.38 fl.oz",
  },
  {
    id: "celestial-green",
    name: "Celestial Green Shower Gel",
    tagline: "Body Wash · Daily Use",
    description:
      "A pure botanical body wash infused with Cica Extract & Green Tea to cleanse, refresh and soothe skin daily. Gentle enough for every shower.",
    price: 349,
    mrp: 649,
    image: green,
    tags: ["All Skin Types", "Hydrating", "Daily Use"],
    size: "250ml / 8.45 fl.oz",
  },
  {
    id: "skin-radiating",
    name: "Skin Radiating Moisturizing Lotion",
    tagline: "Moisturizer · SPF 15",
    description:
      "A brightening powerhouse with Alpha Arbutin, Kojic Acid & Niacinamide. SPF 15 sun protection included for everyday use.",
    price: 349,
    mrp: 649,
    image: radiating,
    tags: ["Alpha Arbutin", "Kojic Acid", "SPF 15"],
    badge: "NEW ✦",
    size: "100ml / 3.38 fl.oz",
  },
  {
    id: "summer-combo",
    name: "Shower Gel Duo Pack",
    tagline: "✦ Summer Special Combo ✦",
    description:
      "Get both our bestselling Luminous Wine + Celestial Green Shower Gels together — refresh, hydrate, and glow all season.",
    price: 499,
    mrp: 698,
    image: combo,
    tags: ["Wine + Green", "2 × 250ml", "Save ₹199"],
    badge: "Hot Deal",
    size: "2 × 250ml",
  },
];
