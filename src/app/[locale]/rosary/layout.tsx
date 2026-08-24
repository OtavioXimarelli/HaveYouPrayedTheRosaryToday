import type {Metadata} from 'next';
export const metadata: Metadata = {title: 'Rosário guiado', robots: {index: false, follow: false}};
export default function RosaryLayout({children}: {children: React.ReactNode}) { return children; }
