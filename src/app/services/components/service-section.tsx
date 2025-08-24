import React from "react";
import { cn } from "@/lib/utils";

interface ServiceSectionProps {
  icon: React.ReactNode;
  iconColor?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ServiceSection({
  icon,
  iconColor = "#CD4813",
  title,
  children,
  className = "",
  id = "",
}: ServiceSectionProps) {
  return (
    <div
      className={cn("z-20 lg:w-4xl max-w-7xl mx-auto shrink-0", className)}
      id={id}
    >
      <div className="flex items-center justify-left gap-6 mb-6 px-2">
        <div
          className={cn(
            "p-3 rounded-full border",
            `bg-[${iconColor}]/20 border-[${iconColor}]/40`
          )}
        >
          {icon}
        </div>
        <h4 className="text-xl lg:text-3xl lg:leading-tight md:max-w-5xl pr-3 text-bottom tracking-tight font-medium text-white  font-panchang">
          {title}
        </h4>
      </div>

      <div className="relative font-supreme px-2 ">{children}</div>
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
      "p-4 sm:p-6 relative overflow-hidden bg-black hover:bg-gray-900/50 transition-all duration-300",
      className
    )}
  >
    {children}
  </div>
);

export const SubserviceTitle = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <p className="max-w-5xl mx-auto text-left tracking-tight text-white text-lg md:text-xl md:leading-snug font-bold mb-2">
    {children}
  </p>
);

export const SubserviceDescription = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <p
    className={cn(
      "text-sm md:text-base max-w-5xl text-left mx-auto",
      "text-neutral-300 font-normal",
      "text-left  mx-0 md:text-sm my-2 mb-4"
    )}
  >
    {children}
  </p>
);
