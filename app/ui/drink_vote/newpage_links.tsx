'use client'

import {
    ChevronRightIcon,
    ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links_dashboard = [
    { name: '2', href: '/dashboard/page=2', icon: ChevronRightIcon },
];

const links = [
    { name: '1', href: '/dashboard/', icon: ChevronLeftIcon },
    { name: '2', href: '/dashboard/page=2', icon: ChevronRightIcon },
];

export default function NewpageLinks() {
    const pathname = usePathname();
    if (pathname === '/dashboard') {
        return (
            <div className="display: flex justify-center">
                {links_dashboard.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                'text-sm font-medium hover:text-blue-600 md:flex-none md:p-2 md:px-3',
                                {
                                    'bg-sky-100 text-blue-600': pathname === link.href,
                                },
                            )}
                        >
                            <LinkIcon className="w-6" />
                            {/* <p className="hidden md:block">{link.name}</p> */}
                        </Link>
                    );
                })}
            </div>
        );
    }
    else {
        return (
            <div className="display: flex justify-center">
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                'text-sm font-medium hover:text-blue-600 md:flex-none md:p-2 md:px-3',
                                {
                                    'bg-sky-100 text-blue-600': pathname === link.href,
                                },
                            )}
                        >
                            <LinkIcon className="w-6" />
                            {/* <p className="hidden md:block">{link.name}</p> */}
                        </Link>
                    );
                })}
            </div>
        );
    }
}
