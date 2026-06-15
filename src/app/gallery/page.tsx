import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import { readContent } from '@/lib/content-store';
import type { GalleryImage } from '@/types';
import { GalleryClient } from './gallery-client';

export default async function GalleryPage() {
  const images = await readContent<GalleryImage[]>('gallery');

  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/graduands-in-a-file-walking.jpg')}
        imageAlt="Whitesands students on campus"
        overlay={0.55}
        eyebrow="Gallery"
        title={
          <>
            Life at{' '}
            <span className="italic text-lemon">Whitesands.</span>
          </>
        }
        subtitle="Moments from the classroom, the chapel, the field, and the stage."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <GalleryClient images={images} />
        </div>
      </section>
    </>
  );
}
