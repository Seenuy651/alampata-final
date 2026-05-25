import { createFileRoute } from "@tanstack/react-router";
import Home from "@/components/Home";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ALAMPATA | Premium Sunscreen, Lotions & Skincare Essentials" },
      { name: "description", content: "Science-backed skincare formulated for India's diverse skin types. Clinically proven actives, transparently delivered." },
    ],
  }),
});
