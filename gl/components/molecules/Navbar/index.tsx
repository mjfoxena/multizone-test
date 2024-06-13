"use client";

import Style from "./navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { TextElement } from "../../atoms/Texts";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { originURL } from "../../../services/constants";

const navItems = [
  {
    index: "01",
    title: "CONFIGURE",
    href: `${originURL}/configure`,
  },
  {
    index: "02",
    title: "F77",
    href: `${originURL}/f77`,
  },
  {
    index: "03",
    title: "CONNECTED",
    href: `${originURL}/connected`,
  },
  {
    index: "04",
    title: "LIMITED",
    href: `${originURL}/limited`,
  },
];

export const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(NavbarContext);

  return (
    <div className={Style.root}>
      <div className={Style.imageWrapper}>
        <Image
          src={"/images/icons/uv-logo.png"}
          width={34}
          height={40}
          alt="uv-logo"
        />
      </div>
      <div className={Style.navItemsWrapper}>
        {navItems.map((eachItem, ind) => (
          <Link href={eachItem.href} key={ind}>
            <div>{TextElement({ text: eachItem.title }).REGULAR.BLACK}</div>
          </Link>
        ))}
      </div>

      {/* {} */}
      <div
        className={Style.menuWrapper}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Image
          alt="menu"
          width={50}
          height={30}
          src={"/images/icons/menu.svg"}
        />
      </div>
    </div>
  );
};
