'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, SectionLabel } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import {
  Microscope,
  BookOpen,
  Dumbbell,
  Utensils,
  Laptop,
  Music,
  Trees,
  Home,
  Wifi,
  Leaf,
  Users,
  Building2,
} from 'lucide-react';

const FACILITIES = [
  {
    name: 'Classrooms',
    icon: Home,
    highlight: '32 classrooms across 2 campuses',
    desc: 'Bright, tech-enabled learning spaces fitted with projectors, whiteboards, and acoustic panels. Each room is designed to make teaching and deep listening equally rewarding.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  },
  {
    name: 'Science Laboratories',
    icon: Microscope,
    highlight: '6 specialist labs',
    desc: 'Fully fitted Physics, Chemistry, and Biology labs with modern apparatus. Students conduct hands-on experiments from JSS1 through SS3 — science at Whitesands is always experiential.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
  },
  {
    name: 'Library & Resource Centre',
    icon: BookOpen,
    highlight: '10,000+ volumes',
    desc: 'Over 10,000 volumes across fiction, non-fiction, and academic texts. Digital cataloguing, quiet reading zones, and a dedicated research suite. Open before and after school hours.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
  },
  {
    name: 'Sports Complex',
    icon: Dumbbell,
    highlight: '7 sports disciplines',
    desc: 'A full-size football pitch, basketball and volleyball courts, a 200m running track, a swimming pool, and a gymnasium. Facilities maintain the standards needed for inter-school and state-level competition.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  },
  {
    name: 'ICT & Technology Labs',
    icon: Laptop,
    highlight: '80+ workstations',
    desc: 'Two modern computer suites with high-speed fibre internet, a 3D printing station, and a robotics workbench. Students in all year groups have scheduled ICT time as well as open-access periods.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  },
  {
    name: 'Arts Centre & Auditorium',
    icon: Music,
    highlight: '400-seat auditorium',
    desc: 'A 400-seat auditorium for productions, assemblies, and concerts. Dedicated music practice rooms, a photography darkroom, and a visual arts studio with natural light and kiln.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    name: 'Dining Hall',
    icon: Utensils,
    highlight: 'Serves 600+ daily',
    desc: 'Spacious and welcoming. Nutritious meals prepared daily with a rotating menu that includes vegetarian and dietary options. Students eat together — we believe the shared table is a school in itself.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
  },
  {
    name: 'Grounds & Green Spaces',
    icon: Trees,
    highlight: '25+ acres',
    desc: 'Over 25 acres of thoughtfully landscaped grounds, including a prayer garden, reflection areas, and shaded outdoor classrooms. Our environmental club actively maintains and expands the greenery.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
  },
];

const CAMPUS_FEATURES = [
  { icon: Wifi,      label: 'Campus-wide\nHigh-speed Wi-Fi' },
  { icon: Leaf,      label: 'Solar-powered\nEnergy Systems' },
  { icon: Users,     label: 'Dedicated\nParent Meeting Rooms' },
  { icon: Building2, label: 'Fully\nAccessible Buildings' },
];

export default function FacilitiesPage() {
  return (
    <main className="pt-25">
      {/* Hero */}
      <section className="bg-deep py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel label="What We Offer" light className="mb-6" />
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
                Facilities & Campus
              </h1>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                Our campus is a carefully considered environment for learning, creativity, and
                wellbeing. Every building, every space, and every piece of equipment reflects our
                conviction that the environment forms the student as much as the curriculum does.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-lemon py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '32', label: 'Classrooms' },
              { stat: '8',  label: 'Specialist Labs' },
              { stat: '25+', label: 'Acres of Green Space' },
              { stat: '2',  label: 'Campuses' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <p className="font-roboto font-black text-4xl text-deep">{item.stat}</p>
                <p className="font-sans text-sm text-dark/70 mt-2">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel label="Our Campus" className="mb-4" />
            <h2 className="font-serif text-5xl font-bold text-dark mt-2 max-w-2xl">
              Built for Learning, Growth, and Discovery
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {FACILITIES.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut', delay: (idx % 4) * 0.05 }}
                  className="bg-white border border-deep/10 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={fac.image}
                      alt={fac.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-deep/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="font-roboto font-semibold text-xs uppercase tracking-widest text-lemon bg-deep/80 px-3 py-1">
                        {fac.highlight}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-deep/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-deep" />
                      </div>
                      <h3 className="font-roboto font-bold text-deep text-lg">{fac.name}</h3>
                    </div>
                    <p className="font-sans text-sm text-muted leading-relaxed">{fac.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Built with purpose */}
      <section className="bg-deep py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <SectionLabel label="Our Philosophy" light className="mb-6" />
              <h2 className="font-serif text-5xl text-white mb-6 leading-tight">
                Built with Purpose
              </h2>
              <p className="font-sans text-white/80 text-lg leading-relaxed mb-6">
                Our facilities are not simply infrastructure — they are pedagogy made physical.
                Energy-efficient classrooms with natural light, green spaces for outdoor reflection,
                a prayer garden for quiet encounter with God — every design decision reflects what
                we believe education is for.
              </p>
              <p className="font-sans text-white/70 text-base leading-relaxed mb-8">
                We are currently developing Phase 2 of our campus expansion, which will include a
                new performing arts wing, an innovation hub, and an expanded sports complex.
                Construction begins in 2026.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 font-roboto font-medium text-lemon border-b border-lemon/50 pb-0.5 hover:border-lemon transition-colors duration-200"
              >
                Book a Campus Visit →
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {CAMPUS_FEATURES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white/10 border border-white/10 p-5 rounded-sm">
                      <Icon size={22} className="text-lemon mb-3" />
                      <p className="font-sans text-sm text-white/80 leading-snug whitespace-pre-line">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-12 text-center">
            <SectionLabel label="See It Yourself" className="justify-center mb-4" />
            <h2 className="font-serif text-4xl font-bold text-dark mt-2">
              Come and See
            </h2>
            <p className="font-sans text-muted text-base mt-4 max-w-xl mx-auto">
              The best way to understand a Whitesands education is to experience the campus in person.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Campus Tour',
                  desc: 'A guided walk through classrooms, laboratories, the library, and our sports facilities. Tours run on weekdays by appointment.',
                },
                {
                  title: 'Open Day',
                  desc: 'Meet staff, current students, and experience campus life first-hand. Open Days are held each term — see the Admissions page for dates.',
                },
                {
                  title: 'Virtual Tour',
                  desc: 'Explore our campus from anywhere in the world with our 360° interactive tour — a useful first step before a physical visit.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-white p-6 rounded-sm border border-deep/5 border-t-4 border-t-white hover:border-t-lemon shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="font-roboto font-bold text-deep mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 font-roboto font-medium text-deep border-b-2 border-lemon pb-1 hover:text-bold transition-colors duration-200"
              >
                Contact Admissions to Book →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
