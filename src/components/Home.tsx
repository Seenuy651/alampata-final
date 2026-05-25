import { lazy, Suspense, useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import logoMark from "@/assets/logo-mark.png";
import { products, type Product } from "@/lib/products";

const Scene3D = lazy(() => import("./Scene3D"));



const WHATSAPP_NUMBER = "917434050812"; // +91 74340 50812

const ingredients = [
  "Alpha Arbutin", "Kojic Acid", "Niacinamide", "Cica Extract",
  "Ceramides", "Hyaluronic Acid", "SPF 15", "Oil-Free Formula",
  "Dermatologist Tested", "All Skin Types",
];

export default function Home() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Pinned cinematic 3D scene as the world background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-muted-foreground text-sm">Loading experience…</div>}>
          <Scene3D />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/70" />
      </div>
      
      <Nav />
      <Hero />
      <Marquee />
      <OfferBanner />
      <Products onOrder={(p) => setActive(p)} />
      <Science />
      <Story />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      {active && <OrderModal product={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* ─────────────────────────────  Backdrop  ───────────────────────────── */
function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-glow-soft blur-[160px]" />
    </div>
  );
}

/* ─────────────────────────────  Nav  ───────────────────────────── */
function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoMark} alt="Alampata Life Science" className="h-9 w-9 animate-spin-slow" />
          <span className="font-display text-lg tracking-wide text-glow">ALAMPATA LIFE SCIENCE</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#products" className="hover:text-foreground transition">Products</a>
          <a href="#science" className="hover:text-foreground transition">Our Science</a>
          <a href="#contact" className="hover:text-foreground transition">Get in Touch</a>
        </nav>
        <a
          href="https://rzp.io/rzp/5rSJhCW"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary hover:bg-primary/20 transition"
        >
          🛒 Order Now
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────────  Hero (Immersive 3D)  ───────────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      {/* soft edge gradients for legibility over the global 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-background/0 to-background/60" />

      <div className="pointer-events-none absolute left-6 top-24 z-10 text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:left-10">
        Alampata Life Science · Creative Skincare Experience
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground backdrop-blur animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Ahmedabad · Since 2024
        </div>

        <h1 className="font-display text-[14vw] leading-[0.88] md:text-[7.5rem] animate-fade-up">
          <span className="block text-glow">Science Meets</span>
          <span className="block text-glow">Skincare Luxury</span>
        </h1>

        <p className="mt-8 max-w-lg text-sm md:text-base text-muted-foreground animate-fade-up" style={{ animationDelay: ".2s" }}>
          Alampata Life Science crafts dermatologically inspired formulations with clinically proven actives — from brightening to deep hydration, for every skin type.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: ".35s" }}>
          <a href="#products"
             className="group relative overflow-hidden rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground ring-glow transition hover:scale-[1.03]">
            <span className="relative z-10">Explore Products</span>
            <span className="absolute inset-0 shimmer" />
          </a>
          <a href="#science"
             className="rounded-full border border-border/80 bg-background/40 backdrop-blur px-7 py-3 text-foreground hover:border-primary/60 transition">
            Our Science
          </a>
          <a href="https://rzp.io/rzp/5rSJhCW" target="_blank" rel="noreferrer"
             className="rounded-full border border-primary/40 bg-primary/10 px-7 py-3 text-sm text-primary hover:bg-primary/20 transition">
            🛒 Order Now →
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-6 z-10 hidden gap-8 md:flex">
        <Stat n="5+" l="Premium Products" />
        <Stat n="100%" l="Skin Safe" />
        <Stat n="∞" l="Skin Types" />
      </div>

      <div className="pointer-events-none absolute bottom-8 right-6 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 top-0 h-4 bg-primary animate-[scan_2.2s_linear_infinite]" />
        </span>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-glow">{n}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
    </div>
  );
}



function RingSVG({ dashed = false }: { dashed?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.20 165)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.6 0.18 180)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#g1)" strokeWidth="0.4"
              strokeDasharray={dashed ? "1 3" : undefined} />
      <circle cx="50" cy="2" r="1.4" fill="oklch(0.85 0.2 165)" />
    </svg>
  );
}


/* ─────────────────────────────  Marquee  ───────────────────────────── */
function Marquee() {
  const row = [...ingredients, ...ingredients];
  return (
    <div className="border-y border-border/60 bg-card/30 py-5 overflow-hidden">
      <div className="flex w-max animate-marquee gap-12 px-6 font-display text-sm tracking-widest text-muted-foreground">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span className="text-glow">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────  Offer Banner  ───────────────────────────── */
function OfferBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16">
      <div className="relative overflow-hidden rounded-3xl glass ring-glow px-8 py-10 md:px-14 md:py-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-primary">✦ Festive Drop ✦</div>
            <h3 className="mt-3 font-display text-3xl md:text-5xl">Flat <span className="text-glow">46% OFF</span> · Free Shipping ₹499+</h3>
            <p className="mt-3 text-sm text-muted-foreground">Limited stock · Combo packs included · COD available all over India.</p>
          </div>
          <a href="#products" className="rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground ring-glow hover:scale-105 transition">Grab Deal →</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Story  ───────────────────────────── */
function Story() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="animate-fade-up">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Our Story</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Born in Ahmedabad. <span className="text-glow">Built for India.</span></h2>
          <p className="mt-6 text-muted-foreground">Alampata Life Science is a homegrown skincare brand crafting dermatologically inspired formulations with globally proven actives — Alpha Arbutin, Kojic Acid, Niacinamide, Cica & Ceramides — at honest, accessible prices.</p>
          <p className="mt-4 text-muted-foreground">Every product is created with one mission: deliver salon-grade results from the comfort of your home, without the luxury markup.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Stat n="2024" l="Founded" />
            <Stat n="10K+" l="Happy Skins" />
            <Stat n="100%" l="Made in India" />
          </div>
        </div>
          <div className="relative aspect-square animate-fade-up" style={{ animationDelay: ".2s" }}>
            <div className="absolute inset-0 rounded-full bg-glow-soft blur-3xl" />
            <div className="relative h-full w-full rounded-3xl glass ring-glow grid place-items-center">
              <img src={logoMark} alt="Alampata Life Science" className="h-40 w-40 animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  FAQ  ───────────────────────────── */
function FAQ() {
  const items = [
    { q: "Are Alampata Life Science products safe for sensitive skin?", a: "Yes. All formulations are dermatologically tested and free from parabens, sulphates and harsh fragrances." },
    { q: "How do I place an order?", a: "Click 'Order Now' on any product, fill the form, and submit. Your details auto-send to our WhatsApp team for confirmation." },
    { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available pan-India with a small ₹90 handling fee." },
    { q: "When will I receive my order?", a: "Orders ship within 24 hours and reach you in 3–6 business days depending on location." },
    { q: "Can I return a product?", a: "Unopened products can be returned within 7 days of delivery. Contact us on WhatsApp +91 74340 50812." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-28">
      <SectionHead eyebrow="FAQ" title="Questions, Answered" />
      <div className="mt-12 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
              <span className="font-display text-lg">{it.q}</span>
              <span className={`text-glow transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && <div className="px-6 pb-5 text-sm text-muted-foreground animate-fade-up">{it.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────  Products  ───────────────────────────── */
function Products({ onOrder }: { onOrder: (p: Product) => void }) {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHead eyebrow="Our Products" title="Formulated with Purpose & Precision" />
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} onOrder={onOrder} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, onOrder, delay }: { p: Product; onOrder: (p: Product) => void; delay: number }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1 hover:ring-glow animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {p.badge && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
          {p.badge}
        </span>
      )}
      <div className="relative mx-auto flex h-56 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-glow-soft blur-3xl opacity-50 transition group-hover:opacity-90" />
        <img
          src={p.image}
          alt={p.name}
          className="relative max-h-56 w-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 animate-float-y"
        />
      </div>
      <div className="mt-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.tagline}</div>
        <h3 className="mt-2 font-display text-xl">{p.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground">
              {t}
            </span>
          ))}
          {p.size && (
            <span className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground">
              {p.size}
            </span>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="font-display text-2xl text-glow">₹{p.price}</span>
            <span className="ml-2 text-sm text-muted-foreground line-through">₹{p.mrp}</span>
          </div>
          <button
            onClick={() => onOrder(p)}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:scale-105"
          >
            Order Now
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────  Science  ───────────────────────────── */
function Science() {
  const items = [
    { n: "01", t: "Clinically Validated Actives", d: "Every ingredient backed by peer-reviewed research." },
    { n: "02", t: "Formulated for Indian Skin", d: "Built for diverse skin types and Indian climate." },
    { n: "03", t: "Transparent & Ethical", d: "Every active listed on the label — no fluff, no fillers." },
    { n: "04", t: "Accessible Luxury", d: "Premium science at honest prices, available nationwide." },
  ];
  return (
    <section id="science" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHead eyebrow="Why Alampata Life Science" title="Built on Real Science" />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <div
            key={it.n}
            className="glass rounded-2xl p-8 animate-fade-up hover:ring-glow transition"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="font-display text-5xl text-glow opacity-60">{it.n}</div>
            <h3 className="mt-4 font-display text-xl">{it.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────  Testimonials  ───────────────────────────── */
function Testimonials() {
  const reviews = [
    { n: "Priya S.", t: "The Cica moisturizer transformed my oily skin. No more midday shine and my acne marks are visibly fading!" },
    { n: "Ritika M.", t: "The Radiating Lotion is incredible — even-toned skin after just 3 weeks and built-in SPF!" },
    { n: "Anjali K.", t: "Celestial Green smells amazing and leaves skin so soft. My whole family uses it now!" },
    { n: "Vikram D.", t: "Finally a brand that's honest about ingredients. The Luminous Wine gel is unique and effective." },
  ];
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHead eyebrow="Customer Love" title="Real Results" />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {reviews.map((r, i) => (
          <div key={i} className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="text-glow">★★★★★</div>
            <p className="mt-3 text-foreground/90">"{r.t}"</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-primary font-display">
                {r.n[0]}
              </div>
              <div>
                <div className="text-sm">{r.n}</div>
                <div className="text-xs text-muted-foreground">Verified Customer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────  Contact  ───────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHead eyebrow="Reach Out" title="We Reply Within Minutes 🚀" />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          { icon: "📍", t: "Office", l1: "333, Satva Icon, Near Vastral Metro", l2: "Vastral, Ahmedabad, Gujarat 380026" },
          { icon: "📱", t: "WhatsApp", l1: "+91 74340 50812", l2: "Message your order on WhatsApp" },
          { icon: "✉️", t: "Email", l1: "sales@alampatalifescience.com", l2: "Reply within 24 hours" },
        ].map((c) => (
          <div key={c.t} className="glass rounded-2xl p-6">
            <div className="text-3xl">{c.icon}</div>
            <div className="mt-3 font-display text-lg">{c.t}</div>
            <div className="mt-2 text-sm text-muted-foreground">{c.l1}</div>
            <div className="text-sm text-muted-foreground">{c.l2}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────  Footer  ───────────────────────────── */
function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-card/30 px-6 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <img src={logo} alt="Alampata Life Science" className="h-12 opacity-90" />
        <p className="max-w-md text-sm text-muted-foreground">
          Science-backed skincare formulated for India's diverse skin types. Clinically proven actives, transparently delivered.
        </p>

        {/* Rotating credit */}
        <div className="relative mt-4 grid h-44 w-44 place-items-center">
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="circlePath" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
              </defs>
              <text fontSize="13" fill="currentColor" className="text-glow font-display tracking-[0.35em]">
                <textPath href="#circlePath" startOffset="0">
                  ✦ CREATED BY RAHUL SHASTRI ✦ CREATED BY RAHUL SHASTRI
                </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-8 rounded-full glass animate-pulse-glow grid place-items-center">
            <img src={logoMark} alt="" className="h-12 w-12 animate-spin-reverse" />
          </div>
        </div>

        <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          © {new Date().getFullYear()} Alampata.shop | Designed & Developed by Rahul Shastri. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────  Section head  ───────────────────────────── */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">{eyebrow}</div>
      <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

/* ─────────────────────────────  Order Modal  ───────────────────────────── */
type Step = "form" | "success";

function OrderModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "", pin: "", qty: 1, pay: "COD",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const total = product.price * form.qty + (form.pay === "COD" ? 90 : 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `🛒 *New Order — Alampata Life Science*%0A` +
      `━━━━━━━━━━━━━%0A` +
      `*Product:* ${product.name}%0A` +
      `*Qty:* ${form.qty}%0A` +
      `*Price:* ₹${product.price} × ${form.qty}%0A` +
      `*Payment:* ${form.pay}${form.pay === "COD" ? " (+₹90 handling)" : ""}%0A` +
      `*Total:* ₹${total}%0A` +
      `━━━━━━━━━━━━━%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Address:* ${form.address}%0A` +
      `*City:* ${form.city} - ${form.pin}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-up" style={{animationDuration:".3s"}}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-lg" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl glass ring-glow overflow-hidden">
        <button onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/60 hover:bg-card text-foreground/70 hover:text-foreground">
          ✕
        </button>

        {step === "form" ? (
          <form onSubmit={submit} className="p-7">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0">
                <div className="absolute inset-0 rounded-full bg-glow-soft blur-2xl" />
                <img src={product.image} alt={product.name} className="relative h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.tagline}</div>
                <div className="font-display text-lg">{product.name}</div>
                <div className="mt-1 text-glow font-display">₹{product.price}
                  <span className="ml-2 text-xs text-muted-foreground line-through">₹{product.mrp}</span>
                </div>
              </div>
            </div>

            <div className="my-5 h-px bg-border" />

            <div className="grid grid-cols-2 gap-3">
              <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Input label="Mobile" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
              <Input className="col-span-2" label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
              <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Input label="PIN Code" value={form.pin} onChange={(v) => setForm({ ...form, pin: v })} required />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Quantity</label>
              <div className="flex items-center gap-2 rounded-full border border-border bg-input/60 px-2 py-1">
                <button type="button" onClick={() => setForm({ ...form, qty: Math.max(1, form.qty - 1) })}
                  className="h-7 w-7 rounded-full hover:bg-primary/20">−</button>
                <span className="w-6 text-center font-display">{form.qty}</span>
                <button type="button" onClick={() => setForm({ ...form, qty: form.qty + 1 })}
                  className="h-7 w-7 rounded-full hover:bg-primary/20">+</button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {["COD", "Online"].map((p) => (
                <button key={p} type="button" onClick={() => setForm({ ...form, pay: p })}
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    form.pay === p ? "border-primary bg-primary/15 text-primary ring-glow" : "border-border text-muted-foreground hover:border-primary/50"
                  }`}>
                  {p === "COD" ? "💵 Cash on Delivery" : "💳 Pay Online"}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-card/60 px-4 py-3">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl text-glow">₹{total}</span>
            </div>

            <button type="submit"
              className="mt-5 w-full overflow-hidden relative rounded-full bg-primary py-3 font-medium text-primary-foreground ring-glow hover:scale-[1.01] transition">
              <span className="relative z-10">Place Order via WhatsApp →</span>
              <span className="absolute inset-0 shimmer" />
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Your order details will be sent to our team on WhatsApp.
            </p>
          </form>
        ) : (
          <SuccessScreen onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", required, className = "",
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; className?: string; }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-input/60 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-glow"
      />
    </label>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-10 text-center">
      <div className="relative mx-auto h-32 w-32">
        <div className="absolute inset-0 animate-spin-slow">
          <RingSVG />
        </div>
        <div className="absolute inset-4 animate-spin-reverse">
          <RingSVG dashed />
        </div>
        <div className="absolute inset-8 rounded-full bg-primary/90 grid place-items-center text-primary-foreground animate-pulse-glow">
          <svg viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <h3 className="mt-6 font-display text-3xl text-glow">Order Placed Successfully</h3>
      <p className="mt-3 text-sm text-muted-foreground">
        We've sent your details to our team on WhatsApp. Our representative will reach out shortly to confirm your order.
      </p>
      <button onClick={onClose}
        className="mt-6 rounded-full border border-primary/60 bg-primary/10 px-6 py-2.5 text-primary hover:bg-primary/20 transition">
        Continue Shopping
      </button>
    </div>
  );
}
