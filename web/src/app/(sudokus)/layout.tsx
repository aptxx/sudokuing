import Abouts from '@/components/common/Abouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Abouts />
    </>
  );
}
