import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ConfiguratorConstants } from "../../../../services/constants";
import { getStartingPrice } from "../../../../services/public_service";
import { formatPrice } from "../../../../utils/utils";
import VideoPlayer from "../video/video";
import Style from "./landing.module.scss";
import { API_CONSTANTS } from "../../../../services/constants";
const imageUrl = `${API_CONSTANTS.HOMEPAGE_BASE_URL}/banner`;

interface ILanding {
  disclaimer: string;
  header: string;
  price: number;
}

const Landing = () => {
  const router = useRouter();

  const [product, setProduct] = useState<ILanding>({
    disclaimer: "",
    header: "",
    price: 0,
  });

  const modeRef = useRef(null);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (modeRef.current) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [play, setPlay]);

  const fetchPriceData = async () => {
    try {
      const priceResponse = await getStartingPrice();
      if (priceResponse.error || !priceResponse.payload) {
        setProduct({
          ...product,
          price: ConfiguratorConstants.mach2DefaultPrice,
        });
      } else {
        setProduct(priceResponse.payload);
      }
    } catch (error) {
      setProduct({
        ...product,
        price: ConfiguratorConstants.mach2DefaultPrice,
      });
    }
  };

  useEffect(() => {
    fetchPriceData();
  }, []);

  const getPrice = () =>
    formatPrice({
      price: product.price,
      defaultPrice: ConfiguratorConstants.mach2DefaultPrice,
    });

  return (
    <>
      <div className={Style.landing} ref={modeRef}>
        <div className="hidden xl:block h-full ">
          <VideoPlayer
            play={play}
            loop={true}
            poster={`${imageUrl}/f77-mach-2-recon-ds.png`}
            src={
              "https://player.vimeo.com/external/941528132.m3u8?s=4f0fe3d7db8533b28867d1b2c40d6b846433cae2&logging=false"
            }
          />
        </div>

        {/* for mobile */}
        <div className="block xl:hidden w-full h-full">
          <VideoPlayer
            play={play}
            loop={true}
            poster={`${imageUrl}/f77-mach-2-recon-mob.png`}
            src={
              "https://player.vimeo.com/external/941528155.m3u8?s=c9680db6af3e16ffce4ba6b7e5deb9c39ed5ebe2&logging=false"
            }
          />
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.25 }}
          className={Style.headWrapper}
        >
          {/* for desk top.. */}
          <div className="w-1/2 xl:w-1/2 md:w-[75%] sm:flex flex-col gap-4 hidden">
            <Image
              width={2000}
              height={2000}
              alt={"AutoCar UV"}
              src={`/images/home/newhome/mach2logo.svg`}
              style={{
                objectFit: "cover",
              }}
            />
            <p className={`${Style.activateF} text-left`}>
              ACTIVATE FLIGHT MODE
            </p>
          </div>
          {/* for mobile */}
          <div className="flex flex-col gap-4 sm:hidden w-fit  mr-6 mt-0">
            <Image
              width={2000}
              height={2000}
              alt={"AutoCar UV"}
              src={`/images/home/newhome/mach2logomob.svg`}
              style={{
                objectFit: "cover",
              }}
            />
            <p className={`${Style.activateF} text-center`}>
              ACTIVATE FLIGHT MODE
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25 }}
          className={Style.startingPrice}
        >
          <p className={Style.starting}>{product.header} </p>
          <p className={Style.rate}>
            <span>&#x20b9;</span> {getPrice()}*
          </p>
          <p className="text-xs sm:text-xs text-gray-400 disketMono uppercase ml-2 sm:ml-0 sm:leading-8">
            {product.disclaimer}
          </p>
        </motion.div>

        <div className={Style.startingPriceMob}>
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <p className={Style.starting}>{product.header} </p>
            <p className={Style.rate}>
              <span>&#x20b9;</span> {getPrice()}*
            </p>
            <p className="text-xs sm:text-xs text-gray-400 disketMono uppercase ml-2 sm:ml-0 sm:leading-8">
              {product.disclaimer}
            </p>
          </div>
          <div className="flex xl:hidden w-full justify-center items-center md:w-[300.891px] md:h-[60px] max-sm:w-[266.891px] max-sm:h-[51px] cursor-pointer">
            <Image
              width={200}
              height={200}
              className="w-full h-full object-cover"
              onClick={() => router.push("/configure")}
              loading="eager"
              alt={"fzzButton"}
              src={`/images/home/newhome/landing/mobilefzzButton.png`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
