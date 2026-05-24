import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import WhyMe from "@/components/sections/WhyMe";
import Services from "@/components/sections/Services";
import Properties from "@/components/sections/Properties";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0C0E1A]">
      <Navbar />
      <Hero />
      {/* Wrapper zajišťuje že sekce "přijedou přes" sticky hero */}
      <div style={{ position: "relative", zIndex: 10, background: "#0C0E1A", marginTop: "-60vh" }}>
        <Stats />
        <About />
        <WhyMe />
        <Services />
        <Properties />
        <Testimonials />
        <CTA />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
