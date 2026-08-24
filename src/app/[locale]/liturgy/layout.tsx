import type {Metadata} from 'next';
export const metadata: Metadata = {title: 'Liturgia diária', robots: {index: false, follow: false}};
export default function LiturgyLayout({children}: {children: React.ReactNode}) { return children; }
