import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isdeActive?: boolean; // isActive プロパティを修正
}

export function Button({
  children,
  className,
  isdeActive = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors',
        {
          'bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600':
            !isdeActive,
          'cursor-not-allowed bg-gray-500 text-gray-400 opacity-50 focus-visible:outline-gray-500':
            isdeActive,
        },
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
      disabled={isdeActive} // isdeActiveがtrueの場合にボタンを無効にする
    >
      {children}
    </button>
  );
}
