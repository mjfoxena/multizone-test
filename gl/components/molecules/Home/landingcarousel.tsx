'use client';

import Image from 'next/image'
import React from 'react'
import "react-slideshow-image/dist/styles.css"
import { Fade, Zoom, Slide } from 'react-slideshow-image'
import styled from 'styled-components';
import { API_CONSTANTS, originURL } from "../../../services/constants";

const imageUrl = `${API_CONSTANTS.BASE_URL_S3}/homepage/images/`;
const videoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/videos/`;

const Icon = styled.div`
  .img, svg {
    height: 12px !important;
    width: 12px !important;
  }
`;

const Landingcarousel = () => {

    const image1 = `${imageUrl}landing-page-image.png`
    const image2 = `${imageUrl}SUPERNOVA_desktop.png`

    return (
        <div>
            {/* desktop landing image */}
            <div id="configId" className="hidden sm:block slide-container">
                {/* <Icon> */}
                    <Fade>
                        <div>
                            <Image
                                width={3000}
                                height={3000}
                                alt={"AutoCar UV"}
                                src={`${imageUrl}landing-page-image.png`}
                                style={{
                                    objectFit: "cover", width: "100%", height: "100%"
                                }}
                            />
                        </div>
                        <div>
                            <Image
                                width={3000}
                                height={3000}
                                alt={"AutoCar UV"}
                                src={`${imageUrl}SUPERNOVA_desktop.png`}
                                style={{
                                    objectFit: "cover", width: "100%", height: "100%"
                                }}
                            />
                        </div>
                    </Fade>
                {/* </Icon> */}
            </div>


            {/* <div id="configId" className="hidden sm:block">
                <Image
                    width={2000}
                    height={2000}
                    alt={"AutoCar UV"}
                    src={`${imageUrl}landing-page-image.png`}
                    style={{
                        objectFit: "cover", width: "100%", height: "100%"
                    }}
                />
            </div> */}



            {/* mobile landing image */}
            <div id="configId" className="sm:hidden block">
                <Fade>
                    <div>
                        <Image
                            width={3000}
                            height={3000}
                            alt={"AutoCar UV"}
                            src={`${imageUrl}mobile/landing-page-image-m.png`}
                            style={{ objectFit: "cover", width: "100%" }}
                        />
                    </div>
                    <div>
                        <Image
                            width={3000}
                            height={3000}
                            alt={"AutoCar UV"}
                            src={`${imageUrl}mobile/SUPERNOVA_mobile.png`}
                            style={{ objectFit: "cover", width: "100%" }}
                        />
                    </div>
                </Fade>
            </div>

            {/* <div id="configId" className="sm:hidden block">
                <Image
                    width={3000}
                    height={3000}
                    alt={"AutoCar UV"}
                    src={`${imageUrl}mobile/landing-page-image-m.png`}
                    style={{ objectFit: "cover", width: "100%" }}
                />
            </div> */}

        </div >
    )
}

export default Landingcarousel