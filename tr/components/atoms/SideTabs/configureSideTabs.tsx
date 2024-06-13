import React, { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";


const ConfigureSideTabs = ({ selected, onSelect, list, }) => {

    const { isMobile } = useContext(NavbarContext);

    return (
        <div className="flex items-center">
            {isMobile ? (
                <div>
                    {list.map((option, index) => (
                        <button
                            key={index}
                            className={` px-2 sm:px-3 mx-[6px] sm:mx-2 py-[6px] text-[12px] sm:text-[13px] rounded-md uppercase brutal ${selected === index
                                ? "border border-[#ED1C24] text-[#000] font-bold"
                                : "font-normal"
                                }`}
                            onClick={() => onSelect(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <div>
                    {list.map((option, index) => (
                        <button
                            key={index}
                            className={`px-6 py-2 rounded-md uppercase brutal ${selected === index
                                ? "border border-[#ED1C24] text-[#000] font-bold"
                                : "font-normal"
                                }`}
                            onClick={() => onSelect(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConfigureSideTabs;
