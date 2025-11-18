'use client';

import React from 'react';

// Setup MSW in development environment
if (process.env.NODE_ENV === 'development') {
    require('../../../public/startMsw'); 
}

export default function MswProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}