import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import { API_CONSTANTS } from "../../services/constants";
import Style from "./f99.module.scss";

export const F99 = () => {
  const { isMobile } = useContext(NavbarContext);
  return (
    <div className={`${Style["f99-overlay"]}`}>
      <div className={`${Style["f99-image-overlay"]}`}>
        <Image
          className={`${Style["f99-image"]}`}
          width={5760}
          height={3048}
          src={
            isMobile
              ? `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/f99/f99_mob.jpg`
              : `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/f99/f99.jpg`
          }
          alt="Ultraviolette F99 Electric Bike"
        />
        <Image
          className={`${Style["f99-logo"]}`}
          width={588}
          height={103}
          src="/images/icons/f99-logo.svg"
          alt="Ultraviolette Automotive"
        />
      </div>
      <div className={`${Style["f99-text-overlay"]}`}>
        <div className={`${Style["f99-about-title"]}`}>
          ADVANCED PERFORMANCE PLATFORM
        </div>
        <div className={`${Style["f99-about-text"]}`}>
          The F99 Factory Racing Platform brings together inspirations from both
          the worlds - Aviation and Racing, to build technologies and
          capabilities for electric motorcycles that push the boundaries of
          imagination. The F99 Platform has been engineered to output maximum
          power from the powertrain while ensuring all necessary safety checks,
          resulting in a Peak Power output of <b>65 BHP</b> and a Top Speed of
          over <b>200km/h</b>
        </div>
        <Image
          alt="vector-image"
          width={isMobile ? 150 : 450}
          className={`${Style["f99-wheel-loading-1"]}`}
          height={30}
          src={"/images/limited/vectorImage.svg"}
        />
        <div className={`${Style["f99-specs-title"]}`}>TECH SPECS</div>
        <div className={`${Style["f99-specs"]}`}>
          <div className={`${Style["f99-specs-row"]}`}>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>50 KW (65 HP)</div>
              <div className={`${Style["f99-spec-name"]}`}>peak power</div>
            </div>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>200 KM/H +</div>
              <div className={`${Style["f99-spec-name"]}`}>top speed</div>
            </div>
          </div>
          <div className={`${Style["f99-specs-row"]}`}>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                FACE-PLATE,
                <br /> WINGLETS, AERODISK
              </div>
              <div className={`${Style["f99-spec-name"]}`}>
                aerodynamic optimisation
              </div>
            </div>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                COMMITTED- 
                <br />
                TRACK ORIENTED
              </div>
              <div className={`${Style["f99-spec-name"]}`}>rider triangle</div>
            </div>
          </div>
          <div className={`${Style["f99-specs-row"]}`}>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                HYDRAULIC <br /> DISK BRAKES <br />
                WITH DUAL <br />
                CHANNEL <br /> BOSCH ABS
              </div>
              <div className={`${Style["f99-spec-name"]}`}>brake system</div>
            </div>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                FRONT: FIXED <br />
                4-RADIAL PISTON TYPE <br /> REAR: SINGLE PISTON <br /> FLOATING
                CALIPER <br /> TYPE
              </div>
              <div className={`${Style["f99-spec-name"]}`}>brake calipers</div>
            </div>
          </div>
          <div className={`${Style["f99-specs-row"]}`}>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                ADJUSTABLE
                <br /> REAR SETS
              </div>
              <div className={`${Style["f99-spec-name"]}`}>custom ergo</div>
            </div>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                SOFT <br />
                COMPOUND
              </div>
              <div className={`${Style["f99-spec-name"]}`}>tyre</div>
            </div>
          </div>
          <div className={`${Style["f99-specs-row"]}`}>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                METEOR GREY
                <br /> PLASMA RED
              </div>
              <div className={`${Style["f99-spec-name"]}`}>aero surface</div>
            </div>
            <div className={`${Style["f99-specs-el"]}`}>
              <div className={`${Style["f99-spec-val"]}`}>
                STIFFER
                <br /> SLIMMER
              </div>
              <div className={`${Style["f99-spec-name"]}`}>seat foam</div>
            </div>
          </div>
        </div>
        <Image
          alt="vector-image"
          width={isMobile ? 350 : 450}
          className={`${Style["f99-wheel-loading-2"]}`}
          height={30}
          src={"/images/limited/vectorImage.svg"}
        />
      </div>
    </div>
  );
};
