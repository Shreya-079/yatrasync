import {
  AlertTriangle,
  Bus,
  Calendar,
  ChevronDown,
  Cloud,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Users,
  Utensils,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { Suspense, lazy, useRef } from "react";
import FeatureCard from "../components/FeatureCard";
import type { FeatureCardData } from "../components/FeatureCard";
import Header from "../components/Header";

const HeroScene = lazy(() => import("../components/HeroScene"));

const featureCards: FeatureCardData[] = [
  {
    id: "destination",
    icon: MapPin,
    title: "Destination Module",
    description:
      "Your central hub for city-specific travel information. Select a destination to unlock all services.",
    features: [
      "Delhi, Jaipur, Mumbai, Goa & Bengaluru",
      "City landmarks and attractions",
      "Local tips and cultural insights",
      "Personalized destination guides",
    ],
    accentColor: "#d97706",
    iconBg: "rgba(245,158,11,0.12)",
    topBarColor: "linear-gradient(90deg, #f59e0b, #d97706)",
    emoji: "🗺️",
  },
  {
    id: "itinerary",
    icon: Calendar,
    title: "Itinerary Planner",
    description:
      "Auto-generated day-by-day travel plans tailored to your interests and trip duration.",
    features: [
      "Enter travel days & preferences",
      "Culture, adventure, food, shopping themes",
      "Jaipur Day 1: Hawa Mahal, City Palace",
      "Day 2: Amber Fort, Jal Mahal & food tour",
    ],
    accentColor: "#2563eb",
    iconBg: "rgba(59,130,246,0.1)",
    topBarColor: "linear-gradient(90deg, #3b82f6, #2563eb)",
    emoji: "📅",
  },
  {
    id: "food",
    icon: Utensils,
    title: "Food Discovery",
    description:
      "Explore authentic local cuisine with curated restaurant recommendations and dish guides.",
    features: [
      "Chole Bhature, Butter Chicken, Paratha (Delhi)",
      "Price range & ratings for each spot",
      "Veg/non-veg filter options",
      "Nearby restaurant locator",
    ],
    accentColor: "#ea580c",
    iconBg: "rgba(249,115,22,0.1)",
    topBarColor: "linear-gradient(90deg, #f97316, #ea580c)",
    emoji: "🍜",
  },
  {
    id: "routes",
    icon: Bus,
    title: "Routes & Transport",
    description:
      "Navigate cities with confidence using real-time transport guidance and vehicle rental info.",
    features: [
      "Buses, taxis & auto-rickshaws",
      "Delhi Metro routes & timings",
      "Bike, scooter & car rentals (Goa)",
      "Best routes for every budget",
    ],
    accentColor: "#059669",
    iconBg: "rgba(16,185,129,0.1)",
    topBarColor: "linear-gradient(90deg, #10b981, #059669)",
    emoji: "🚇",
  },
  {
    id: "weather",
    icon: Cloud,
    title: "Weather Information",
    description:
      "Real-time weather forecasts help you pack right and plan activities with confidence.",
    features: [
      "Temperature, humidity & rainfall data",
      "7-day weekly forecast",
      "Manali: 8°C, Snowfall expected",
      "Activity suggestions based on weather",
    ],
    accentColor: "#0284c7",
    iconBg: "rgba(56,189,248,0.1)",
    topBarColor: "linear-gradient(90deg, #38bdf8, #0284c7)",
    emoji: "🌦️",
  },
  {
    id: "emergency",
    icon: AlertTriangle,
    title: "Emergency Services",
    description:
      "Instant access to emergency contacts and nearby safety facilities when you need them most.",
    features: [
      "Police: 100 | Ambulance: 102 | Fire: 101",
      "Nearby police stations & hospitals",
      "One-tap emergency call buttons",
      "GPS-based facility locator",
    ],
    accentColor: "#dc2626",
    iconBg: "rgba(239,68,68,0.1)",
    topBarColor: "linear-gradient(90deg, #ef4444, #dc2626)",
    emoji: "🚨",
  },
  {
    id: "guide",
    icon: Users,
    title: "Local Guide & Guardian",
    description:
      "Connect with verified local guides who provide authentic city experiences and safety support.",
    features: [
      "City tours & cultural explanations",
      "Language assistance & local insights",
      "Example: Dashashwamedh Ghat, Varanasi",
      "Background-verified guides only",
    ],
    accentColor: "#7c3aed",
    iconBg: "rgba(168,85,247,0.1)",
    topBarColor: "linear-gradient(90deg, #a855f7, #7c3aed)",
    emoji: "👥",
  },
  {
    id: "healthcare",
    icon: Heart,
    title: "Healthcare Services",
    description:
      "Comprehensive medical support including emergency care, consultations, and diagnostic services.",
    features: [
      "AIIMS Delhi & Apollo Hospital (emergency)",
      "Book appointments & online consultations",
      "Dr. Lal PathLabs & Thyrocare diagnostics",
      "Blood tests, X-rays, MRI scans",
    ],
    accentColor: "#be185d",
    iconBg: "rgba(236,72,153,0.1)",
    topBarColor: "linear-gradient(90deg, #ec4899, #be185d)",
    emoji: "🏥",
  },
  {
    id: "translator",
    icon: MessageSquare,
    title: "Language Translator",
    description:
      "Break language barriers with text, image OCR, and real-time audio translation.",
    features: [
      "Text: Type & translate instantly",
      '"Where is the hospital?" → सबसे नज़दीकी अस्पताल कहाँ है?',
      "Image OCR: Scan menus & signboards",
      "Audio: Speak & hear in local language",
    ],
    accentColor: "#0f766e",
    iconBg: "rgba(20,184,166,0.1)",
    topBarColor: "linear-gradient(90deg, #14b8a6, #0f766e)",
    emoji: "🌐",
  },
];

interface StatCounterProps {
  value: string;
  label: string;
  icon: string;
}

function StatCounter({ value, label, icon }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 text-center py-6 px-4"
    >
      <span className="text-2xl mb-1">{icon}</span>
      <motion.span
        className="font-display font-bold text-3xl text-gradient-amber"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {value}
      </motion.span>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

const stats = [
  { value: "9+", label: "Modules", icon: "⚡" },
  { value: "5+", label: "Cities", icon: "🏙️" },
  { value: "24/7", label: "Support", icon: "🛡️" },
  { value: "100%", label: "Free", icon: "✨" },
];

const scrollToFeatures = () => {
  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden hero-sky"
        data-ocid="hero.section"
      >
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-50" />

        {/* Decorative blob gradients for dreamy depth */}
        {/* Blob 1 — large amber, top-left */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "-15%",
            left: "-10%",
          }}
        />
        {/* Blob 2 — ocean blue, bottom-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.11) 0%, transparent 70%)",
            filter: "blur(80px)",
            bottom: "-10%",
            right: "-8%",
          }}
        />
        {/* Blob 3 — teal, center-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "30%",
            right: "15%",
          }}
        />
        {/* Blob 4 — warm cream, upper-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "35vw",
            height: "35vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(254,243,199,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
            top: "5%",
            right: "5%",
          }}
        />

        {/* Subtle warm radial gradient from upper-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_20%,rgba(253,230,138,0.18)_0%,transparent_70%)]" />
        {/* Cool blue accent from lower-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_90%_85%,rgba(186,230,255,0.22)_0%,transparent_70%)]" />

        {/* 3D Scene — full overlay */}
        <div className="absolute inset-0 opacity-100">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Text content — left half */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 shadow-sm">
                <Globe className="w-3.5 h-3.5" />
                Smart Travel Assistance Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
              className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl leading-[0.95] mb-6"
            >
              <span className="text-gradient-amber">Yatra</span>
              <span className="text-foreground">Sync</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="text-xl sm:text-2xl font-display font-semibold text-foreground/85 mb-3"
            >
              Your Complete Digital
              <br />
              Travel Companion
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed max-w-md"
            >
              Plan trips, discover food, navigate cities, access emergency
              services, and break language barriers — all in one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.76 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                onClick={scrollToFeatures}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px rgba(245,158,11,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base transition-smooth shadow-glow-amber-sm"
                data-ocid="hero.explore_features.button"
              >
                Explore Features ✈️
              </motion.button>
              <motion.button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl border border-black/[0.1] bg-white/70 backdrop-blur-sm text-foreground font-medium text-base hover:bg-white/90 hover:border-primary/30 transition-smooth shadow-card-sm"
                data-ocid="hero.services.button"
              >
                View Services
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToFeatures}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/40 hover:text-primary transition-colors"
          aria-label="Scroll to features"
          data-ocid="hero.scroll_indicator"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* ── Wave divider ── */}
      <div
        className="relative h-16 -mt-1 overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
            fill="#ffffff"
          />
          <path
            d="M0,48 C360,20 720,60 1080,32 C1260,20 1360,44 1440,48 L1440,64 L0,64 Z"
            fill="rgba(250,248,245,0.7)"
          />
        </svg>
      </div>

      {/* ── Stats Bar ── */}
      <section
        id="services"
        className="py-10 border-y border-black/[0.06] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        data-ocid="stats.section"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`stats.${stat.label.toLowerCase()}.item`}
              >
                <StatCounter
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 section-cream"
        data-ocid="features.section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
                All-in-One Platform
              </span>
              <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl text-foreground">
                9 Powerful Modules
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                Everything a traveler needs, seamlessly integrated in one smart
                platform designed for India's diverse destinations.
              </p>
            </motion.div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="features.list"
          >
            {featureCards.map((card, index) => (
              <FeatureCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency Banner ── */}
      <section
        className="py-12 border-y border-red-100 bg-gradient-to-r from-red-50/80 via-orange-50/60 to-red-50/80"
        id="contact"
        data-ocid="emergency.section"
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shadow-sm">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  Emergency Quick Dial
                </h3>
                <p className="text-sm text-muted-foreground">
                  Available 24/7 across India
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {[
                {
                  label: "Police",
                  number: "100",
                  color: "#2563eb",
                  bg: "bg-blue-50",
                  border: "border-blue-100",
                },
                {
                  label: "Ambulance",
                  number: "102",
                  color: "#dc2626",
                  bg: "bg-red-50",
                  border: "border-red-100",
                },
                {
                  label: "Fire Brigade",
                  number: "101",
                  color: "#ea580c",
                  bg: "bg-orange-50",
                  border: "border-orange-100",
                },
              ].map((em) => (
                <div
                  key={em.label}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${em.bg} border ${em.border} shadow-card-sm`}
                  data-ocid={`emergency.${em.label.toLowerCase()}.item`}
                >
                  <Phone className="w-4 h-4" style={{ color: em.color }} />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">
                      {em.label}
                    </span>
                    <span
                      className="font-display font-bold text-lg"
                      style={{ color: em.color }}
                    >
                      {em.number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="border-t border-black/[0.06] py-12 px-4"
        style={{ backgroundColor: "#f9f7f4" }}
        data-ocid="footer.section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shadow-sm">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <span className="font-display font-bold text-xl">
                  <span className="text-gradient-amber">Yatra</span>
                  <span className="text-foreground">Sync</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your complete digital travel companion for exploring India
                safely and authentically.
              </p>
              <p className="text-xs text-muted-foreground/50 mt-3">
                Powered by Internet Computer
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {featureCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-ocid={`footer.${card.id}.link`}
                  >
                    {card.emoji} {card.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                🚨 Emergency Numbers
              </h4>
              <div className="space-y-2.5">
                {[
                  { label: "Police", number: "100" },
                  { label: "Ambulance", number: "102" },
                  { label: "Fire Brigade", number: "101" },
                ].map((em) => (
                  <div
                    key={em.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{em.label}</span>
                    <span className="font-bold font-display text-primary">
                      {em.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-black/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} YatraSync. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              🇮🇳 Designed for travelers across India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
