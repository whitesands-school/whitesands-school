'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Heart, Shield, Users, Lightbulb, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedSection, SectionLabel } from '@/components/ui';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SUB_NAV = [
  { label: 'Who We Are', id: 'who-we-are' },
  { label: 'Our History', id: 'history' },
  { label: 'Vision & Mission', id: 'vision-mission' },
  { label: 'Educational Philosophy', id: 'educational-philosophy' },
];

const MILESTONES = [
  {
    year: '1999',
    title: 'The School is Founded',
    description:
      'Whitesands School opens its doors in Lagos, Nigeria, with a founding cohort of 40 pupils and a vision rooted in Catholic values. The motto Duc in Altum — Launch into the Deep — is adopted from the very first day.',
  },
  {
    year: '2002',
    title: 'First WAEC Cohort Excels',
    description:
      'The pioneer set of senior secondary students records a 100% pass rate in the West African Senior School Certificate Examination, establishing a standard the school has strived to maintain ever since.',
  },
  {
    year: '2007',
    title: 'Expansion & Accreditation',
    description:
      'A second campus is commissioned to accommodate growing enrolment. The school receives full accreditation from the Ministry of Education and is recognised as one of Lagos State\'s top independent secondary schools.',
  },
  {
    year: '2010',
    title: 'Science & Technology Block Opens',
    description:
      'A state-of-the-art Science and ICT facility is inaugurated, providing fully equipped laboratories and a computer suite that brings 21st-century learning tools into the heart of the curriculum.',
  },
  {
    year: '2015',
    title: 'Centre of Excellence Designation',
    description:
      'Following fifteen years of sustained results and community impact, Whitesands receives the Centre of Excellence designation by the Association of Catholic Schools of Nigeria, affirming its leadership in faith-based education.',
  },
  {
    year: '2024',
    title: '25th Anniversary Jubilee',
    description:
      'Whitesands celebrates twenty-five years of transforming lives. Alumni from across the globe return for the Silver Jubilee gala, and the school launches a landmark scholarship fund to honour the occasion.',
  },
];

