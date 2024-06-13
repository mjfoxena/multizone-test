import { sidebarSteps } from "..";
import { ClosableGridSidePanel } from "../../../components/molecules/ClosableGridPanel";
import { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { useSpecSheet } from "../../../queries/config";
import { useRouter } from "next/router";
import { API_CONSTANTS } from "../../../services/constants";
import { chooseVarientData } from "../../../constants/raw_config_data"
import Image from "next/image";

const CompareVariants = ({ setSidebarTab }) => {
  const { isMobile } = useContext(NavbarContext);
  const { data } = useSpecSheet();
  const { asPath } = useRouter();
  const { query } = useRouter();

  return (
    <ClosableGridSidePanel
      title={"COMPARE VARIANTS"}
      // @ts-ignore
      downloadOption={{
        text: "DOWNLOAD FULL SPEC SHEET",
        link: `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/pdf/specs.pdf`,
      }}
      onClose={() => {
        if (asPath.includes("summary")) {
          setSidebarTab(sidebarSteps.summary);
        } else if (query.variant === "limited") {
          setSidebarTab(sidebarSteps.limited);
        } else {
          setSidebarTab(sidebarSteps.sidebarStep1);
        }
      }}
    >

      <div style={{ overflowY: "scroll" }} className="sm:mt-12 mt-8 mb-12">
        <div className="grid grid-cols-2 gap-4 mb-10">
          {/* Render the first half in the left column */}
          <div>
            <div className="sm:mb-12 mb-8">
              <Image
                src="/images/config/chosevarient/original1.png"
                alt="Image 3"
                loading="eager"
                width={isMobile ? 110 : 200}
                height={isMobile ? 110 : 200}
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* 1st left side 5 data */}
            {chooseVarientData?.topData.slice(0, Math.ceil(chooseVarientData.topData.length / 2)).map((item, id) => (
              <div key={id} className={`mb-10 ${item.title_class === "responsive" ? "2xl:h-auto h-24" : ""}`}>
                <div className="brutal text-[0.68em] sm:text-[0.9em] text-[#ED1C24] font-medium leading-4">{item.title}</div>
                <div className="text-[0.8em] sm:text-[1.2em] eurostile text-[#17191D] mt-2 uppercase">{item.value}</div>
                <div className="text-[0.7em] sm:text-[0.9em] brutal text-[#17191D] mt-2">{item.description}</div>
              </div>
            ))}

            {/* personality */}
            <div className="my-10">
              <div className="brutal text-[0.7em] sm:text-[0.9em] text-[#ED1C24] font-medium leading-4">PERSONALITIES</div>
              <div className="mt-4 sm:flex">
                <Image
                  width={190}
                  height={28}
                  loading="eager"
                  alt="airstrike personality"
                  src="/images/config/personality/laser1.png"
                  style={{ height: "28px" }}
                  className="rounded-sm"
                />
                <p className="eurostile sm:ml-4 uppercase">Laser</p>
              </div>
              <div className="mt-4 sm:flex">
                <Image
                  width={190}
                  height={28}
                  loading="eager"
                  alt="airstrike personality"
                  src="/images/config/personality/shadow.png"
                  style={{ height: "28px" }}
                  className="rounded-sm"
                />
                <p className="eurostile sm:ml-4 uppercase">Shadow</p>
              </div>
              <div className="mt-4 sm:flex">
                <Image
                  width={190}
                  height={28}
                  loading="eager"
                  alt="airstrike personality"
                  src="/images/config/personality/airstrik.png"
                  style={{ height: "28px" }}
                  className="rounded-sm"
                />
                <p className="eurostile sm:ml-4 uppercase">Airstrike</p>
              </div>
            </div>

            {/* remaining left side data */}
            {chooseVarientData?.bottomData.slice(0, 10).map((item, id) => (
              <div key={id} className={`mb-10 ${item.title_class === "responsive" ? "2xl:h-auto h-24" : ""}`}>
                <div className={`brutal text-[0.68em] sm:text-[0.9em] ${item.title_class === "violet" ? "text-[#521CED]" : "text-[#ED1C24]"} font-medium leading-4`}>{item.title}</div>
                <div className="text-[0.8em] sm:text-[1.2em] eurostile text-[#17191D] mt-2 uppercase">{item.value}</div>
                <div className="text-[0.7em] sm:text-[0.9em] brutal text-[#17191D] mt-2">{item.description}</div>
              </div>
            ))}
          </div>

          {/* Render the second half in the right column */}
          <div className="sm:mr-[3%] ml-[3%] sm:ml-0">
            <div className="sm:mb-12 mb-8">
              <Image
                src="/images/config/chosevarient/recon1.png"
                alt="Image 3"
                width={isMobile? 200 : 300}
                height={isMobile? 200 : 300}
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* 1st right side 5 data */}
            {chooseVarientData?.topData.slice(Math.ceil(chooseVarientData.topData.length / 2)).map((item, id) => (
              <div key={id} className={`mb-10 ${item.title_class === "responsive" ? "2xl:h-auto h-24" : ""}`}>
                <div className={`brutal text-[0.68em] sm:text-[0.9em] text-[#ED1C24] font-medium leading-4`}>{item.title}</div>
                <div className="text-[0.8em] sm:text-[1.2em] eurostile text-[#17191D] mt-2 uppercase">{item.value}</div>
                <div className="text-[0.7em] sm:text-[0.9em] brutal text-[#17191D] mt-2">{item.description}</div>
              </div>
            ))}

            {/* personality */}
            <div className="my-10">
              <div className="brutal text-[0.68em] sm:text-[0.9em] text-[#ED1C24] font-medium leading-4">PERSONALITIES</div>
              <div className="mt-4 sm:flex">
                <Image
                  width={190}
                  height={28}
                  loading="eager"
                  alt="airstrike personality"
                  src="/images/config/personality/laser1.png"
                  style={{ height: "28px" }}
                  className="rounded-sm"
                />
                <p className="eurostile sm:ml-4 uppercase">Laser</p>
              </div>
              <div className="mt-4 sm:flex">
                <Image
                  width={190}
                  height={28}
                  loading="eager"
                  alt="airstrike personality"
                  src="/images/config/personality/shadow.png"
                  style={{ height: "28px" }}
                  className="rounded-sm"
                />
                <p className="eurostile sm:ml-4 uppercase">Shadow</p>
              </div>
              <div className="mt-4 sm:flex">
                <Image
                  width={190}
                  height={28}
                  loading="eager"
                  alt="airstrike personality"
                  src="/images/config/personality/airstrik.png"
                  style={{ height: "28px" }}
                  className="rounded-sm"
                />
                <p className="eurostile sm:ml-4 uppercase">Airstrike</p>
              </div>
            </div>

            {/* remaining right side data */}
            {chooseVarientData?.bottomData.slice(10, 21).map((item, id) => (
              <div key={id} className={`mb-10 ${item.title_class === "responsive" ? "2xl:h-auto h-24" : ""}`}>
                <div className={`brutal text-[0.68em] sm:text-[0.9em] ${item.title_class === "violet" ? "text-[#521CED]" : "text-[#ED1C24]"} font-medium leading-4`}>{item.title}</div>
                <div className="text-[0.8em] sm:text-[1.2em] eurostile text-[#17191D] mt-2 uppercase">{item.value}</div>
                <div className={`text-[0.7em] sm:text-[0.9em] brutal mt-2 ${id === 1 || id === 2 ? 'text-white' : 'text-[#17191D]'}`}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {isMobile && (
        <div
          style={{
            marginTop: "70px",
            height: "70px",
          }}
        ></div>
      )}
    </ClosableGridSidePanel>
  );
};

export default CompareVariants;
