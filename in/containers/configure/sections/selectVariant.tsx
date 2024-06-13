/* eslint-disable @next/next/no-img-element */
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Marquee from "react-fast-marquee";
import Style from "../configure.module.scss";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { TextElement } from "../../../components/atoms/Texts";
import { MapCss } from "../../../utils/utils";
import Button from "../../../components/atoms/Button";
import Link from "next/link";
import IMG from "next/image";
import { DOMIDMAPPINGS } from "../../../constants";
import { API_CONSTANTS } from "../../../services/constants";
import { getcompleteUserProfile } from "../../../services/ProfileService";
import { ReconfigureFlow } from "../../../utils/CookieManagement";

const slideImages = {
  "1": {
    total: 121,
    slide: "a2s",
  },
  "2": {
    total: 121,
    slide: "s2l",
  },
};

const variants = [
  { name: "airstrike", label: "Mach 3 activated.", color: "#8690A0" },
  { name: "shadow", label: "Enter The Dark Side.", color: "#2E2E2E" },
  { name: "laser", label: "Adrenaline is addictive.", color: "#CE483F" },
];

const SelectVariant = () => {
  const { isMobile } = useContext(NavbarContext);
  const dragsPerImage = isMobile ? 2 : 3;
  const device = isMobile ? "mobile" : "desktop";

  const currentVariant = useRef(1);
  const [selectedVariantState, setSelectedVariantState] = useState(1);
  const [currentSlide, setCurrentSlide] = useState<"1" | "2">("1");

  const [imageIndex, setImageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const dragStartPos = useRef(0);
  const draggedImages = useRef<number[]>([]);

  const rootRef = useRef<HTMLImageElement>(null);
  const dissallowRef = useRef(false);

  const { userData } = useContext(NavbarContext);

  useEffect(() => {
    (async () => {
      if (userData?.email && ReconfigureFlow.exists()) {
        const reqpayload = {
          email: userData?.email,
        };
        const profileInfo = await getcompleteUserProfile(reqpayload);
        if (profileInfo) {
          const preselected = variants.findIndex(
            (each) => each.name === profileInfo.model
          );
          if (preselected === 0) {
            return;
          } else {
            setCurrentSlide("2");
          }
          if (preselected === 2) {
            setImageIndex(slideImages["2"].total);
          }
          setSelectedVariantState(preselected + 1);
          currentVariant.current = preselected + 1;
        }
      }
    })();
  }, [userData]);

  const animate = (from, to, callback, duration = 10) => {
    let diff = from > to ? from - to : to - from;

    dissallowRef.current = true;
    let currentInd = from;
    let timer = setInterval(() => {
      if (from < to ? currentInd > to : currentInd < to) {
        clearInterval(timer);
        callback();
        toggleInfo("show");
        dissallowRef.current = false;
        return;
      }
      if (currentInd === 0) {
        return;
      }
      setImageIndex(currentInd);
      currentInd = from < to ? currentInd + 1 : currentInd - 1;
      diff = diff - 1;
    }, duration);
  };

  const toggleInfo = (state: "show" | "hide") => {
    const elements = document.getElementsByClassName("variant-info");
    const proceedElement = document.getElementById(DOMIDMAPPINGS.PROCEED_NEXT);

    // @ts-ignore
    Array.from(elements).forEach((element) => {
      if (state === "hide") {
        (element as HTMLElement).classList.remove("opacity-100");
        (element as HTMLElement).classList.add("opacity-0");
      } else {
        (element as HTMLElement).classList.remove("opacity-0");
        (element as HTMLElement).classList.add("opacity-100");
      }
    });
    if (proceedElement) {
      if (state === "hide") {
        (proceedElement as HTMLElement).classList.add("bg-grey2");
        (proceedElement as HTMLElement).classList.remove("bg-black");
      } else {
        (proceedElement as HTMLElement).classList.remove("bg-grey2");
        (proceedElement as HTMLElement).classList.add("bg-black");
      }
    }
  };

  const XCordPosGLobal = useRef(0);

  const DragStart = (e) => {
    const xCords = isMobile ? e?.changedTouches[0]?.pageX : e?.clientX;
    dragStartPos.current = xCords;
    toggleInfo("hide");
  };

  const OnDrag = (e) => {
    const xCords = isMobile ? e?.changedTouches[0]?.pageX : e?.clientX;

    if (!xCords) {
      return;
    }
    XCordPosGLobal.current = xCords;

    let current = Math.floor((dragStartPos.current - xCords) / dragsPerImage);

    if (current < 0) {
      if (currentVariant.current === 1) {
        return;
      }
      if (currentVariant.current === 2) {
        setCurrentSlide("1");
      }

      const curr = slideImages[currentSlide].total + current;
      if (curr < 1) {
        setImageIndex(1);
      } else {
        setImageIndex(curr);
      }
    } else {
      if (currentVariant.current === 3) {
        return;
      }

      if (current > slideImages[currentSlide].total) {
        setImageIndex(slideImages[currentSlide].total);
      } else {
        setImageIndex(current);
      }
    }

    if (draggedImages.current.includes(current)) {
      return;
    }

    draggedImages.current.push(current);
  };

  const DragEnd = (e) => {
    const xCords = XCordPosGLobal.current;
    draggedImages.current = [];

    const lastDragPoint = Math.floor(
      (dragStartPos.current - xCords) / dragsPerImage
    );

    // prev swipe
    if (lastDragPoint < 0) {
      if (currentVariant.current === 1) {
        return;
      }
      // drag crossed more than half
      if (-lastDragPoint > slideImages[currentSlide].total / 2) {
        const startAnimatePoint =
          slideImages[currentSlide].total + lastDragPoint < 1
            ? 1
            : slideImages[currentSlide].total + lastDragPoint;
        animate(startAnimatePoint, 1, () => {
          if (currentVariant.current > 1) {
            currentVariant.current = currentVariant.current - 1;
            setCurrentSlide(currentVariant.current === 1 ? "1" : "2");
            setSelectedVariantState((c) => c - 1);
          }
        });
      } else {
        animate(
          slideImages[currentSlide].total + lastDragPoint,
          slideImages[currentSlide].total,
          () => {
            setCurrentSlide((e) => {
              if (e !== "2") {
                setImageIndex(1);
              }
              return currentVariant.current === 1 ? "1" : "2";
            });
          }
        );
      }
    } else {
      if (currentVariant.current === 3) {
        toggleInfo("show");
        return;
      }
      // drag crossed more than half of the slide
      if (lastDragPoint > slideImages[currentSlide].total / 2) {
        const startAnimatePoint =
          lastDragPoint > slideImages[currentSlide].total
            ? slideImages[currentSlide].total
            : lastDragPoint;

        animate(startAnimatePoint, slideImages[currentSlide].total, () => {
          setCurrentSlide((curr) => {
            if (curr === "1") {
              setImageIndex(1);
            }
            return "2";
          });
          if (currentVariant.current < 3) {
            currentVariant.current = currentVariant.current + 1;
            setSelectedVariantState((c) => c + 1);
          }
        });
      } else {
        animate(lastDragPoint, 1, () => {
          setCurrentSlide(currentVariant.current === 1 ? "1" : "2");
        });
      }
    }
  };

  useEffect(() => {
    // preload images
    const allSrc: string[] = [];
    Object.keys(slideImages).forEach((each, i) => {
      for (i = 1; i < slideImages[each].total; i++) {
        // allSrc.push(`/images/config/turntable/${each}/${device}_${slideImages[each].slide}_${i}.jpg`)
        // allSrc.push(`/_next/image?url=%2Fimages%2Fconfig%2Fturntable%2F${each}%2F${device}_${slideImages[each].slide}_${i}.jpg&w=1920&q=100`)
        // allSrc.push(`/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnabilbetaflux%2Fturntable%2F${each}%2F${device}_${slideImages[each].slide}_${i}.jpg&w=1920&q=100`)
        allSrc.push(
          `${API_CONSTANTS.BASE_IMAGE_URL_CDN_CONFIG}/turntable/${each}/${device}_${slideImages[each].slide}_${i}.jpg`
        );
      }
    });

    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(allSrc.map((image) => loadImage(image))).then((e) => {
      setIsLoading(false);
    });

    rootRef.current?.addEventListener(
      isMobile ? "touchstart" : "dragstart",
      DragStart
    );
    rootRef.current?.addEventListener(isMobile ? "touchmove" : "drag", OnDrag);
    rootRef.current?.addEventListener(
      isMobile ? "touchend" : "dragleave",
      DragEnd
    );

    return () => {
      rootRef.current?.removeEventListener(
        isMobile ? "touchstart" : "dragstart",
        DragStart
      );
      rootRef.current?.removeEventListener(
        isMobile ? "touchmove" : "drag",
        OnDrag
      );
      rootRef.current?.removeEventListener(
        isMobile ? "touchend" : "dragleave",
        DragEnd
      );
    };
  }, []);

  // need to clean
  const ClickOnThumb = (i) => {
    if (dissallowRef.current || selectedVariantState === i) {
      return;
    }
    if (selectedVariantState > 0 && selectedVariantState < 4) {
      // click thumb more than 1 difference
      if (selectedVariantState - i > 1 || i - selectedVariantState > 1) {
        if (selectedVariantState == 3) {
          animate(
            slideImages[currentSlide].total,
            1,
            () => {
              setCurrentSlide("1");
              setImageIndex(slideImages["1"].total);
              animate(
                slideImages["1"].total,
                1,
                () => {
                  setSelectedVariantState(1);
                  currentVariant.current = 1;
                },
                2
              );
            },
            2
          );
          return;
        } else {
          animate(
            1,
            slideImages[currentSlide].total,
            () => {
              setCurrentSlide("2");
              setImageIndex(1);
              animate(
                1,
                slideImages["1"].total,
                () => {
                  setSelectedVariantState(3);
                  currentVariant.current = 3;
                },
                2
              );
            },
            2
          );
          return;
        }
      } else {
        // prev click
        if (selectedVariantState >= i) {
          if (selectedVariantState === 3) {
            animate(
              slideImages[currentSlide].total,
              1,
              () => {
                setSelectedVariantState((i) => i - 1);
                currentVariant.current = currentVariant.current - 1;
              },
              3
            );
          } else {
            if (selectedVariantState !== 1) {
              setCurrentSlide("1");
              setTimeout(() => {
                animate(slideImages[currentSlide].total, 1, () => {}, 3);
              }, 10);
              animate(
                slideImages[currentSlide].total,
                1,
                () => {
                  setSelectedVariantState((i) => i - 1);
                  currentVariant.current = currentVariant.current - 1;
                },
                3
              );
            }
          }
        } else {
          if (i === 3) {
            animate(
              1,
              slideImages[currentSlide].total,
              () => {
                setSelectedVariantState((i) => i + 1);
                currentVariant.current = currentVariant.current + 1;
              },
              3
            );
          } else {
            animate(
              imageIndex,
              slideImages[currentSlide].total,
              () => {
                setSelectedVariantState((i) => i + 1);
                currentVariant.current = currentVariant.current + 1;
                setCurrentSlide("2");
                setImageIndex(1);
              },
              3
            );
          }
        }
      }
    }
  };

  return (
    <div>
      {/* <div className="absolute bottom-20 lg:bottom-[auto] right-2 lg:right-4 lg:top-[70px]  z-10">
        For Debugging <br />
        <>Current Variant: {currentVariant.current}</> <br />
        <>Current Slide: {currentSlide}</> < br/>
        <>Current Image Index: {imageIndex}</>
      </div> */}

      {/* TURNTABLE */}
      <div className={Style.turnTable} {...(isMobile ? { ref: rootRef } : {})}>
        {/* cursor */}
        {!isMobile && (
          <div
            draggable
            ref={rootRef}
            className=" top-0 bottom-[20vh] z-20 absolute  w-[100vw]"
            style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
          />
        )}
        <img
          alt="turntable"
          className={Style.turnTableImage}
          src={`${API_CONSTANTS.BASE_IMAGE_URL_CDN_CONFIG}/turntable/${currentSlide}/${device}_${slideImages[currentSlide].slide}_${imageIndex}.jpg`}
        />
      </div>

      {selectedVariantState != 1 && (
        <div
          onClick={() => ClickOnThumb(selectedVariantState - 1)}
          className="absolute flex justify-center items-center top-[25vh] sm:top-[47vh] cursor-pointer z-20 w-[50px] sm:w-[80px] h-[80px] rotate-180"
        >
          <img
            alt="carousel-control"
            src={"/images/icons/carousel-arrow.svg"}
            height={isMobile ? 24 : 40}
            width={isMobile ? 24 : 40}
          />
        </div>
      )}
      {selectedVariantState != 3 && (
        <div
          onClick={() => ClickOnThumb(selectedVariantState + 1)}
          className="absolute flex justify-center items-center top-[25vh] sm:top-[47vh] right-0 cursor-pointer z-20 w-[50px] sm:w-[80px] h-[80px]"
        >
          <img
            alt="carousel-control"
            src={"/images/icons/carousel-arrow.svg"}
            height={isMobile ? 24 : 40}
            width={isMobile ? 24 : 40}
          />
        </div>
      )}

      {/* info */}
      {
        <div>
          <div className={MapCss(Style, "variantInfoTop", "variant-info")}>
            {
              TextElement({
                text: variants[selectedVariantState - 1]?.label,
                fontSize: isMobile ? 12 : 20,
              }).REGULAR.BLACK
            }
            <div
              className="lg:-mt-3.5"
              style={{ color: variants[selectedVariantState - 1]?.color }}
            >
              {
                TextElement({
                  text: "F77 " + variants[selectedVariantState - 1]?.name.toUpperCase(),
                  fontSize: isMobile ? 24 : 42,
                  fontName: "eurostile",
                }).BOLD.INHERIT
              }
            </div>
          </div>

          <div
            style={{ zIndex: 200 }}
            className="absolute bottom-10 left-20 right-10 right-16s flex justify-between items-end "
          >
            {!isMobile && (
              <div>
                {
                  TextElement({
                    text: "CHOOSE YOUR PERSONALITY.",
                    fontName: "disketMono",
                    fontSize: isMobile ? 16 : 16,
                  }).REGULAR.BLACK
                }
              </div>
            )}

            {!isMobile && (
              <div className="variant-info">
                <Link
                  href={`/configure/${variants[selectedVariantState - 1]?.name}`}
                >
                  <Button
                    width={"390px"}
                    fontSize={20}
                    onClick={() => {}}
                    text={"NEXT"}
                    bg={"white"}
                    disable={false}
                    height={"63px"}
                    hoverColor={"#ce483f"}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      }

      <div className={Style.turntableThumb} style={{}}>
        {variants.map((e, i) => (
          <div
            key={i}
            onClick={() => ClickOnThumb(i + 1)}
            className={MapCss(
              Style,
              `thumb ${i + 1 === selectedVariantState ? "selected-thumb" : ""}`
            )}
          />
        ))}
      </div>

      {/* swipe text (mobile only) */}
      {isMobile && (
        <div className="relative -mt-8 w-full text-center">
          {
            TextElement({
              text: "<swipe>",
              fontSize: 14,
              fontName: "disketMono",
            }).REGULAR.WHITE
          }
        </div>
      )}

      {isMobile && (
        <div className="">
          <div className="flex w-full justify-between px-7 pt-7 bg-gre">
            {
              TextElement({
                text: "Choose your personality.",
                fontName: "disketMono",
                fontSize: 12,
              }).REGULAR.BLACK
            }
            <IMG
              src={"/images/icons/config-qr.png"}
              width={100}
              height={18}
              alt="qr-design"
            />
          </div>

          {/* 
          // @ts-ignore */}
          <Marquee
            speed={60}
            gradient={false}
            delay={2}
            className="mt-10"
            style={{ paddingLeft: "7px" }}
          >
            {
              TextElement({
                text: "For best experience, configure your f77 on desktop",
                fontName: "disketMono",
                fontSize: 11,
              }).REGULAR.BLACK
            }
            <span
              style={{
                width: "100vw",
              }}
            ></span>
          </Marquee>
        </div>
      )}

      {isMobile && (
        <Link href={`/configure/${variants[selectedVariantState - 1]?.name}`}>
          <div
            id={DOMIDMAPPINGS.PROCEED_NEXT}
            onClick={() => {}}
            className="bg-[#DA4F46] py-4 pl-10 pr-8 flex justify-between cursor-pointer fixed bottom-0 left-0 right-0"
          >
            {TextElement({ text: "PROCEED" }).MEDUIM.WHITE}
            <IMG
              alt="arrow white"
              width={16}
              height={16}
              src={"/images/icons/arrow-white.svg"}
            />
          </div>
        </Link>
      )}
    </div>
  );
};

export default SelectVariant;
