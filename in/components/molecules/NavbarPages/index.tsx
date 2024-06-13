"use client";

import Style from "./navbarpages.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { TextElement } from "../../atoms/Texts";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { useRouter } from "next/router";
import { MapCss } from "../../../utils/utils";
import { bookingFlowPages } from "../../../constants";
import { BookingFlow, ReferrerFlow } from "../../../utils/CookieManagement";
import { getUserMetaData, SetRefPage } from "../../../services/helper";
import Modal from "../Modal";
import { originURL } from "../../../services/constants";
// import { useSearchParams } from 'next/navigation'

export const NavbarPages = () => {
  const router = useRouter();

  // const searchParams = useSearchParams()
  // const country = searchParams.get('country')
  // console.log('Country:', country);

  const [navtitle, setNavtitle] = useState(4);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [seeMoreDisclaimer, setSeeMoreDisclaimer] = useState(false);

  // scroll up navbar
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = (event) => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsScrollingUp(false);
      } else if (currentScrollY > prevScrollY) {
        // Scroll Down
        setIsScrollingUp(false);
      } else if (currentScrollY < prevScrollY) {
        // Scroll Up
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  const {
    sidebarOpen,
    setSidebarOpen,
    userData,
    setUserData,
    flows,
    isMobile,
    showNavbar,
    reqCountry,
  } = useContext(NavbarContext);
  const overlay = useRef(null);

  const [currentHover, setCurrentHover] = useState(0);
  const onProfileCLick = () => {
    if (!userData?.email) {
      if (bookingFlowPages.includes(router.pathname)) {
        BookingFlow.setCookie("A");
      } else {
        ReferrerFlow.setCookie(router.asPath);
      }
      if (isMobile) setSidebarOpen((b) => !b);
      router.push(`/signin`);
    } else {
      if (bookingFlowPages.includes(router.pathname)) {
        flows.BookingFlowPostInternationalCheck();
      } else {
        if (isMobile) setSidebarOpen((b) => !b);
        router.push(`${originURL}/profile`);
      }
    }
  };

  const navItemsMobile = [
    {
      index: "01",
      title: "F77",
      href: `${originURL}/f77`,
      selected: "",
    },
    // {
    //   index: "02",
    //   title: "LIMITED",
    //   href: `${originURL}/limited`,
    //   selected: "limited",
    // },
    {
      index: "02",
      title: "SMART TECH",
      href: `${originURL}/smarttech`,
      selected: "smarttech",
    },
    // {
    //   index: "03",
    //   title: "F99",
    //   href: `${originURL}/f99`,
    //   selected: "f99",
    // },
    {
      index: "03",
      title: "UV RACING",
      href: `${originURL}/f99`,
      selected: "f99",
    },
    {
      index: "04",
      title: "SQUADRON",
      href: `${originURL}/squadron`,
      selected: "squadron",
    },
    {
      index: "05",
      title: "CONFIGURE",
      href: `${originURL}/configure`,
      selected: "configure",
    },
    {
      index: "06",
      title: "CAREERS",
      href: `${originURL}/careers`,
      selected: "careers",
    },
    {
      index: 6,
      title: userData?.email ? "PROFILE" : "SIGN IN",
      href: userData?.email ? `${originURL}/profile` : `${originURL}/signin`,
      selected: userData?.email ? "profile" : "signin",
      onClick: onProfileCLick,
    },
    {
      index: "07",
      title: "ABOUT",
      href: `${originURL}/about`,
      selected: "about",
    },
    {
      index: "08",
      title: "CONTACT",
      href: `${originURL}/contact`,
      selected: "contact",
    },
    {
      index: "09",
      title: "FAQ",
      href: `${originURL}/faq`,
      selected: "faq",
    },
    {
      index: "10",
      title: "PRESS",
      href: `${originURL}/press`,
      selected: "press",
    },
  ];

  const NavAllItems = [
    {
      index: 1,
      title: "F77",
      href: `${originURL}/f77`,
      selected: "f77",
    },
    // {
    //   index: 2,
    //   title: "Limited",
    //   href: `${originURL}/limited`,
    // },
    {
      index: 2,
      title: "SMART TECH",
      href: `${originURL}/smarttech`,
      selected: "smarttech",
    },
    // {
    //   index: 3,
    //   title: "F99",
    //   href: `${originURL}/f99`,
    // },
    {
      index: 3,
      title: "UV RACING",
      href: `${originURL}/f99`,
      selected: "f99",
    },
    {
      index: 4,
      title: "SQUADRON",
      href: `${originURL}/squadron`,
      selected: "squadron",
    },
    {
      index: 5,
      title: "CONFIGURE",
      href: `${originURL}/configure`,
      selected: "configure",
    },
    {
      index: 6,
      title: "CAREERS",
      href: `${originURL}/careers`,
      selected: "careers",
    },
    // {
    //   index: 6,
    //   title: userData?.email ? "Profile" : "Sign In",
    //   href: userData?.email ? `${originURL}/profile` : `${originURL}/signin`,
    //   onClick: onProfileCLick,
    // },
    // {
    //   index: 7,
    //   title: "About",
    //   href: `${originURL}/about`,
    // },
    // {
    //   index: 8,
    //   title: "Contact",
    //   href: `${originURL}/contact`,
    // },
    // {
    //   index: 9,
    //   title: "Faq",
    //   href: `${originURL}/faq`,
    // },
    // {
    //   index: 10,
    //   title: "Press",
    //   href: `${originURL}/press`,
    // },
  ];

  useEffect(() => {
    const userInfo = getUserMetaData();
    setUserData(userInfo);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("body-overflow-hidden");
    } else {
      document.body.classList.remove("body-overflow-hidden");
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("body-overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  function handleKeyDown(e) {
    if (e.key === "Escape" && sidebarOpen) {
      setSidebarOpen((b) => !b);
    }
  }

  const darkNavRoutes = [
    "/f77",
    "/smarttech",
    "/uvracing",
    // "/configure",

    // "/limited",
    // "/space-edition",
    "/f99",
    "/squadron",
    "/retail",
    // "/uv-bot",
    // "/squadron/leaderboard",
    // "/squadron/wallpaper",
    "/404",
  ];

  const hasFixedNav = ["uv-bot"].find((route) =>
    router.pathname.includes(route)
  );

  const theme = darkNavRoutes.find((route) => router.pathname.includes(route))
    ? "dark"
    : "light ";

  const shouldNavbarBeFixed = router.pathname.startsWith("/configure");

  const font_Size = isMobile ? 12 : 11;
  const marginTopClass = font_Size === 12 ? "-mt-1" : "";

  const testRideText =
    reqCountry === "IN" ? "BOOK TEST RIDE" : "REGISTER YOUR INTEREST";
  const testRideUrl =
    reqCountry === "IN" ? "testride" : "enquiry_international";

  return (
    <div
      className={`w-full  transition-all duration-5000 ease-in-out ${
        shouldNavbarBeFixed || isScrollingUp
          ? "fixed opacity-100 z-100 mb-0"
          : "opacity-100 z-100"
      }`}
    >
      {!showNavbar ? (
        <></>
      ) : (
        <>
          <div
            className={MapCss(
              Style,
              "root ",
              `${
                theme === "dark"
                  ? "bg-[#151618] "
                  : router.pathname.length === 1
                  ? "bg-[#151618]"
                  : "bg-[#FFFFFF] sm:bg-[#FFFFFF]  "
              } ${hasFixedNav ? "fixed" : ""}`
            )}
          >
            {theme === "dark" || router.pathname.length === 1 ? (
              <>
                {" "}
                <div className={Style.imageWrapper}>
                  <Image
                    className="cursor-pointer"
                    onClick={() => router.push(`${originURL}/`)}
                    src={"/images/icons/uv-white.svg"}
                    width={37}
                    height={32}
                    alt="Ultraviolette Automotive"
                  />
                </div>
                <div className={Style.logowrapper}>
                  <Image
                    onClick={() => router.push(`${originURL}/`)}
                    src={"/images/icons/uv-white.svg"}
                    width={32}
                    height={28}
                    alt="Ultraviolette Automotive"
                  />
                </div>{" "}
              </>
            ) : (
              <>
                <div className={Style.imageWrapper}>
                  <Image
                    className="cursor-pointer"
                    onClick={() => router.push(`${originURL}/`)}
                    src={
                      router.pathname === "/"
                        ? "/images/icons/uv-black.png"
                        : "/images/icons/uv-black.png"
                    }
                    width={37}
                    height={32}
                    alt="Ultraviolette Automotive"
                  />
                </div>
                <div className={Style.logowrapper}>
                  <Image
                    onClick={() => router.push(`${originURL}/`)}
                    src={
                      ["/", "/limited"].includes(router.pathname)
                        ? "/images/icons/uv-black.png"
                        : "/images/icons/uv-black.png"
                    }
                    width={32}
                    height={28}
                    alt="Ultraviolette Automotive"
                  />
                </div>
              </>
            )}
            <div className={Style.navItemsWrapper}>
              {!sidebarOpen &&
                navItemsMobile.splice(0, 6).map((eachItem, ind) => (
                  <Link
                    href={eachItem.href}
                    key={ind}
                    onClick={() => setNavtitle(ind)}
                  >
                    {theme === "dark" ? (
                      <div>
                        {router.pathname.split(`/`)[1] == eachItem.selected
                          ? TextElement({ text: eachItem.title, fontSize: 11 })
                              .BOLD.WHITE
                          : TextElement({ text: eachItem.title, fontSize: 11 })
                              .REGULAR.WHITE}
                      </div>
                    ) : router.pathname.length === 1 ? (
                      <div>
                        {router.pathname.split(`/`)[1] == eachItem.selected
                          ? TextElement({ text: eachItem.title, fontSize: 11 })
                              .BOLD.WHITE
                          : TextElement({ text: eachItem.title, fontSize: 11 })
                              .REGULAR.WHITE}
                      </div>
                    ) : (
                      <div>
                        {router.pathname.split(`/`)[1] == eachItem.selected
                          ? TextElement({ text: eachItem.title, fontSize: 11 })
                              .BOLD.BLACK
                          : TextElement({ text: eachItem.title, fontSize: 11 })
                              .REGULAR.BLACK}
                      </div>
                    )}
                  </Link>
                ))}
            </div>
            <div className="flex -mt-2 justify-center items-center ">
              {
                <div className=" mr-8 flex justify-center items-center">
                  <Link
                    href={`/${testRideUrl}`}
                    key={"testride"}
                    className={MapCss(Style, "testRide", "")}
                  >
                    {theme === "dark" || router.pathname.length === 1
                      ? router.pathname.split(`${originURL}/`)[1] == "testride"
                        ? TextElement({
                            text: testRideText,
                            fontSize: font_Size,
                            className: marginTopClass,
                          }).BOLD.WHITE
                        : TextElement({
                            text: testRideText,
                            fontSize: font_Size,
                            className: marginTopClass,
                          }).REGULAR.WHITE
                      : router.pathname.split(`${originURL}/`)[1] == "testride"
                      ? TextElement({
                          text: testRideText,
                          fontSize: font_Size,
                          className: marginTopClass,
                        }).BOLD.BLACK
                      : TextElement({
                          text: testRideText,
                          fontSize: font_Size,
                          className: marginTopClass,
                        }).REGULAR.BLACK}

                    <Image
                      alt="menu"
                      width={7}
                      height={7}
                      src={"/images/icons/red-arrow.svg"}
                      className="cursor-pointer -mt-4"
                    />
                  </Link>
                </div>
              }
              {isMobile ? (
                <div
                  className="text-white pr-5 mr-1 cursor-pointer w-[53px] flex justify-center "
                  onClick={() => setSidebarOpen((b) => !b)}
                >
                  {sidebarOpen ? (
                    <div className="mr-[-21px]">
                      <Image
                        src={`/images/icons/${
                          ["/configure"].includes(router?.pathname) ||
                          ["/configure/[variant]"].includes(router?.pathname)
                            ? "cross-black.svg"
                            : "cross.svg"
                        }`}
                        height={20}
                        width={20}
                        alt="menu"
                      />
                    </div>
                  ) : (
                    <Image
                      className="lg:-mr-2"
                      src={`/images/icons/${
                        darkNavRoutes.includes(router?.pathname) ||
                        ["/"].includes(router?.pathname)
                          ? // theme === "dark"
                            "menu-new.svg"
                          : "menu-blackk.svg"
                      }`}
                      height={40}
                      width={isMobile ? 26 : 40}
                      alt="menu"
                    />
                  )}
                </div>
              ) : (
                <div
                  onClick={onProfileCLick}
                  className=" text-white pr-5 mr-1 cursor-pointer w-[53px] xl:flex justify-center"
                >
                  {theme === "dark" || router.pathname.length === 1 ? (
                    <Image
                      width={100}
                      height={100}
                      alt="f77Mob"
                      src={"/images/home/newhome/signWhite.svg"}
                      className=""
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <Image
                      width={100}
                      height={100}
                      alt="f77Mob"
                      src={"/images/home/newhome/signBlack.svg"}
                      className=""
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* <div
            style={{
              display: isMobile ? "none" : "block",
              position: "relative",
            }}
          >
            <div
              className={MapCss(
                Style,
                `desktopBottom ${sidebarOpen ? "desktopBottom-open" : ""}`
              )}
            >
              {NavAllItems.slice(0, 4).map((each, i) => {
                return (
                  <div
                    onClick={() => {
                      setSidebarOpen(false);
                      each?.onClick && each?.onClick();
                    }}
                    key={i}
                    className={Style.openRow}
                    onMouseLeave={() => {
                      setCurrentHover(0);
                    }}
                    onMouseEnter={() => {
                      setCurrentHover(each.index);
                    }}
                  >
                    {!each.onClick ? (
                      <Link
                        href={each.href}
                        className={MapCss(
                          Style,
                          `eachTitle ${sidebarOpen && "eachTitleVisible"}`,
                          "transition-all duration-500 delay-150"
                        )}
                      >
                        <div className="text-xl">0{each.index}</div>
                        <div
                          className="text-[54px] flex"
                          style={{
                            color: i + 1 === currentHover ? "white" : "",
                          }}
                        >
                          <div>{each.title}</div>
                          {each.index === currentHover && (
                            <Image
                              alt="menu"
                              width={15}
                              height={15}
                              src={"/images/icons/red-arrow.svg"}
                              className="cursor-pointer -mt-4"
                            />
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div
                        className={MapCss(
                          Style,
                          `eachTitle ${sidebarOpen && "eachTitleVisible"}`,
                          "transition-all duration-500 delay-150"
                        )}
                      >
                        <div className="text-xl">0{each.index}</div>
                        <div
                          className="text-[54px] flex"
                          style={{
                            color: i + 1 === currentHover ? "white" : "",
                          }}
                        >
                          <div>{each.title}</div>
                          {each.index === currentHover && (
                            <Image
                              alt="menu"
                              width={15}
                              height={15}
                              src={"/images/icons/red-arrow.svg"}
                              className="cursor-pointer -mt-4"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className={Style.openRowBottom}>
                {NavAllItems.slice(4).map((each, i) => {
                  return (
                    <div
                      onClick={() => {
                        setSidebarOpen(false);
                      }}
                      key={i + 100}
                      className={""}
                      onMouseLeave={() => {
                        setCurrentHover(0);
                      }}
                      onMouseEnter={() => {
                        setCurrentHover(each.index);
                      }}
                    >
                      <Link href={each.href}>
                        <div className="text-xl">0{each.index}</div>
                        <div
                          style={{
                            color: each.index === currentHover ? "white" : "",
                          }}
                          className="text-[48px] flex"
                        >
                          <div>{each.title}</div>
                          <div className="w-5 mt-4">
                            {i + 5 === currentHover && (
                              <Image
                                alt="menu"
                                width={15}
                                height={15}
                                src={"/images/icons/red-arrow.svg"}
                                className="cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
          {sidebarOpen && (
            <div
              className={`${Style.overlay} overflow-y-auto ${
                theme === "dark" || router.pathname.length === 1
                  ? "bg-[#151515]"
                  : "bg-[#fff]"
              } `}
            >
              <div className="flex justify-between w-full  mt-3 mb-8 overflow-hidden">
                <div className="flex flex-col gap-1" onClick={onProfileCLick}>
                  {theme === "dark" || router.pathname.length === 1 ? (
                    <Image
                      width={40}
                      height={40}
                      alt="f77Mob"
                      src={"/images/home/newhome/signWhite.svg"}
                      className=""
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <Image
                      width={40}
                      height={40}
                      alt="f77Mob"
                      src={"/images/home/newhome/signBlack.svg"}
                      className=""
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  <p
                    className={`${Style.signIn} ${
                      theme === "dark" || router.pathname.length === 1
                        ? "text-[#FFF]"
                        : "text-[#000]"
                    }`}
                  >
                    {userData?.email ? "profile" : "sign in"}
                    {/* Sign In */}
                  </p>
                </div>
                <div
                  role="dialog"
                  aria-modal="true"
                  ref={overlay}
                  className="mr-8  flex justify-center items-center"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {theme === "dark" || router.pathname.length === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.7278 8.03262L0 14.7604L1.30482 16.0652L8.03262 9.33744L14.7604 16.0652L16.0652 14.7604L9.33744 8.03262L16.0652 1.30482L14.7604 0L8.03262 6.7278L1.30482 0L0 1.30482L6.7278 8.03262Z"
                        fill="#E1E1E1"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.7278 8.03262L0 14.7604L1.30482 16.0652L8.03262 9.33744L14.7604 16.0652L16.0652 14.7604L9.33744 8.03262L16.0652 1.30482L14.7604 0L8.03262 6.7278L1.30482 0L0 1.30482L6.7278 8.03262Z"
                        fill="#ACACAC"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {NavAllItems.map((eachItem, ind) => (
                <div key={ind + "-nav-mobile"}>
                  <Link
                    onClick={() => {
                      setSidebarOpen(!sidebarOpen);
                      // eachItem.onClick && eachItem.onClick();
                    }}
                    className="flex flex-col"
                    href={eachItem.href}
                  >
                    <div
                      className={`${Style.title}  ${
                        theme === "dark" || router.pathname.length === 1
                          ? "text-[#ffffff] "
                          : "text-[#393939]"
                      } ${
                        router.pathname.split(`/`)[1] == eachItem.selected
                          ? "font-normal "
                          : "font-light "
                      } }`}
                    >
                      {/* {
                        TextElement({
                          text: eachItem.title,
                          fontName: "brutal",
                          fontSize: 24,
                        }).REGULAR.OVERLAYHEADING
                      } */}
                      {eachItem.title}
                    </div>
                  </Link>
                  <div
                    className={`${Style.borderColor} ${
                      theme === "dark" || router.pathname.length === 1
                        ? "border-b-2 border-[#9F9F9F]"
                        : "border-b-2 border-[#CECECE]"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          )}
          {showDisclaimer && router.asPath === "/" && (
            <div
              style={{
                zIndex: 9,
              }}
              className="absolute -mt-1 w-full bg-[#212122] py-2 lg:py-2 pl-3 pr-2 lg:px-6 flex justify-between items-start lg:items-center"
            >
              <div className="  text-[#CFCFCF] text-[10px] w-[100%] sm:pr-10 lg:items-center flex  lg:flex-row">
                <span className="brutal font-medium text-[10px] inline-block">
                  Caution
                </span>
                <div className="ml-6 sm:ml-16 ">
                  <div>
                    <a
                      href={`${originURL}/`}
                      className="mt-[-1px] mr-[3px] font-bold inline brutal"
                    >
                      www.ultraviolette.com
                    </a>
                    <span className="inline brutal">
                      is the only official website of Ultraviolette Automotive.
                      Beware of deceptive, fraudulent websites.{" "}
                    </span>
                    <span
                      onClick={() => {
                        setSeeMoreDisclaimer(true);
                      }}
                      className="underline cursor-pointer lg:pl-1 brutal whitespace-nowrap"
                    >
                      See more
                    </span>
                  </div>
                </div>
              </div>
              <Image
                className="cursor-pointer mt-1.5 lg:mt-0"
                onClick={() => setShowDisclaimer(false)}
                src={"/images/icons/cross-grey.svg"}
                height={isMobile ? 12 : 12}
                width={isMobile ? 12 : 12}
                alt="close"
              />
            </div>
          )}
        </>
      )}

      {
        <Modal state={seeMoreDisclaimer} stateHandler={setSeeMoreDisclaimer}>
          <div className="bg-white px-9 pt-7 pb-8 lg:pb-10 h-[auto] w-[87%] lg:w-[70%] max-w-[1000px] relative rounded">
            <div className="flex justify-between items-center mb-4 lg:mb-7">
              <div className="font-medium text-2xl sm:text-3xl brutal">
                Caution
              </div>
              <Image
                src={"/images/icons/cross-black.svg"}
                onClick={() => {
                  console.log("setSeeMoreDisclaimer");

                  setSeeMoreDisclaimer(false);
                }}
                width={14}
                height={14}
                className="cursor-pointer"
                alt=""
              />
            </div>

            <p className="brutal text-[#202020] text-sm sm:text-base">
              Beware, we have recently encountered a few fraudulent websites
              impersonating Ultraviolette that offer fake bookings and
              dealership opportunities. Ultraviolette shall not be liable in any
              manner for such claim or loss suffered dealing with such
              fraudsters.
              <br /> <br />{" "}
              <a
                href={`${originURL}/`}
                className="mt-[-1px] mr-[3px] brutal font-bold"
              >
                www.ultraviolette.com
              </a>{" "}
              is the only official website of Ultraviolette Automotive.
            </p>
          </div>
        </Modal>
      }
    </div>
  );
};
