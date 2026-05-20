import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProblemSection from '../components/ProblemSection';
// import FeaturesSection from '../components/FeaturesSection'; // hidden — lihat SolutionPage
import FeatureShowcase from '../components/FeatureShowcase';
import EcosystemSection from '../components/EcosystemSection';
import WhySection from '../components/WhySection';
import TestimonialSection from '../components/TestimonialSection';
import ClientSection from '../components/ClientSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function HomePage({ onNavigate, onOpenDemo }) {
  return (
    <>
      <Hero onOpenDemo={onOpenDemo} />
      <TrustBar />
      <ProblemSection />
      <FeatureShowcase onNavigate={onNavigate} />
      <EcosystemSection />
      <WhySection />
      <TestimonialSection />
      <ClientSection />
      <FAQSection />
      <CTASection onOpenDemo={onOpenDemo} />
    </>
  );
}
