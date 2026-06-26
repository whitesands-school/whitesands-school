'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  PageHeader,
  Card,
  Button,
  Field,
  Toast,
  useToast,
  LoadingState,
  inputClass,
  textareaClass,
  ImageUploadField,
} from '@/components/admin/ui';
import type { PageHeaderOverride } from '@/types';

// The pages whose hero band can be overridden. `key` is the page's pathname.
// The hints repeat the text each page currently ships with, shown as
// placeholders so an editor can see what they're changing — leaving a field
// blank keeps that default.
const PAGES: {
  key: string;
  label: string;
  eyebrow: string;
  subtitle: string;
}[] = [
  { key: '/about', label: 'About', eyebrow: 'About', subtitle: 'Parents first, teachers second, students in the third place.' },
  { key: '/admissions', label: 'Admissions', eyebrow: 'Admissions', subtitle: 'Open for 2026/2027. Applications close… (managed under Admissions Dates)' },
  { key: '/book-list', label: 'Book List', eyebrow: 'Admissions', subtitle: 'Textbooks for the coming session, grouped by class.' },
  { key: '/our-people', label: 'Our People', eyebrow: 'Our People', subtitle: 'Three protagonists. One educational project.' },
  { key: '/what-we-offer', label: 'What We Offer', eyebrow: 'What we offer', subtitle: 'Four areas that shape a Whitesands education.' },
  { key: '/what-we-offer/academics', label: 'Academics', eyebrow: 'Academics', subtitle: 'A Nigerian curriculum taught with rigour, taken further by international qualifications.' },
  { key: '/what-we-offer/extracurricular', label: 'Extracurricular', eyebrow: 'Extracurricular', subtitle: 'Twenty-four clubs and societies. Six houses. One field.' },
  { key: '/what-we-offer/facilities', label: 'Facilities', eyebrow: 'Facilities', subtitle: 'A campus built for the school. Every room used every day.' },
  { key: '/what-we-offer/personal-formation', label: 'Personal Formation', eyebrow: 'Personal Formation', subtitle: 'Eleven virtues across the year. One mentor for each boy.' },
  { key: '/news', label: 'News', eyebrow: 'News', subtitle: 'From the classrooms, the chapel, the field.' },
  { key: '/gallery', label: 'Gallery', eyebrow: 'Gallery', subtitle: 'Moments from the classroom, the chapel, the field, and the stage.' },
  { key: '/fees-portal', label: 'Fees', eyebrow: 'School Fees', subtitle: 'Whitesands school fees are payable securely online through PixPay.' },
  { key: '/contact', label: 'Contact', eyebrow: 'Contact', subtitle: 'Admissions, alumni, parents, press. Reach us by phone, email, or in person.' },
  { key: '/alumni-prizes', label: 'Alumni Prizes', eyebrow: 'The Alumni Prizes', subtitle: 'Whitesands alumni sponsor annual prizes that reward excellence and creativity.' },
];

type FormMap = Record<string, PageHeaderOverride>;

function blank(key: string): PageHeaderOverride {
  return { key, eyebrow: '', title: '', titleAccent: '', subtitle: '', image: '' };
}

export default function PageHeadersAdminPage() {
  const [form, setForm] = useState<FormMap>({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useToast();

  useEffect(() => {
    fetch('/api/admin/pageheaders')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('load'))))
      .then((list: PageHeaderOverride[]) => {
        const map: FormMap = {};
        for (const p of PAGES) map[p.key] = blank(p.key);
        if (Array.isArray(list)) {
          for (const o of list) {
            if (map[o.key]) map[o.key] = { ...map[o.key], ...o };
          }
        }
        setForm(map);
        setLoading(false);
      })
      .catch(() => {
        const map: FormMap = {};
        for (const p of PAGES) map[p.key] = blank(p.key);
        setForm(map);
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load saved overrides.' });
      });
  }, [setToast]);

  function update(key: string, patch: Partial<PageHeaderOverride>) {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function save() {
    setToast({ kind: 'saving' });
    // Only persist pages that actually changed something — keeps the stored
    // object small and makes "blank = use the page default" explicit.
    const payload = Object.values(form).filter(
      (o) =>
        o.eyebrow?.trim() ||
        o.title?.trim() ||
        o.titleAccent?.trim() ||
        o.subtitle?.trim() ||
        o.image?.trim()
    );
    try {
      const res = await fetch('/api/admin/pageheaders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('save');
      setToast({ kind: 'saved' });
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Page headers"
        description="Change the banner image and heading text at the top of each page. Leave a field blank to keep what the page already shows."
        actions={
          <Button onClick={save} disabled={loading}>
            Save changes
          </Button>
        }
      />

      {loading ? (
        <LoadingState />
      ) : (
        <ul className="space-y-6">
          {PAGES.map((p) => {
            const v = form[p.key] ?? blank(p.key);
            return (
              <li key={p.key}>
                <Card className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4 pb-5 mb-5 border-b border-deep/10">
                    <div>
                      <h2 className="font-serif text-xl text-deep leading-tight">
                        {p.label}
                      </h2>
                      <p className="mt-0.5 font-mono text-xs text-muted">{p.key}</p>
                    </div>
                    <a
                      href={p.key}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 font-roboto text-[10px] uppercase text-muted hover:text-deep transition-colors"
                      style={{ letterSpacing: '0.18em' }}
                    >
                      View
                      <ExternalLink size={12} strokeWidth={1.75} />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-5">
                      <Field label="Eyebrow" hint="small label above the title">
                        <input
                          type="text"
                          value={v.eyebrow ?? ''}
                          onChange={(e) => update(p.key, { eyebrow: e.target.value })}
                          placeholder={p.eyebrow}
                          className={inputClass}
                        />
                      </Field>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Title" hint="leave blank to keep current">
                          <input
                            type="text"
                            value={v.title ?? ''}
                            onChange={(e) => update(p.key, { title: e.target.value })}
                            placeholder="Main headline"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Title accent" hint="shown italic, in yellow">
                          <input
                            type="text"
                            value={v.titleAccent ?? ''}
                            onChange={(e) =>
                              update(p.key, { titleAccent: e.target.value })
                            }
                            placeholder="emphasis"
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="Subtitle" hint="supporting line">
                        <textarea
                          value={v.subtitle ?? ''}
                          onChange={(e) => update(p.key, { subtitle: e.target.value })}
                          placeholder={p.subtitle}
                          rows={2}
                          className={textareaClass}
                        />
                      </Field>
                    </div>

                    <ImageUploadField
                      label="Banner image"
                      hint="leave blank to keep current; wide landscape works best"
                      folder="pages"
                      value={v.image ?? ''}
                      onChange={(image) => update(p.key, { image })}
                      previewAspect="aspect-video"
                    />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <Toast state={toast} />
    </>
  );
}
