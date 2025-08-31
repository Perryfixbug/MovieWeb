'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function BackButton({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <div className={cn(className, "relative flex items-center justify-start gap-2 w-full hover:cursor-pointer z-50")} onClick={() => router.back()}>
      <ChevronLeftIcon size={16} />
      {children}
    </div>
  );
}

export default BackButton