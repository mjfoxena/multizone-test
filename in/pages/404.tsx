/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Image from 'next/image';
import { API_CONSTANTS } from "../services/constants";

const imageUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/not_found/`;

const Custom404 = () => {
    return (
        <div>
            <div className='h-[100vh]'>
                <div id="configId">
                    <Image
                        width={4000}
                        height={4000}
                        alt={"topGear"}
                        src={`${imageUrl}404_page_not_found.jpg`}
                        style={{ objectFit: "cover", width: "100%", height: "100vh" }}
                    />
                </div>
                <div className='-mt-[300px] sm:px-16 px-4 text-[#FFF] flex justify-end sm:mr-20'>
                    <div className="text-left">
                        <h1 className='text-bold text-[30px] sm:text-[40px] eurostile font-bold'>ERROR 404</h1>
                        <div className='brutal'>
                            <p>Oops! It seems you've taken a wrong turn. <br /> We couldn't find the road you were looking for.</p>
                        </div>
                        <div className='eurostile text-[16px] sm:text-[20px] mt-8 sm:flex sm:items-center sm:text-left'>
                            <Link href="/">
                                <div className="flex items-center">
                                    <p>GO BACK TO HOMEPAGE</p>
                                    <Image
                                        width={30}
                                        height={30}
                                        alt={"topGear"}
                                        src="/images/home/whiteRoundedArrow.svg"
                                        style={{ objectFit: "cover" }}
                                        className='sm:ml-4 ml-3'
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Custom404;