'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, FileText } from 'lucide-react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui';
import type { ElementType } from 'react';

interface CTABlock {
  icon: ElementType;
  heading: string;
  sub: string;
  href: string;
}

const blocks: CTABlock[] = [
  {
    icon: Mail,
    heading: 'INQUIRE',
    sub: 'Get in touch with us',
    href: '/contact',
  },
  {
    icon: MapPin,
    heading: 'VISIT',
    sub: 'Come see the school',
    href: '/contact#visit',
  },
  {
    icon: FileText,
    heading: 'APPLY',
    sub: 'Start your application',
    href: '/admissions',
  },
];

const blockVariants = {
  rest: { backgroundColor: 'rgba(255,255,255,0)' },
  hover: { backgroundColor: 'rgba(255,255,255,0.05)' },
};

const iconVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
};

export function CTAStrip() {
  return (
    <section className="bg-deep py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="flex justify-center">
            <SectionLabel label="TAKE THE NEXT STEP" light />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {blocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.heading}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={blockVariants}
                transition={{ duration: 0.2 }}
                className={[
                  'flex flex-col items-center text-center px-8 py-8',
                  i < blocks.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/20' : '',
                ].join(' ')}
              >
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <Icon className="w-8 h-8 text-lemon" />
                </motion.div>
                <h3 className="font-roboto font-black text-xl text-white mb-1">
                  {block.heading}
                </h3>
                <p className="font-sans text-white/60 text-sm mb-4">{block.sub}</p>
                <Link
                  href={block.href}
                  className="font-roboto font-medium text-lemon text-sm hover:underline"
                >
                  Learn more →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
