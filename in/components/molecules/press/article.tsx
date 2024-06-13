/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import Button from "../../atoms/Button";
import CommonDivider from "../commondivider";

interface ArticleProps {
  id: number;
  imageLink: string;
  date: string;
  title: string;
  link: string;
  shortDescription: string;
  isMobile: boolean;
}

const px = "px-[4px] sm:px-[91px]";

const NewsArticle = ({
  id,
  imageLink,
  date,
  title,
  link,
  shortDescription,
  isMobile,
}: ArticleProps) => {
  return (
    <>
      <div className="flex flex-row max-h-[220px] sm:max-h-[312px] items-start bg-grey5 sm:h-auto sm:min-w-[48%]">
        <div className="w-[40%] sm:w-auto max-h-[312px] bg-slate-500">
          <img
            src={imageLink}
            alt="news Article"
            className="sm:h-[312px] h-[220px] rounded-md  w-[250px] sm:w-[197px] object-cover "
          />
        </div>
        <div className="flex flex-col sm:h-auto w-[60%] sm:w-[48%] h-[220px] ml-[10px] sm:ml-5 mr-6 ">
          <div className="brutal text-[8px] sm:text-[10px] uppercase">
            {date}
          </div>
          <div
            className="sm:h-[110px] pt-[11.8px] sm:pt-[22px] brutal text-[14px] sm:text-[28px] font-normal capitalize overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </div>
          <div className="pt-2 sm:pt-6 ml-0">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              hrefLang="en-in"
            >
              <Button
                fontSize={isMobile ? 5.16 : 10}
                onClick={() => {}}
                text={"VIEW ARTICLE"}
                bg={"black"}
                color="white"
                disable={false}
                height={isMobile ? "5px" : "10px"}
                trailingIcon={false}
                allowHover
                isDark
                className="pt-2 pb-[7px] pl-8 pr-8"
              />
            </a>
          </div>
          <div className="brutal capitalize pt-1 sm:pt-6 w-full text-[10px] sm:text-[12px] text-[#555555] overflow-hidden">
            <div
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 7,
                WebkitBoxOrient: "vertical",
              }}
            >
              {shortDescription}
            </div>
          </div>
        </div>
      </div>
      <CommonDivider className={`pr-6 sm:pr-0`} borderColor="#9E9E9E" />
    </>
  );
};

export default NewsArticle;
