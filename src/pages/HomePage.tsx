import { useRef } from "react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { HeroSection } from "@/components/ui/hero-section"
import { FeaturesMarquee } from "@/components/ui/features-marquee"
import { ServicesSection } from "@/components/ui/services-section"
import { ParallaxImageSection } from "@/components/ui/parallax-image-section"
import { DestinationsSection } from "@/components/ui/destinations-section"
import { StatsSection } from "@/components/ui/stats-section"
import { TestimonialsSection } from "@/components/ui/testimonials-section"
import { BusinessSolutionsSection } from "@/components/ui/business-solutions-section"
import { CtaSection } from "@/components/ui/cta-section"
import { ChatbotButton } from "@/components/ui/chatbot-button"

export function HomePage() {
  const navbarRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar id="navbar" ref={navbarRef} />
      <HeroSection />
      <FeaturesMarquee />
      <ServicesSection />
      <ParallaxImageSection />
      <DestinationsSection />
      <StatsSection />
      <TestimonialsSection />
      <BusinessSolutionsSection />
      <CtaSection />
      <Footer />
      <ChatbotButton navbar={navbarRef} />
    </div>
  )
}
