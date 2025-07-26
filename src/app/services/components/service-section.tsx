import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceSectionProps {
  icon: React.ReactNode;
  iconColor?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ServiceSection({
  icon,
  iconColor = '#B85C38',
  title,
  description,
  children,
  className = '',
  id = '',
}: ServiceSectionProps) {
  return (
    <div className={cn('relative z-20 pt-20 lg:pt-40 max-w-7xl mx-auto ', className)} id={id}>
      <div className="px-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className={cn('p-3 rounded-full border', `bg-[${iconColor}]/20 border-[${iconColor}]/40`)}>
            {icon}
          </div>
        </div>
        <h4 className="text-3xl lg:text-4xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white mb-4 font-panchang">
          {title}
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-300 text-center font-supreme mb-8">
          {description}
        </p>
      </div>
      <div className="relative px-8 font-supreme ">
        {children}
      </div>
    </div>
  );
}

export const SubserviceCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'p-4 sm:p-6 relative overflow-hidden bg-black hover:bg-gray-900/50 transition-all duration-300',
      className,
    )}
  >
    {children}
  </div>
);

export const SubserviceTitle = ({ children }: { children?: React.ReactNode }) => (
  <p className="max-w-5xl mx-auto text-left tracking-tight text-white text-lg md:text-xl md:leading-snug font-bold mb-2">
    {children}
  </p>
);

export const SubserviceDescription = ({ children }: { children?: React.ReactNode }) => (
  <p
    className={cn(
      'text-sm md:text-base max-w-4xl text-left mx-auto',
      'text-neutral-300 font-normal',
      'text-left max-w-sm mx-0 md:text-sm my-2 mb-4',
    )}
  >
    {children}
  </p>
);
