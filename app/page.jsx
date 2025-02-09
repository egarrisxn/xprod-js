import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Examples from "@/components/landing/examples";
import CTA from "@/components/landing/cta";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Hero />
      <Features />
      <Examples />
      <CTA />
    </div>
  );
}
