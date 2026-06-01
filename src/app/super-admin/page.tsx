import Link from 'next/link';
import { ArrowRight, Users, KeyRound, ShieldCheck } from 'lucide-react';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function getCounts() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('role', { count: 'exact' });
  if (error) return { superAdmins: 0, admins: 0 };
  return {
    superAdmins: data.filter((r) => r.role === 'super_admin').length,
    admins: data.filter((r) => r.role === 'admin').length,
  };
}

export default async function SuperAdminDashboard() {
  const user = await getSessionUser();
  const counts = await getCounts();

  return (
    <>
      <header className="pb-10 mb-10 border-b border-deep/10">
        <p
          className="font-roboto text-[11px] uppercase text-deep"
          style={{ letterSpacing: '0.28em' }}
        >
          Governance
        </p>
        <h1
          className="mt-3 font-serif text-deep leading-tight"
          style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome back, <span className="italic">{user?.email.split('@')[0]}.</span>
        </h1>
        <p className="mt-3 font-sans text-sm text-muted leading-relaxed max-w-xl">
          Super-admins manage who has access to the Whitesands content tools.
          Day-to-day editing lives over in <Link href="/admin" className="underline underline-offset-4 hover:text-deep">Content admin</Link>.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <Tile
          label="Super-admins"
          value={counts.superAdmins}
          accent="border-l-lemon"
        />
        <Tile
          label="Admins"
          value={counts.admins}
          accent="border-l-bold"
        />
        <Tile
          label="Total accounts"
          value={counts.superAdmins + counts.admins}
          accent="border-l-deep"
        />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <QuickAction
          href="/super-admin/users"
          icon={Users}
          title="Users & roles"
          description="Add admins, promote to super-admin, reset passwords, remove access."
        />
        <QuickAction
          href="/super-admin/account"
          icon={KeyRound}
          title="Change my password"
          description="Update your own credentials. We recommend doing this immediately after first sign-in."
        />
        <QuickAction
          href="/admin"
          icon={ShieldCheck}
          title="Open content admin"
          description="Edit news, staff, testimonials, popovers, and the announcement bar."
          full
        />
      </section>
    </>
  );
}

function Tile({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className={`bg-white border border-deep/10 border-l-4 ${accent} p-6`}>
      <p
        className="font-roboto text-[10px] uppercase text-muted"
        style={{ letterSpacing: '0.28em' }}
      >
        {label}
      </p>
      <p
        className="mt-3 font-serif text-deep tabular-nums"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1 }}
      >
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
  full,
}: {
  href: string;
  icon: typeof Users;
  title: string;
  description: string;
  full?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        'group bg-white border border-deep/10 p-6 hover:border-deep/30 transition-colors',
        full ? 'lg:col-span-2' : '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Icon size={18} strokeWidth={1.75} className="text-deep mb-3" />
          <p className="font-roboto text-sm font-semibold text-deep">{title}</p>
          <p className="mt-1.5 font-sans text-sm text-muted leading-relaxed max-w-md">
            {description}
          </p>
        </div>
        <ArrowRight
          size={16}
          className="text-muted group-hover:text-deep group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </Link>
  );
}
