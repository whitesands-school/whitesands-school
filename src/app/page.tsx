import { HeroVideo } from '@/components/sections/HeroVideo';
import { WelcomeBlock } from '@/components/sections/WelcomeBlock';
import { OutcomesStatement } from '@/components/sections/OutcomesStatement';
import { HouseTeamsScroll } from '@/components/sections/HouseTeamsScroll';
import { PillarsStrip } from '@/components/sections/PillarsStrip';
import { LifeAtSchool } from '@/components/sections/LifeAtSchool';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { LatestNews } from '@/components/sections/LatestNews';
import { CommunityTestimonials } from '@/components/sections/CommunityTestimonials';
import { SchoolJsonLd } from '@/components/seo/SchoolJsonLd';
import { readContent } from '@/lib/content-store';
import type { NewsPost } from '@/types';

export default async function Home() {
  const news = (await readContent<NewsPost[]>('news'))
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <SchoolJsonLd />
      <HeroVideo />
      <WelcomeBlock />
      <OutcomesStatement />
      <HouseTeamsScroll />
      <PillarsStrip />
      <LifeAtSchool />
      <StatsStrip />
      <LatestNews posts={news} />
      <CommunityTestimonials />
      {/*
        CTAStrip intentionally omitted — the global Footer's first row
        ("Come and see · Book a visit", bg-deep) serves as the universal
        closing CTA and was stacking with CTAStrip's identical bg-deep
        treatment and similar copy.
      */}
    </>
  );
}
