"use client";

import { ChevronRight, Home } from "lucide-react";
import { useRouter } from "@/i18n/routing";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const router = useRouter();

  return (
    <nav className="flex items-center gap-1.5 text-sm mb-6 overflow-x-auto pb-2" data-testid="breadcrumb-nav">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-1 text-muted-foreground hover:text-gold-600 dark:hover:text-gold-400 transition-colors flex-shrink-0"
        data-testid="breadcrumb-home"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Início</span>
      </button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5 flex-shrink-0">
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          {item.path ? (
            <button
              onClick={() => router.push(item.path!)}
              className="text-muted-foreground hover:text-gold-600 dark:hover:text-gold-400 transition-colors whitespace-nowrap"
              data-testid={`breadcrumb-${index}`}
            >
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium whitespace-nowrap">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
