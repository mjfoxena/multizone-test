import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import style from "../../../pages/configure/map.module.scss";
import { NewConfigImages } from '../../../queries/config';

const BasicImages = ({ images, className, altText, isCarousel, setRenderSection, isControlsVisible, setControlsVisible, isVideo, selectedModel }) => {
    const [selectedItem, setSelectedItem] = useState(0);

    const [baseURL, setBaseURL] = useState<string>("");
    const [imagescollection, setImagescollection] = useState<any>({});
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const images = await NewConfigImages();
                setImagescollection(images);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, []);
    useEffect(() => {
        if (imagescollection && imagescollection.data) {
            const { base_url, image_config } = imagescollection.data;
            setBaseURL(base_url);
        }
    }, [imagescollection]);

    // removing urls ending with "/"
    const ftrImages = images?.filter(image => !image.endsWith("/"))

    const formattedImages = ftrImages?.map((imageUrl, index) => ({
        id: index,
        image_name: typeof imageUrl === 'string' ? baseURL + imageUrl : ''
    }));


    // console.log("===>>> ", formattedImages);

    return (
        <div className={`relative`}
            onMouseEnter={() => {
                setControlsVisible(true);
            }}
            onMouseLeave={() => {
                setControlsVisible(false);
            }}
        >

            {isCarousel && selectedItem < (formattedImages?.length - 1) && (
                <div
                    className={`absolute right-4 z-50 cursor-pointer `}
                    style={{ top: "48%", transition: "opacity 0.5s" }}
                    onClick={() =>
                        selectedItem < images.length - 1 &&
                        setSelectedItem((e) => e + 1)
                    }
                >
                    <Image
                        alt="carousel-control"
                        src={"/images/icons/carousel-arrow.svg"}
                        height={40}
                        width={40}
                    />
                </div>
            )}
            {isCarousel && selectedItem > 0 && (
                <div
                    className={`absolute left-4 z-50 cursor-pointer rotate-180 `}
                    style={{ top: "48%", transition: "opacity 0.5s" }}
                    onClick={() => selectedItem > 0 && setSelectedItem((e) => e - 1)}
                >
                    <Image
                        alt="carousel-control"
                        src={"/images/icons/carousel-arrow.svg"}
                        height={40}
                        width={40}
                    />
                </div>
            )}


            {isVideo ? (
                // for Videso
                <Carousel
                    selectedItem={selectedItem}
                    onChange={(e) => {
                        setSelectedItem(e);
                    }}
                    showStatus={false}
                    showThumbs={false}
                    showArrows={false}
                    swipeable
                    axis="horizontal"
                    infiniteLoop={true}
                >

                    {images?.length === 1 ? (
                        <div className={`${style.carouselVideo}`}>
                            <div
                                style={{ height: "calc(100vh - 64px)", width: "100%" }}
                            >
                                <video
                                    id="configVideos"
                                    autoPlay={true}
                                    loop
                                    playsInline
                                    muted
                                    controls={false}
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <source src={images[0]} />
                                </video>
                            </div>
                        </div>
                    ) : (
                        formattedImages?.map((video, i) => (
                            <div className={`${style.carouselVideo}`} key={i}>
                                <div
                                    style={{ height: "calc(100vh - 300px)", width: "100%" }}
                                >
                                    <video
                                        id="configVideos"
                                        autoPlay={true}
                                        loop
                                        playsInline
                                        muted
                                        controls={false}
                                        style={{ width: "73%", height: "100vh" }}
                                    >
                                        <source src={`${video.image_name}`} />
                                    </video>
                                </div>
                            </div>
                        ))
                    )}
                </Carousel>
            ) : (
                // for Imgaes
                <Carousel
                    selectedItem={selectedItem}
                    onChange={(e) => {
                        setSelectedItem(e);
                    }}
                    showStatus={false}
                    showThumbs={false}
                    showArrows={false}
                    swipeable
                    axis="horizontal"
                    infiniteLoop={false}
                >
                    {formattedImages?.length === 1 && formattedImages ? (
                        <div className={`${style.carouselWrapper}`}>
                            <div
                                style={{ height: "calc(100vh - 64px)", width: "100%" }}
                            >
                                <Image
                                    style={{ objectFit: "cover" }}
                                    src={`${formattedImages[0].image_name}`}
                                    alt={altText || "carousel"}
                                    layout="fill"
                                    loading="eager"
                                    className={className}
                                />
                            </div>
                        </div>
                    ) : (
                        formattedImages?.map((image, i) => (
                            <div className={`${style.carouselWrapper}`} key={i}>
                                <div
                                    style={{ height: "calc(100vh - 64px)", width: "100%" }}
                                >
                                    {image.image_name && (
                                    <Image
                                        style={{ objectFit: "cover" }}
                                        // src={`${image.image_name}`}
                                        src={image.image_name.startsWith("http") ? image.image_name : `/${image.image_name}`}
                                        alt={altText || "carousel"}
                                        layout="fill"
                                        loading="eager"
                                        className={className}
                                    />
                                )}
                                </div>
                            </div>
                        ))
                    )}
                </Carousel>
            )}

        </div>
    );
}

export default BasicImages;
