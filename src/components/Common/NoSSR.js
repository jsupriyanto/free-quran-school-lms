"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Component to prevent SSR for components that cause hydration issues
const NoSSR = ({ children, fallback = null }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window !== 'undefined' ? children : fallback}
    </div>
  );
};

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
  loading: () => null
});