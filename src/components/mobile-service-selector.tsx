"use client";
import { useState, useEffect, useRef } from "react";
import type React from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceCategoryMeta {
  id: string;
  title: string;
  description: string;
}

interface MobileServiceSelectorProps {
  categories: ServiceCategoryMeta[];
  selectedId: string;
  onCategorySelect: (id: string, mobile: boolean) => void;
  isPending?: boolean;
}

export default function MobileServiceSelector({
  categories,
  selectedId,
  onCategorySelect,
  isPending = false,
}: MobileServiceSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update current index when selected ID changes
  useEffect(() => {
    const index = categories.findIndex((cat) => cat.id === selectedId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedId, categories]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < categories.length - 1) {
      goToNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }
  };

  const goToPrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    onCategorySelect(categories[newIndex].id, true);
  };

  const goToNext = () => {
    const newIndex = Math.min(categories.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    onCategorySelect(categories[newIndex].id, true);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    onCategorySelect(categories[index].id, true);
  };

  const currentCategory = categories[currentIndex];

  return (
    <div className="lg:hidden">
      {/* Floating Pill Container */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/30 backdrop-blur-sm border border-[#B85C38]/20 rounded-full shadow-2xl">
          <div
            ref={containerRef}
            className="flex items-center px-2 py-3"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                currentIndex === 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-[#ce4710] hover:bg-[#B85C38]/20 active:scale-95"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Current Category Display */}
            <div className="flex items-center gap-3 px-4 py-1 min-w-[200px] justify-center">
              <div className="text-center">
                <div className="text-white font-medium text-md leading-tight font-supreme">
                  {currentCategory.title}
                </div>
                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-3">
                  {categories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-200",
                        index === currentIndex
                          ? "bg-[#ce4710] scale-125"
                          : "bg-gray-300 hover:bg-gray-500"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              disabled={currentIndex === categories.length - 1}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                currentIndex === categories.length - 1
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-[#ce4710] hover:bg-[#B85C38]/20 active:scale-95"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          {isPending && (
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-[#B85C38] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
