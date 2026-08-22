import {redirect} from 'next/navigation';
export default async function AiRedirect({params}: {params: Promise<{locale: string}>}) { const {locale} = await params; redirect(`/${locale}/about#roadmap`); }
