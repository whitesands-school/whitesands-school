export const SITE = {
  name: 'Whitesands School',
  motto: 'Duc in Altum',
  description:
    'Whitesands School is a Catholic secondary school in Lekki, Lagos, committed to academic excellence and the formation of character, faith and grit.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.whitesands.org.ng',
  email: 'info@whitesands.org.ng',
  admissionsEmail: 'admissions@whitesands.org.ng',
  alumniEmail: 'alumni@whitesands.org.ng',
  phone: '+234 907 370 9960',
  phoneTel: '+2349073709960',
  address: {
    street: 'Block 140, Whitesands Street',
    locality: 'Lekki Phase 1',
    region: 'Lagos',
    country: 'NG',
    full: 'Block 140, Whitesands Street, Lekki Phase 1, Lagos',
  },
  // Used for Google Maps embed query.
  mapsQuery: 'Whitesands School, Lekki Phase 1, Lagos, Nigeria',
  sameAs: [
    'https://www.instagram.com/whitesandsschool',
    'https://www.facebook.com/whitesandsschool',
    'https://www.linkedin.com/school/whitesands-school',
    'https://www.youtube.com/@whitesandsschool',
  ],
};
