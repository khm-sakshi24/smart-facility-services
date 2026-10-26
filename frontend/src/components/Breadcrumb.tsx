import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs sm:text-sm text-gray-500">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="inline-flex items-center hover:text-forest-800 transition-colors">
            <Home className="w-4 h-4 mr-1 text-gray-400" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-forest-800 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-gray-900" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
