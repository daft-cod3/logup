'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from './lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/logIn');
  }, [router]);

  return null;
}
