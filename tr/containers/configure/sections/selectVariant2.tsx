import { useContext, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import Style from "../configure.module.scss";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { TextElement } from "../../../components/atoms/Texts";
import { MapCss } from "../../../utils/utils";
import Button from "../../../components/atoms/Button";
import Link from "next/link";
import Image from "next/image";
import { DOMIDMAPPINGS } from "../../../constants";
import React from "react";

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
  const currentSlide = useRef<"1" | "2" | "3">("1");
  const currentVariant = useRef(1);
  const [selectedVariantState, setSelectedVariantState] = useState(1);

  const { isMobile } = useContext(NavbarContext);

  const totalImageLoaded = useRef<number>(0);
  const dragStartPos = useRef(0);
  const dragsPerImage = isMobile ? 2 : 3;
  const draggedImages = useRef<number[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);

  const device = isMobile ? "mobile" : "desktop";

  const getId = (ind) => {
    return `snapshot_${device}_${
      slideImages[currentSlide.current].slide
    }_${ind}`;
  };

  useEffect(() => {}, []);

  const animate = (from, to, interval, callback) => {
    from = from % 2 === 0 ? from + 1 : from;
    let currentInd = from;
    let timer = setInterval(() => {
      if (from < to ? currentInd > to : currentInd < to) {
        clearInterval(timer);
        callback();
        toggleInfo("show");
        return;
      }
      if (
        currentInd === 0 ||
        !document.getElementById(`${getId(currentInd)}`)
      ) {
        return;
      }

      const currentTarget = document.getElementById(
        `${getId(currentInd % 2 === 0 ? currentInd - 1 : currentInd)}`
      );
      // @ts-ignore
      Array.from(rootRef.current?.getElementsByClassName("z-100")).forEach(
        (element) => {
          (element as HTMLElement).classList.remove("z-100");
        }
      );
      if (currentTarget) {
        currentTarget.classList.add("z-100");
      }

      currentInd = from < to ? currentInd + 2 : currentInd - 2;
    }, interval);
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

  useEffect(() => {
    // Load video in the dom
    let doc = document.createElement("video");
    doc.src = "/videos/desktop_turntable_a2s.mp4";
    doc.setAttribute(
      "style",
      `position: absolute; top:0;z-index:200; bottom:0;left:0;right:0;`
    );

    const DragStart = (e) => {
      const xCords = isMobile ? e?.changedTouches[0]?.pageX : e?.pageX;
      dragStartPos.current = xCords;
      toggleInfo("hide");
    };

    const OnDrag = (e) => {
      const xCords = isMobile ? e?.changedTouches[0]?.pageX : e?.pageX;
      let current = Math.floor((dragStartPos.current - xCords) / dragsPerImage);
      if (current < 1) {
        if (currentVariant.current === 1) {
          return;
        }
        if (currentVariant.current === 2) {
          currentSlide.current = "1";
        }
        current = slideImages[currentSlide.current].total + current;
        current = current % 2 === 0 ? current + 1 : current;
      } else {
        if (current % 2 === 0) {
          current = current + 1;
        }
      }

      if (draggedImages.current.includes(current) || !xCords) {
        return;
      }
      draggedImages.current.push(current);

      const currentTarget = document.getElementById(getId(current));

      // @ts-ignore
      Array.from(rootRef.current?.getElementsByClassName("z-100")).forEach(
        (element) => {
          (element as HTMLElement).classList.remove("z-100");
        }
      );

      if (currentTarget) {
        currentTarget.classList.add("z-100");
      }
    };

    const DragEnd = (e) => {
      const xCords = isMobile ? e?.changedTouches[0]?.pageX : e?.pageX;
      draggedImages.current = [];
      const lastDragPoint = Math.floor(
        (dragStartPos.current - xCords) / dragsPerImage
      );

      // prev swipe
      if (lastDragPoint < 0) {
        // drag crossed more than half
        if (-lastDragPoint > slideImages[currentSlide.current].total / 2) {
          animate(
            slideImages[currentSlide.current].total + lastDragPoint,
            1,
            10,
            () => {
              if (currentVariant.current > 1) {
                currentVariant.current = currentVariant.current - 1;
                currentSlide.current = currentVariant.current === 1 ? "1" : "2";
                setSelectedVariantState((c) => c - 1);
              }
            }
          );
        } else {
          animate(
            slideImages[currentSlide.current].total + lastDragPoint,
            slideImages[currentSlide.current].total,
            10,
            () => {
              currentSlide.current = currentVariant.current === 1 ? "1" : "2";
            }
          );
        }
      } else {
        // drag crossed more than half of the slide
        if (lastDragPoint > slideImages[currentSlide.current].total / 2) {
          animate(
            lastDragPoint,
            slideImages[currentSlide.current].total,
            10,
            () => {
              currentSlide.current = "2";
              if (currentVariant.current < 3) {
                currentVariant.current = currentVariant.current + 1;
                setSelectedVariantState((c) => c + 1);
              }
            }
          );
        } else {
          animate(lastDragPoint, 1, 10, () => {
            currentSlide.current = currentVariant.current === 1 ? "1" : "2";
          });
        }
      }
    };

    rootRef.current?.addEventListener(
      isMobile ? "touchstart" : "dragstart",
      DragStart
    );
    rootRef.current?.addEventListener(isMobile ? "touchmove" : "drag", OnDrag);
    rootRef.current?.addEventListener(
      isMobile ? "touchend" : "dragend",
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
        isMobile ? "touchend" : "dragend",
        DragEnd
      );
    };
  }, []);

  return (
    <div>
      {/* info */}
      {
        <div>
          <div className={MapCss(Style, "variantInfoTop", "variant-info")}>
            {
              TextElement({
                text: variants[selectedVariantState - 1].label,
                fontSize: isMobile ? 12 : 20,
              }).REGULAR.BLACK
            }
            <div
              className="lg:-mt-3.5"
              style={{ color: variants[selectedVariantState - 1].color }}
            >
              {
                TextElement({
                  text: variants[selectedVariantState - 1].name.toUpperCase(),
                  fontSize: isMobile ? 24 : 42,
                  fontName: "eurostile",
                }).BOLD.INHERIT
              }
            </div>
          </div>

          {/* thumb */}
          <div
            className={Style.turntableThumb}
            style={{ top: isMobile ? "58vh" : "none" }}
          >
            {variants.map((e, i) => (
              <div
                key={i}
                className={MapCss(
                  Style,
                  `thumb ${
                    i + 1 === selectedVariantState ? "selected-thumb" : ""
                  }`
                )}
              />
            ))}
          </div>

          {/* swipe text (mobile only) */}
          {isMobile && (
            <div
              style={{ zIndex: 300 }}
              className="absolute text-center left-0 right-0 top-[60vh] mt-1"
            >
              {
                TextElement({
                  text: "<swipe>",
                  fontSize: 14,
                  fontName: "disketMono",
                }).REGULAR.WHITE
              }
            </div>
          )}

          <div
            style={{ zIndex: 200 }}
            className="absolute bottom-10 left-20 right-20 right-16s flex justify-between items-center"
          >
            {!isMobile && (
              <div className="">
                {
                  TextElement({
                    text: "CHOOSE YOUR PERSONALITY.",
                    fontName: "disketMono",
                    fontSize: isMobile ? 16 : 20,
                  }).REGULAR.BLACK
                }
              </div>
            )}

            {!isMobile && (
              <div className="variant-info">
                <Link
                  href={`/configure/${variants[selectedVariantState - 1].name}`}
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

      {/* Turntable */}
      <div
        style={{ cursor: "url('/images/icons/drag-arrow.svg'), auto" }}
        className={Style.turnTable}
        ref={rootRef}
      ></div>

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
            <Image
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
            style={{ paddingLeft: "7px", marginTop: "10px" }}
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
        <Link href={`/configure/${variants[selectedVariantState - 1].name}`}>
          <div
            id={DOMIDMAPPINGS.PROCEED_NEXT}
            onClick={() => {}}
            className="bg-black py-4 pl-10 pr-8 flex justify-between cursor-pointer fixed bottom-0 left-0 right-0"
          >
            {TextElement({ text: "PROCEED" }).MEDUIM.WHITE}
            <Image
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
