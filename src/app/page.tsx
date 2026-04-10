import { HeroSlideshow } from '@/components/sections/HeroSlideshow';
import { WelcomeBlock } from '@/components/sections/WelcomeBlock';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { LatestNews } from '@/components/sections/LatestNews';
import { CommunityTestimonials } from '@/components/sections/CommunityTestimonials';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { AnniversaryTeaser } from '@/components/sections/AnniversaryTeaser';

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <WelcomeBlock />
      <StatsStrip />
      <LatestNews />
      <CommunityTestimonials />
      <CTAStrip />
      <AnniversaryTeaser />
    </>
  );
}