const CORE_VALUES = [
  {
    icon: Star,
    name: 'Excellence',
    description: 'Pursuing the highest standard in academic work, character, and every endeavour undertaken.',
  },
  {
    icon: Heart,
    name: 'Faith',
    description: 'Grounded in Catholic tradition, guided by prayer, and formed by a deep moral conscience.',
  },
  {
    icon: Shield,
    name: 'Integrity',
    description: 'Upholding honesty, transparency, and ethical conduct in all relationships and responsibilities.',
  },
  {
    icon: Users,
    name: 'Community',
    description: 'Fostering a spirit of belonging, unity, and mutual care across students, staff, and families.',
  },
  {
    icon: BookOpen,
    name: 'Service',
    description: 'Cultivating a lifelong commitment to serving others — in school, in Nigeria, and in the world.',
  },
  {
    icon: Lightbulb,
    name: 'Innovation',
    description: 'Embracing curiosity and forward-thinking approaches to learning, teaching, and growth.',
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AboutSubNav({ active }: { active: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // offset = main nav (100px) + sub-nav height (~49px) + 8px breathing room
    const offset = 157;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-[88px] z-30 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto">
        {SUB_NAV.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={[
              'shrink-0 px-5 py-4 text-sm font-roboto font-medium transition-colors duration-200 border-b-2',
              active === id
                ? 'text-deep border-lemon'
                : 'text-muted border-transparent hover:text-deep',
            ].join(' ')}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function TimelineMilestone({
  year,
  title,
  description,
  index,
}: {
  year: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
      className="relative flex items-start md:gap-0 gap-6"
    >
      {/* Desktop: left content or spacer */}
      <div
        className={[
          'hidden md:block md:w-[calc(50%-2rem)]',
          isLeft ? 'md:pr-12 md:text-right' : '',
        ].join(' ')}
      >
        {isLeft && (
          <>
            <span className="font-roboto font-black text-4xl text-bold leading-none block">{year}</span>
            <h3 className="font-roboto font-bold text-xl text-dark mt-2 mb-3">{title}</h3>
            <p className="font-sans text-muted text-sm leading-relaxed">{description}</p>
          </>
        )}
      </div>

      {/* Center connector dot (desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-deep border-4 border-offwhite z-10 shrink-0" />

      {/* Desktop: right content or spacer */}
      <div
        className={[
          'hidden md:block md:w-[calc(50%-2rem)]',
          !isLeft ? 'md:pl-12' : '',
        ].join(' ')}
      >
        {!isLeft && (
          <>
            <span className="font-roboto font-black text-4xl text-bold leading-none block">{year}</span>
            <h3 className="font-roboto font-bold text-xl text-dark mt-2 mb-3">{title}</h3>
            <p className="font-sans text-muted text-sm leading-relaxed">{description}</p>
          </>
        )}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden shrink-0 w-5 h-5 rounded-full bg-deep border-4 border-offwhite mt-1.5" />
      <div className="md:hidden">
        <span className="font-roboto font-black text-4xl text-bold leading-none block">{year}</span>
        <h3 className="font-roboto font-bold text-xl text-dark mt-2 mb-3">{title}</h3>
        <p className="font-sans text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function CoreValueCard({
  icon: Icon,
  name,
  description,
}: {
  icon: React.ElementType;
  name: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 border-t-4 border-t-white hover:border-t-lemon hover:shadow-md transition-shadow duration-200"
    >
      <div className="w-10 h-10 rounded-full bg-deep/10 flex items-center justify-center mb-4">
        <Icon size={20} className="text-deep" />
      </div>
      <h4 className="font-roboto font-bold text-dark mb-2">{name}</h4>
      <p className="font-sans text-sm text-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('who-we-are');

  useEffect(() => {
    const ids = SUB_NAV.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <AboutSubNav active={activeSection} />

      {/* ── SECTION 1: Who We Are ─────────────────────────────── */}
      <section id="who-we-are">
        {/* Hero banner */}
        <div className="bg-deep py-32 text-white text-center">
          <AnimatedSection>
            <h1 className="font-serif text-6xl font-bold text-white">Who We Are</h1>
            <p className="font-serif italic text-xl text-white/70 mt-4">Duc in Altum</p>
          </AnimatedSection>
        </div>

        {/* 2-column body */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <SectionLabel label="About the School" className="mb-6" />
              <p className="font-sans text-lg text-dark leading-relaxed mb-6">
                Whitesands School is a Catholic co-educational institution in the heart of Lagos, Nigeria.
                Since our founding in 1999, we have committed ourselves to one purpose: the integral
                formation of young men and women — intellectually, spiritually, and morally — prepared
                to launch into the deep of life.
              </p>
              <p className="font-sans text-base text-muted leading-relaxed mb-6">
                We are a community where faith and reason are not in tension but in harmony. Our
                classrooms are spaces of rigorous academic enquiry; our chapel is a space of reflection
                and encounter. Together, they form the complete education Whitesands has always stood for.
              </p>
              <p className="font-sans text-base text-muted leading-relaxed mb-10">
                Guided by our motto — <em>Duc in Altum</em>, Latin for "Launch into the Deep," drawn
                from Luke 5:4 — we invite every student to leave the safety of the shore and venture
                boldly into deeper waters: deeper knowledge, deeper faith, deeper service.
              </p>

              {/* Pull quote */}
              <blockquote className="border-l-4 border-lemon bg-lemon/10 py-4 pl-8 pr-4">
                <p className="font-serif italic text-2xl text-deep leading-snug">
                  "We do not merely educate minds — we form persons of conscience, courage, and
                  compassion."
                </p>
                <cite className="block mt-3 font-roboto text-xs uppercase tracking-widest text-muted not-italic">
                  — The Principal, Whitesands School
                </cite>
              </blockquote>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop"
                  alt="Students at Whitesands School"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Our History ────────────────────────────── */}
      <section id="history" className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16 text-center">
            <SectionLabel label="Our History" className="justify-center mb-4" />
            <h2 className="font-serif text-5xl font-bold text-dark mt-2">
              25 Years of Duc in Altum
            </h2>
            <p className="font-sans text-muted text-lg mt-4 max-w-2xl mx-auto">
              From a modest founding vision to a recognised centre of Catholic education in Nigeria —
              the story of Whitesands School.
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical spine (desktop only) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-deep/20" />

            <div className="flex flex-col gap-16">
              {MILESTONES.map((m, i) => (
                <TimelineMilestone key={m.year} {...m} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Vision & Mission ──────────────────────── */}
      <section id="vision-mission" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <SectionLabel label="Vision & Mission" className="mb-4" />
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection className="mb-20">
            <div className="bg-deep text-white py-16 px-8 text-center rounded-sm">
              <p className="font-roboto text-xs uppercase tracking-widest text-white/50 mb-6">
                Our Vision
              </p>
              <p className="font-serif italic text-5xl text-white leading-snug max-w-4xl mx-auto">
                "To be Nigeria's foremost Catholic school — forming graduates who are academically
                excellent, morally grounded, and boldly prepared to serve humanity."
              </p>
            </div>
          </AnimatedSection>

          {/* Mission */}
          <AnimatedSection className="mb-20">
            <SectionLabel label="Our Mission" className="mb-8" />
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="font-sans text-lg text-dark leading-relaxed mb-6">
                  Whitesands School exists to provide a holistic, faith-integrated education that
                  equips students to excel academically, develop strong moral character, and contribute
                  meaningfully to society. We do this through a rigorous curriculum, a nurturing
                  environment, and a community deeply rooted in Catholic values.
                </p>
                <p className="font-sans text-base text-muted leading-relaxed">
                  Our teachers are not merely instructors — they are mentors, models, and ministers of
                  formation. Every lesson plan, every pastoral intervention, every extracurricular
                  programme is ordered toward one end: the full development of the human person.
                </p>
              </div>
              <div>
                <p className="font-sans text-base text-muted leading-relaxed mb-6">
                  We partner with parents as the primary educators of their children, recognising that
                  the school's role is to complement and extend the formation that begins at home.
                  Through open communication and shared accountability, we build a tri-partite covenant:
                  student, school, and family — all working toward the same horizon.
                </p>
                <p className="font-sans text-base text-muted leading-relaxed">
                  Our programmes span nursery through senior secondary, ensuring continuity of care
                  and curriculum across every stage of a child's journey with us — from the first days
                  in our nursery classrooms to the final WAEC examinations.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Core Values */}
          <AnimatedSection>
            <SectionLabel label="Core Values" className="mb-8" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_VALUES.map((v) => (
                <CoreValueCard key={v.name} {...v} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 4: Educational Philosophy ────────────────── */}
      <section id="educational-philosophy" className="bg-offwhite">
        {/* Top content */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="mb-16">
              <SectionLabel label="Educational Philosophy" className="mb-4" />
              <h2 className="font-serif text-5xl font-bold text-dark mt-2 max-w-2xl">
                Forming the Whole Person
              </h2>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="font-sans text-lg text-dark leading-relaxed mb-6">
                    The educational philosophy of Whitesands School is rooted in the Catholic
                    intellectual tradition — a tradition that holds that faith and reason are
                    complementary paths toward truth. Our curriculum is designed not merely to
                    transmit knowledge but to form habits of mind: the capacity for deep inquiry,
                    careful reasoning, and courageous wonder.
                  </p>
                  <p className="font-sans text-base text-muted leading-relaxed mb-6">
                    We draw on the best of classical and contemporary pedagogy. The humanities form the
                    spine of our academic programme, cultivating an appreciation for literature,
                    history, and the arts as windows into the human condition. The sciences are taught
                    with rigour and imagination, emphasising observation, hypothesis, and the joy of
                    discovery.
                  </p>
                  <p className="font-sans text-base text-muted leading-relaxed">
                    Character development is not an add-on — it is woven into the fabric of every
                    school day. Our pastoral care system ensures that no student is invisible; every
                    child is known by name, known in their struggles, and celebrated in their progress.
                  </p>
                </div>
                <div>
                  <p className="font-sans text-base text-muted leading-relaxed mb-6">
                    Spiritual formation runs alongside intellectual formation. Daily prayers, weekly
                    Masses, the sacraments, and service learning opportunities ensure that students
                    encounter the living God not as an abstract doctrine but as a personal reality
                    that shapes how they see themselves and the world.
                  </p>
                  <p className="font-sans text-base text-muted leading-relaxed mb-6">
                    We recognise the dignity of every learner. Our teachers differentiate instruction,
                    meet students where they are, and draw out what is best in each child. We believe
                    that intelligence is multifaceted — that the student who excels in music, sport,
                    or compassion is just as valuable as the student who tops the class in mathematics.
                  </p>
                  <p className="font-sans text-base text-muted leading-relaxed">
                    Ultimately, our philosophy is best captured by the words of Pope John Paul II:
                    "Do not be afraid." We form students who are unafraid to think deeply, to love
                    freely, to serve generously, and to launch — always — into the deep.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Full-width pull quote band */}
        <div className="bg-deep py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="font-serif italic text-3xl md:text-4xl text-white leading-snug">
              "The goal of education is not the transmission of information but the transformation
              of the person — mind, heart, and soul."
            </p>
            <p className="font-roboto text-xs uppercase tracking-widest text-white/50 mt-8">
              Whitesands School — Educational Philosophy
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <div className="text-center">
                <p className="font-sans text-muted mb-6 max-w-xl mx-auto">
                  Discover the dedicated educators who bring this philosophy to life every day in our
                  classrooms.
                </p>
                <Link
                  href="/our-people"
                  className="inline-flex items-center gap-2 font-roboto font-medium text-deep border-b-2 border-lemon pb-1 hover:text-bold transition-colors duration-200"
                >
                  Meet Our People →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
