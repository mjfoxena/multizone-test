import { useEffect, useRef, useState, Children, cloneElement } from "react";
import { debounce } from "lodash";
import { Carousel } from "react-responsive-carousel";

const ScrollSection = ({ children }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [currentChild, setCurrentChild] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    parentRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      parentRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [currentChild]);

  const handleScroll = debounce(() => {
    let newIndex = currentChild;
    if (
      parentRef.current &&
      parentRef.current.scrollTop >= lastScrollTop &&
      parentRef.current!.scrollTop + parentRef.current!.clientHeight >=
        parentRef.current!.scrollHeight
    ) {
      newIndex =
        currentChild >= children.length - 1 ? currentChild : currentChild + 1;
    } else if (
      parentRef.current &&
      parentRef.current.scrollTop <= lastScrollTop &&
      parentRef.current!.scrollTop == 0
    ) {
      newIndex = currentChild > 0 ? currentChild - 1 : 0;
    }
    if (parentRef.current) setLastScrollTop(parentRef.current.scrollTop);
    if (newIndex < children.length - 1 && newIndex > 0) {
      parentRef.current?.scrollTo({ top: 25 });
    }
    setCurrentChild(newIndex);
  }, 500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Element is now visible");
          window.scrollTo({
            top: parentRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      },
      { threshold: 0 }
    );

    observer.observe(parentRef.current!);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={parentRef}
      style={{
        overflow: "auto",
        height: "90vh",
        scrollBehavior: "smooth",
        marginTop: "210px",
        marginBottom: "80px",
      }}
    >
      {children[currentChild]}
    </div>
  );
};

export default ScrollSection;