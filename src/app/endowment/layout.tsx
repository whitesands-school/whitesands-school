import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Endowment Fund',
  description:
    'Support the Whitesands School Alumni Endowment Fund — scholarships for deserving students and lasting investment in the school. An appeal to our alumni and friends.',
};

export default function EndowmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
