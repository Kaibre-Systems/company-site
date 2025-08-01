import Image from 'next/image';

interface BackgroundImageProps {
    src: string;
    alt: string;
    priority?: boolean;
    quality?: number;
    className?: string;
    imgClassName?: string;
    children?: React.ReactNode;
    overlay?: boolean;
    overlayOpacity?: number;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
}

export default function BackgroundImage({
    src,
    alt,
    priority = true,
    quality = 75,
    className = '',
    imgClassName = '',
    children,
    overlay = false,
    overlayOpacity = 40,
}: BackgroundImageProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Background Image */}
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                quality={quality}
                className={`object-cover ${imgClassName}`}
                sizes="100vw"
            />
            {/* Optional Overlay */}
            {overlay && (
                <div
                    className={`absolute inset-0 bg-black ${imgClassName}`}
                    style={{ opacity: overlayOpacity / 100, zIndex: 1 }}
                />
            )}
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
