'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { getTestimonials } from '@/lib/content';
import { AnimatedSection, SectionLabel } from '@/components/ui';
import type { Testimonial } from '@/types';

const TABS: { id: Testimonial['type']; label: string }[] = [
  { id: 'student', label: 'Students' },
  { id: 'staff', label: 'Staff' },
  { id: 'parent', label: 'Parents' },
];

export function CommunityTestimonials() {
  const [activeTab, setActiveTab] = useState<Testimonial['type']>('student');
  const allTestimonials = getTestimonials();

  const byType = (type: Testimonial['type']) =>
    allTestimonials.filter((t) => t.type === type);

  const current = byType(activeTab)[0];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="mb-10">
          <SectionLabel label="THE WHITESANDS COMMUNITY" />
        </AnimatedSection>

        <Tabs.Root
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Testimonial['type'])}
        >
          <Tabs.List className="flex gap-2 mb-12">
            {TABS.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={[
                  'font-roboto font-medium px-5 py-2 rounded transition-colors duration-200 cursor-pointer',
                  activeTab === tab.id
                    ? 'bg-deep text-white'
                    : 'text-muted hover:text-deep',
                ].join(' ')}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                {/* LEFT: video thumbnail placeholder */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-deep/10 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-deep/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-deep" fill="currentColor" />
                    </div>
                    <span className="font-sans text-sm text-deep/50">Watch testimonial</span>
                  </div>
                </div>

                {/* RIGHT: quote */}
                <div className="flex flex-col gap-6">
                  <blockquote className="font-serif italic text-deep text-3xl leading-snug">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-roboto font-bold text-dark">{current.name}</p>
                    <p className="font-sans text-muted text-sm">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs.Root>
      </div>
    </section>
  );
}
