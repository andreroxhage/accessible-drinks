'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/20/solid';
import { useRecentDrinks } from '@/app/utils/cache';

export default function Breadcrumb({ drinkName }: { drinkName?: string }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', href: '/', current: segments.length === 0 }];

  if (segments.length > 0) {
    const firstSegment = segments[0];

    if (firstSegment === 'explore') {
      crumbs.push({
        name: 'Explore',
        href: '/explore',
        current: segments.length === 1,
      });

      if (segments.length === 2) {
        const drinkId = segments[1];
        crumbs.push({
          name: `${drinkName ? drinkName : drinkId}`,
          href: `/explore/${drinkId}`,
          current: true,
        });
      }
    } else if (firstSegment === 'faq') {
      crumbs.push({
        name: 'FAQ',
        href: '/faq',
        current: true,
      });
    } else {
      const searchQuery = firstSegment;
      crumbs.push({
        name: `Search: ${decodeURIComponent(searchQuery)}`,
        href: `/${searchQuery}`,
        current: segments.length === 1,
      });

      if (segments.length === 2) {
        const drinkId = segments[1];
        crumbs.push({
          name: `${drinkName ? drinkName : drinkId}`,
          href: `/${searchQuery}/${drinkId}`,
          current: true,
        });
      }
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="flex py-3">
      <ol
        className="flex items-center space-x-1"
        role="list"
        aria-label="breadcrumb navigation"
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.name} aria-current={isLast ? 'page' : undefined}>
              <div className="flex items-center">
                {index === 0 ? (
                  <Link
                    href={crumb.href}
                    className="text-gray-400 hover:text-gray-800"
                    aria-label="Home page"
                  >
                    <HomeIcon
                      aria-hidden="true"
                      className="size-5 shrink-0"
                      role="img"
                    />
                    <span className="sr-only">Home</span>
                  </Link>
                ) : (
                  <>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="size-5 shrink-0 text-gray-300"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    {isLast ? (
                      <span className="ml-4 text-sm font-medium text-gray-800">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="ml-4 text-sm font-medium text-gray-800 hover:text-gray-700"
                        aria-label={`Navigate to ${crumb.name}`}
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
