import { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger the enter animation on mount
    const t = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        show
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-[0.97]'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
