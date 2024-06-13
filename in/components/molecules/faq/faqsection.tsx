import Image from "next/image";
import { useEffect, useState } from "react";
import { FAQWithQsAns, IFAQ } from "../../../utils/interface/faq";
import { GetFaqQsAndAns } from "../../../services/config";
import { faqs } from "./const";
import parse from "html-react-parser";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { formatDescription } from "../../../utils/utils";

interface IFaqSectionProps {
  faq: IFAQ[];
}

function FaqSection({ faq }: IFaqSectionProps) {
  const [qsAndAns, setQsAndAns] = useState<FAQWithQsAns | null>(null);
  const [isLoading1, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>(faq[0].head);
  const [subCategory, setSubCategory] = useState(faq[0].subHead[0].miniHead);

  // Define the type for the response of GetFaqQsAndAns function...
  type GetFaqQsAndAnsResponse = FAQWithQsAns[];

  const onPageLoaded = async () => {
    try {
      const fetchedFAQQstionAndAnswer: GetFaqQsAndAnsResponse =
        await GetFaqQsAndAns({
          cat: category,
          subCat: subCategory,
        });

      // Assuming the response is an array and you want to set the first item
      if (fetchedFAQQstionAndAnswer.length > 0) {
        setQsAndAns(fetchedFAQQstionAndAnswer[0]);
      } else {
        setQsAndAns(null);
      }
      setIsLoading(false);
      console.log(
        "fetchedFAQQstionAndAnswer response",
        fetchedFAQQstionAndAnswer
      );
    } catch (error) {
      console.log("faq error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onPageLoaded();
  }, [category, subCategory]);

  const defaultTabId = faq && faq.length > 0 ? faq[0]?.id : -1;
  const defaultSubHeadId =
    faq && faq.length > 0 && faq[0]?.subHead.length > 0
      ? faq[0]?.subHead[0]?.id
      : -1;
  const defaultQuestionIndex =
    qsAndAns &&
    qsAndAns.subHead.length > 0 &&
    qsAndAns.subHead[0].qsAndDes?.length > 0 &&
    qsAndAns.subHead[0].qsAndDes.length > 0
      ? 0
      : -1;

  const [selectedTab, setSelectedTab] = useState<number>(Number(defaultTabId));
  const [selectedSubHead, setSelectedSubHead] = useState<number>(
    Number(defaultSubHeadId)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(
    Number(defaultSubHeadId)
  );
  const [activeQuestion, setActiveQuestion] = useState<number | null>(
    defaultQuestionIndex
  );
  const [dynamicValue, setDynamicValue] = useState(0);

  const toggleAccordion = (subHeadId: number) => {
    setActiveAccordion((prev) => (prev === subHeadId ? null : subHeadId));
  };

  const toggleQuestion = (questionIndex: number) => {
    setActiveQuestion((prev) =>
      prev === questionIndex ? null : questionIndex
    );
  };

  useEffect(() => {
    const currentTab = faq.find((tab) => Number(tab.id) === selectedTab);
    if (currentTab) {
      const subHeadCount = currentTab.subHead.length;
      if (subHeadCount === 1) {
        const firstSubHead = currentTab.subHead[0];
        setActiveAccordion(Number(firstSubHead?.id) || null);
      } else {
        setActiveAccordion(null);
      }
      setActiveQuestion(null);
    }
  }, [faq, selectedTab]);

  const handleTabClick = (
    tabId: number,

    selectedMiniHead: string
  ) => {
    setSubCategory(selectedMiniHead);
    setSelectedTab(tabId);
    setDynamicValue(0);
    const selectedTab = faq.find((tab) => Number(tab.id) === tabId);
    setSelectedSubHead(Number(selectedTab?.subHead[0]?.id ?? -1));
  };

  const handleSubHeadClick = (subHeadId: number) => {
    console.log("subHeadId", subHeadId);
    const currentTab = faq.find((tab) => Number(tab.id) === selectedTab);

    // Assuming subHeadId represents the position index in your subHead array
    const subHeadIndex = currentTab?.subHead.findIndex(
      (subTab) => Number(subTab.id) === subHeadId
    );
    const selectedSubHeadIndex = currentTab?.subHead.findIndex(
      (subTab) => Number(subTab.id) === selectedSubHead
    );

    if (
      subHeadIndex !== -1 &&
      selectedSubHeadIndex !== -1 &&
      subHeadIndex != null &&
      selectedSubHeadIndex != null
    ) {
      const difference = subHeadIndex - selectedSubHeadIndex;

      // Set dynamic value based on the difference
      const newDynamicValue = dynamicValue + difference * 58;

      // Update state
      setDynamicValue(newDynamicValue);
      setSelectedSubHead(subHeadId);
    }
  };

  const renderWithoutSearch = () => {
    const currentTab = faq.find((tab) => Number(tab.id) === selectedTab);
    const currentSubHead = currentTab?.subHead.find(
      (sub) => Number(sub.id) === selectedSubHead
    );
    const listLength = currentTab?.subHead.length || 0;
    const containerHeight = listLength * 58;

    return (
      <div className="w-full max-w-[87%] flex justify-end items-start">
        {/* sub head list */}
        <div className="w-[25%] h-full max-sm:hidden relative">
          <div
            className="absolute left-0 top-0 w-[4px] bg-[#D9D9D9]"
            style={{ height: `${containerHeight}px` }}
          />
          <div
            className={`absolute h-[58px] w-[4px] flex transition-transform duration-300 ${"bg-[#ED1C24]"} `}
            style={{ transform: `translateY(${dynamicValue}px)` }}
          />
          <div className="flex flex-col">
            {currentTab?.subHead.map((subTab) => (
              <div key={subTab.id} className="flex justify-start items-center">
                <div className="flex flex-col justify-start">
                  <h3
                    onClick={() => {
                      setSubCategory(subTab.miniHead);
                      handleSubHeadClick(Number(subTab.id));
                    }}
                    className={`text-[18px] pl-[2rem] my-[1rem] brutal cursor-pointer uppercase select-none ${
                      selectedSubHead === Number(subTab.id)
                        ? "text-[#ED1C24] font-medium"
                        : "text-[#6D6D6D] font-normal"
                    }`}
                  >
                    {subTab.miniHead}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* faq */}

        <div className="w-[75%] h-full max-sm:w-full">
          {qsAndAns?.subHead.map((subHeadItem) => (
            <div key={subHeadItem.id}>
              {/* Render questions and answers for this subcategory */}
              {subHeadItem.qsAndDes.map((qa, index) => (
                <div key={qa.qs} className="">
                  {/* This is for desktop */}
                  <div className="flex gap-[1.875rem] max-sm:hidden">
                    <div className="w-1 h-[52px] flex-shrink-0 bg-[#D9D9D9]" />
                    <div className="flex flex-col justify-start items-start">
                      <h1 className="text-black text-lg brutal font-medium leading-[26px] tracking-[0.04px] max-w-[100%]">
                        {qa.qs}
                      </h1>
                      <p className="mt-[0.625rem] text-[#000] text-base brutal font-normal leading-[20px] tracking-[0.028px] max-w-[100%]">
                        {" "}
                        {parse(formatDescription(qa.description))}
                      </p>
                    </div>
                  </div>
                  {index < subHeadItem.qsAndDes.length - 1 ? (
                    <hr className="h-0.5 ml-[1.875rem] flex-shrink-0 border-t border-[#C9C9C9] mt-[3.125rem] mb-[3.125rem] max-sm:hidden" />
                  ) : (
                    <div className="mt-[3.125rem] mb-[3.125rem] max-sm:hidden" />
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* this for mobile */}
          <div className="md:hidden w-full">
            {currentTab?.subHead.map((subTab) => (
              <div key={subTab.id}>
                <div>
                  <div
                    className="flex   justify-between items-center cursor-pointer py-2 "
                    onClick={() => {
                      setSubCategory(subTab.miniHead);
                      toggleAccordion(Number(subTab.id));
                    }}
                  >
                    <h3
                      className={`text-[16px] text-[#000] font-medium uppercase `}
                    >
                      {subTab.miniHead}
                    </h3>
                    <div>
                      <Image
                        src={
                          activeAccordion === Number(subTab.id)
                            ? "/images/faq/icons/upArrow.svg"
                            : "/images/faq/icons/downArow.svg"
                        }
                        alt={
                          activeAccordion === Number(subTab.id)
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        width={20}
                        height={20}
                        className="cursor-pointer w-[15px] h-[15.737px]"
                      />
                    </div>
                  </div>
                  {activeAccordion === Number(subTab.id) ? (
                    <div />
                  ) : (
                    <hr className="h-0.5 flex-shrink-0 border-t border-[#C9C9C9] mt-[1.125rem] mb-[1.500rem]" />
                  )}
                </div>

                {activeAccordion === Number(subTab.id) && (
                  <div className="mt-[3.125rem]">
                    {qsAndAns?.subHead.map((subTab) => (
                      <div key={subTab.id}>
                        {activeAccordion === Number(subTab.id) && (
                          <div className="mt-[3.125rem]">
                            {subTab.qsAndDes.map((qa, qaIndex) => (
                              <div key={qa.qs}>
                                <div
                                  className="flex justify-between items-start py-2 cursor-pointer"
                                  onClick={() => {
                                    setSubCategory(subTab.miniHead);
                                    toggleQuestion(qaIndex);
                                  }}
                                >
                                  <div className="flex gap-[0.625rem] max-w-[90%]">
                                    <div className="w-1 h-[40px] flex-shrink-0 bg-[#D9D9D9]" />
                                    <h4 className="text-black text-[14.5px] brutal font-medium">
                                      {qa.qs}
                                    </h4>
                                  </div>
                                  <div>
                                    <Image
                                      src={
                                        activeQuestion === qaIndex
                                          ? "/images/faq/icons/plus.svg"
                                          : "/images/faq/icons/plus.svg"
                                      }
                                      alt={
                                        activeQuestion === qaIndex
                                          ? "chevron-up"
                                          : "chevron-down"
                                      }
                                      width={20}
                                      height={20}
                                      className="cursor-pointerw-[15px] h-[15.737px]"
                                    />
                                  </div>
                                </div>
                                {activeQuestion === qaIndex && (
                                  <p
                                    className={`text-[#000] ml-[0.925rem] text-[14px] brutal font-normal leading-[20px] tracking-[0.028px]`}
                                  >
                                    {parse(formatDescription(qa.description))}
                                  </p>
                                )}
                                {qaIndex !== subTab.qsAndDes.length - 1 && (
                                  <hr className="h-0.5 ml-[0.875rem] flex-shrink-0 border-t border-[#C9C9C9] mt-[2.188rem] mb-[2.500rem]" />
                                )}
                                {qaIndex === subTab.qsAndDes.length - 1 && (
                                  <div className=" mb-[2.500rem]" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Function to handle key press events...
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     event.target.blur();
  //   }
  // };

  // const clearSearch = () => {
  //   setSearchQuery("");
  // };

  // // useEffect(() => {
  // //   faqs
  // //     .map((faq) => ({
  // //       ...faq,
  // //       subHead: faq.subHead.filter(
  // //         (sub) =>
  // //           sub.miniHead
  // //             .toLowerCase()
  // //             .includes(searchQuery.trim().toLowerCase()) ||
  // //           sub.qsAndDes.some(
  // //             (qa) =>
  // //               qa.qs
  // //                 .toLowerCase()
  // //                 .includes(searchQuery.trim().toLowerCase()) ||
  // //               qa.description
  // //                 .toLowerCase()
  // //                 .includes(searchQuery.trim().toLowerCase())
  // //           )
  // //       ),
  // //     }))
  // //     .filter((faq) => faq.subHead.length > 0);
  // // }, [searchQuery, faqs]);

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const renderWithSearch = () => {
  //   const filteredFaqs = faqs
  //     .map((faq) => ({
  //       ...faq,
  //       subHead: faq.subHead.filter((sub) =>
  //         sub.qsAndDes.some(
  //           (qa) =>
  //             qa.qs.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //             qa.description.toLowerCase().includes(searchQuery.toLowerCase())
  //         )
  //       ),
  //     }))
  //     .filter((faq) => faq.subHead.length > 0);

  //   return (
  //     <div className="w-full max-w-[87%]">
  //       {filteredFaqs.length > 0 ? (
  //         <div>
  //           <div className="flex w-full">
  //             <div className="w-[25%] h-full max-sm:hidden">
  //               <div className="flex flex-col">
  //                 <div className="flex justify-start items-center">
  //                   <div className="w-1 h-[58px] flex-shrink-0 bg-[#ED1C24] mr-[0.938rem]" />
  //                   <h3 className="text-[18px] my-[1rem] brutal cursor-pointer text-[#ED1C24] font-medium">
  //                     SEARCH RESULTS:
  //                   </h3>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="w-[75%] h-full">
  //               {/* Render filtered search results */}
  //               {filteredFaqs.map((faq) =>
  //                 faq.subHead.map((sub) =>
  //                   sub.qsAndDes
  //                     .filter(
  //                       (qa) =>
  //                         qa.qs
  //                           .toLowerCase()
  //                           .includes(searchQuery.toLowerCase()) ||
  //                         qa.description
  //                           .toLowerCase()
  //                           .includes(searchQuery.toLowerCase())
  //                     )
  //                     .map((qa, qaIndex) => (
  //                       <div key={qa.qs}>
  //                         <div className="flex gap-[1.875rem] max-sm:hidden">
  //                           <div className="w-1 h-[52px] flex-shrink-0 bg-[#D9D9D9]" />
  //                           <div className="flex flex-col justify-start items-start">
  //                             <h1 className="text-black text-lg brutal font-medium leading-[26px] tracking-[0.04px] max-w-[90%]">
  //                               {qa.qs}
  //                             </h1>
  //                             <p className="mt-[0.625rem] text-[#000] text-base brutal font-normal leading-[20px] tracking-[0.028px] max-w-[92%]">
  //                               {qa.description}
  //                             </p>
  //                           </div>
  //                         </div>
  //                         <hr className="h-0.5 ml-[1.875rem] flex-shrink-0 border-t border-[#C9C9C9] mt-[1.125rem] mb-[3.125rem] max-sm:hidden" />
  //                       </div>
  //                     ))
  //                 )
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         <div>
  //           <div className="flex w-full max-sm:flex-col">
  //             <div className="w-[30%] max-sm:w-full h-full">
  //               <div className="flex flex-col">
  //                 <div className="flex justify-start items-center">
  //                   <div className="w-1 h-[58px] flex-shrink-0 bg-[#ED1C24] mr-[0.938rem]" />
  //                   <h3 className=" brutal text-[18px] my-[1rem] cursor-pointer text-[#ED1C24] font-medium">
  //                     SEARCH RESULTS:
  //                   </h3>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="w-[70%] max-sm:w-full h-full">
  //               <div>
  //                 <div className="flex gap-[1.875rem] ">
  //                   <div className="flex flex-col justify-start items-start ml-5">
  //                     <h1 className="text-[#404040] text-[24px] max-sm:text-[18px] brutal font-normal leading-[26px] tracking-[0.04px]">
  //                       No matches found for your search
  //                     </h1>
  //                     <p className="mt-[0.625rem] text-[#404040] text-[16px] brutal font-normal leading-[20px] tracking-[0.028px]">
  //                       Please clear your search & try again.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Mobile Accordion */}
  //       <div className="md:hidden w-full">
  //         {/* Check if there are any results to display the SEARCH RESULTS heading */}
  //         {filteredFaqs.some((faq) =>
  //           faq.subHead.some((subTab) =>
  //             subTab.qsAndDes.some(
  //               (qa) =>
  //                 qa.qs.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                 qa.description
  //                   .toLowerCase()
  //                   .includes(searchQuery.toLowerCase())
  //             )
  //           )
  //         ) && (
  //           <div className="flex justify-start items-center mb-10">
  //             <div className="w-1 h-[58px] flex-shrink-0 bg-[#ED1C24] mr-[0.938rem]" />
  //             <h3 className=" brutal text-[16px] my-[1rem] cursor-pointer text-[#ED1C24] font-medium">
  //               SEARCH RESULTS:
  //             </h3>
  //           </div>
  //         )}

  //         {filteredFaqs.map((faq) => (
  //           <div key={faq.id}>
  //             {faq.subHead.map((subTab) => {
  //               // Filter the questions based on the search query
  //               const filteredQuestions = subTab.qsAndDes.filter(
  //                 (qa) =>
  //                   qa.qs.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                   qa.description
  //                     .toLowerCase()
  //                     .includes(searchQuery.toLowerCase())
  //               );

  //               return (
  //                 <div key={subTab.id}>
  //                   {filteredQuestions.map((qa, qaIndex) => (
  //                     <div key={qa.qs}>
  //                       <div
  //                         className="flex justify-between items-start py-2 cursor-pointer"
  //                         onClick={() => toggleQuestion(qaIndex)}
  //                       >
  //                         <div className="flex gap-[0.625rem] max-w-[90%]">
  //                           <div className="w-1 h-[40px] flex-shrink-0 bg-[#D9D9D9]" />
  //                           {/* Render the question directly */}
  //                           <h4 className="text-black text-[14px] brutal font-medium">
  //                             {qa.qs}
  //                           </h4>
  //                         </div>
  //                         <div>
  //                           {activeQuestion === qaIndex ? (
  //                             <div>
  //                               <Image
  //                                 src="/images/faq/icons/plus.svg"
  //                                 alt="chevron-up"
  //                                 width={20}
  //                                 height={20}
  //                                 className="cursor-pointer w-[10px] h-[10px]"
  //                               />
  //                             </div>
  //                           ) : (
  //                             <div>
  //                               <Image
  //                                 src="/images/faq/icons/plus.svg"
  //                                 alt="chevron-down"
  //                                 width={20}
  //                                 height={20}
  //                                 className="cursor-pointer w-[10px] h-[10px]"
  //                               />
  //                             </div>
  //                           )}
  //                         </div>
  //                       </div>
  //                       {activeQuestion === qaIndex && (
  //                         // Render the description directly
  //                         <p className="text-[#000] ml-[0.925rem] text-[14px] brutal font-normal leading-[20px] tracking-[0.028px]">
  //                           {qa.description}
  //                         </p>
  //                       )}
  //                       {/* Render hr if not the last question */}
  //                       {qaIndex !== subTab.qsAndDes.length - 1 && (
  //                         <hr className="h-0.5 ml-[0.875rem] flex-shrink-0 border-t border-[#C9C9C9] mt-[3.125rem] mb-[2.500rem]" />
  //                       )}
  //                     </div>
  //                   ))}
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-[0.875rem] mb-[2.875rem] relative">
      <div className="w-full max-w-[87%] flex max-sm:flex-col justify-between items-center mb-[2.875rem]">
        {/* search for mobile */}

        {/* <div className="w-[380px] max-sm:max-w-[100%] h-[54px] flex-shrink-0 rounded-[6px] bg-[#DCDCDC] flex justify-between items-center p-5 md:hidden">
          <input
            className="w-full h-[54px]   rounded-[6px] bg-[#DCDCDC] "
            type="text"
            placeholder="Search by keyword"
            value={searchQuery}
            onKeyDown={handleKeyPress}
            onChange={handleSearchChange}
          />
          {searchQuery ? (
            <div onClick={clearSearch}>
              <h1 className="underline cursor-pointer my-2 ml-1 text-[#404040] brutal text-[16px] font-normal">
                CLEAR
              </h1>
            </div>
          ) : (
            <Image
              src={"/images/faq/icons/mingcute_search-line.svg"}
              alt="search"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          )}
        </div> */}

        {/* tab */}
        <div className="overflow-x-auto max-sm:max-w-[100%] max-w-[87%] hide-scroll-bar max-sm:mt-2 mb-[2.125rem] max-sm:mb-[1rem]">
          <div className="flex w-full 2xl:gap-16 justify-start gap-10 max-sm:gap-7 items-center">
            {faq.map((faqs) => {
              return (
                <div
                  key={faqs.id}
                  onClick={() => {
                    setCategory(faqs.head);
                    handleTabClick(
                      Number(faqs.id),
                      faqs.subHead[0]?.miniHead ?? ""
                    );
                  }}
                >
                  <h1
                    className={`${
                      selectedTab === Number(faqs.id) && !searchQuery
                        ? "text-[#ED1C24] font-medium"
                        : "text-gray-600 font-normal"
                    } text-lg leading-normal brutal cursor-pointer uppercase max-sm:w-full whitespace-nowrap select-none`}
                  >
                    {faqs.head}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>

        {/* search for desktop */}
        {/* <div className="w-[380px] ml-5 max-sm:max-w-[100%] h-[54px] flex-shrink-0 rounded-[6px] bg-[#DCDCDC] flex  justify-between items-center p-5 max-sm:hidden">
          <input
            className="w-full h-[54px] pl-5 rounded-[6px] bg-[#DCDCDC]"
            type="text"
            placeholder="Search by keyword"
            value={searchQuery}
            onKeyDown={handleKeyPress}
            onChange={handleSearchChange}
          />
          {searchQuery ? (
            <div onClick={clearSearch}>
              <h1 className="underline cursor-pointer my-2 ml-1 text-[#404040] brutal text-[16px] font-normal">
                CLEAR
              </h1>
            </div>
          ) : (
            <Image
              src={"/images/faq/icons/mingcute_search-line.svg"}
              alt="search"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          )}
        </div> */}
      </div>
      {renderWithoutSearch()}
    </div>
  );
}

export default FaqSection;
