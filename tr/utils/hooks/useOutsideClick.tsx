import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideClick(ref, onClickOutside, args = null) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      let func;
      if (ref?.length) {
        if (
          ref.every((e) => {
            return !e?.current || !e?.current?.contains(event.target);
          })
        ) {
          func = onClickOutside;
        }
      } else if (!ref?.current || !ref?.current?.contains(event.target)) {
        func = onClickOutside;
      }
      func && (args ? func(args) : func());
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
