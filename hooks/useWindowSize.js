import { useState, useEffect } from 'react';
import { debounce } from '../config/helpers';

const isBrowser = typeof window !== 'undefined';

const useWindowSize = () =>{
  const [width, setWidth] = useState(isBrowser && window.innerWidth);
  const [desktop, setDesktop] = useState(isBrowser && window.innerWidth > 800);

  useEffect(() => {
    const handleResize = debounce(() => {
      let width = window.innerWidth;
      setWidth(width);
      width < 800 ? setDesktop(false) : setDesktop(true);
    }, 1000);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return { width, desktop }
}

export default useWindowSize;