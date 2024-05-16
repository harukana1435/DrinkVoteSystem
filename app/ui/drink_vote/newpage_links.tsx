'use client'

import {
    ChevronRightIcon,
    ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Button } from '../button';
import type { Drink } from '@/app/lib/definitions';
import { Select_Button } from './button';


export default function NewpageLinks() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const page = parseInt(searchParams.toString().substring(searchParams.toString().indexOf('page=') + 5, searchParams.toString().indexOf('page=') + 7)) || 0; //現在のページを取得

    var links = [
        { icon: ChevronLeftIcon },
        { icon: ChevronRightIcon },
    ];

    if (page === 0) {
        links = [
            { icon: ChevronRightIcon },
        ];
    }

    function handleClick(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('page', term);
        } else {
            params.delete('page');
        }
        params.delete('query') //ページが変わったら選択解除
        replace(`${pathname}?${params.toString()}`);
    }


    return (
        <div className="display: flex justify-center gap-4">
            {links
                .map((link, index) => {
                    // 指定された範囲内の要素のみを抽出
                    const LinkIcon = link.icon;
                    return (
                        <Button
                            key={index}
                            onClick={() => {
                                if (LinkIcon === ChevronLeftIcon) {
                                    handleClick((page - 1).toString())
                                }
                                else if (LinkIcon === ChevronRightIcon) {
                                    handleClick((page + 1).toString())
                                }
                            }
                            }

                            className={clsx(
                                'text-sm font-medium hover:text-blue-600 md:flex-none md:p-2 md:px-3',
                            )}
                        >
                            <LinkIcon className="w-6" />
                            {/* <p className="hidden md:block">{link.name}</p> */}
                        </Button>
                    );
                })}
        </div>
    );
}

export function DrinkList({ drinkdatas }: { drinkdatas: Drink[] }) {
    const searchParams = useSearchParams();
    const pagenumber = parseInt(searchParams.toString().substring(searchParams.toString().indexOf('page=') + 5, searchParams.toString().indexOf('page=') + 7)) || 0; //現在のページを取得

    return (
        <div className="display: flex flex-wrap gap-10">
            {drinkdatas
                .slice((pagenumber) * 10, (pagenumber + 1) * 10) // 指定された範囲内の要素のみを抽出
                .map((drink_data) => (
                    <div
                        key={drink_data.id}
                        className="mt-3 flex flex-col items-center justify-center"
                    >
                        {<Select_Button id={drink_data.id} path={drink_data.path} />}
                    </div>
                ))}
        </div>
    );
}