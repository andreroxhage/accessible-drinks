"use client"
import { HomeIcon } from '@heroicons/react/20/solid';
import { useParams, usePathname } from 'next/navigation';
import { use, useState } from 'react';

export default function BreadcrumbExplore() {
    const route = usePathname().split("/")[1];
    return (
        <nav aria-label="Breadcrumb" className="mt-4 flex">
        <ol role="list" className="flex items-center space-x-4">
            <li>
            <div>
                <a href="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
                </a>
            </div>
            </li>
            <li key={route}>
                <div className="flex items-center">
                <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="size-5 shrink-0 text-gray-300"
                >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a
                    href={route}
                    aria-current={route ? 'page' : undefined}
                    className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                    {route.toUpperCase().slice(0,1)}{route.slice(1)}
                </a>
                </div>
            </li>
        </ol>
        </nav>
    );
}
