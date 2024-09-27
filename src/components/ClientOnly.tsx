'use client';

import React from 'react';

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? children : null;
};

export default ClientOnly;
