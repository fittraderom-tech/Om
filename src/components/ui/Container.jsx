import { cn } from '../../utils/classNames';

export function Container({ className = '', children, as: Tag = 'div' }) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12', className)}>{children}</Tag>;
}
