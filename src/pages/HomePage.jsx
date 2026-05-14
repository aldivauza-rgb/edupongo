import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProblemSection from '../components/ProblemSection';
import FeaturesSection from '../components/FeaturesSection';
import EcosystemSection from '../components/EcosystemSection';
import WhySection from '../components/WhySection';
import TestimonialSection from '../components/TestimonialSection';
import ClientSection from '../components/ClientSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function HomePage({ onOpenDemo }) {
  return (
    <>
      <Hero onOpenDemo={onOpenDemo} />
      <TrustBar />
      <ProblemSection />
      <FeaturesSection />
      <EcosystemSection />
      <WhySection />
      <TestimonialSection />
      <ClientSection />
      <FAQSection />
      <CTASection onOpenDemo={onOpenDemo} />
    </>
  );
}
