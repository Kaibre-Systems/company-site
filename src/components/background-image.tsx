import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function BackgroundImage({
  src,
  alt,
  priority = false,
  quality = 75,
  className = '',
  children,
  overlay = false,
  overlayOpacity = 40,
}: BackgroundImageProps) {
  return (
    <>
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Optional Overlay */}
        {overlay && (
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
          />
        )}
      </div>
      
      {/* Content */}
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </>
  );
}
