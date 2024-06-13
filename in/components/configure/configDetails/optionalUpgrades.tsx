/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import InputTab from "../inputTab";
import Image from "next/image";

interface ISuperNovaProps {
  multiSelect: boolean;
  selectedModel: string;
  setOriginalSelections: any;
  originalSelections: any;
  selectedDetails: any;
}
const OptionalUpgrades = ({
  multiSelect,
  selectedModel,
  setOriginalSelections,
  originalSelections,
  selectedDetails,
}: ISuperNovaProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedDetails) {
      const defaultUpgrades = selectedDetails?.sub_categories_data.map(
        (categoryItem) => categoryItem.default
      );

      if (originalSelections.optionalUpgrades.length === 0) {
        setOriginalSelections({
          ...originalSelections,
          optionalUpgrades: defaultUpgrades,
        });
      }

      console.log(defaultUpgrades, "originalSelections");
    }
  }, [selectedDetails?.sub_categories_data]);

  let initSelectedIds: any = [];
  if (selectedModel === "Original") {
    initSelectedIds = originalSelections.optionalUpgrades;
  }

  const handleClick = (deafultId: string, selectedId: string) => {
    const upgradeList = originalSelections.optionalUpgrades;

    const index = upgradeList.indexOf(deafultId);
    const selectedIndex = upgradeList.indexOf(selectedId);

    // If the Default item is found, replace it with its Selected Id
    if (index !== -1) {
      upgradeList[index] = selectedId;
    } else if (selectedIndex !== -1) { // Otherwise replace with default Id
      upgradeList[selectedIndex] = deafultId;
    }

    if (multiSelect) {
      setOriginalSelections({
        ...originalSelections,
        optionalUpgrades: upgradeList,
      });
    }
  };

  // dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //   console.log("$$$$ ", originalSelections.optionalUpgrades);

  return (
    <>
      <div
        style={{ letterSpacing: "0.2px" }}
        className="flex cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2 className="brutal sm:text-[16px] text-[14px] leading-38 tracking-tight underline disketMono">
          {selectedDetails?.category_desc}
        </h2>
        <Image
          alt="plus Icon"
          src={"/images/config/dropdown.svg"}
          height={10}
          width={15}
          className={`ml-2 cursor-pointer mt-[2px] ${isDropdownOpen ? "rotate-180" : ""
            }`}
        />
      </div>
      {(isDropdownOpen || originalSelections.optionalUpgrades.some(value => ["MA01", "ST01", "CH01", "WT01"].includes(value))) && (
        <div>
          {selectedDetails?.sub_categories_data.map((item, i) => (
            <div className="mt-6" key={i}>
              <InputTab
                id={item.default}
                item={item.category_name}
                price={item.options_data[1].price}
                content={item.category_desc}
                onClick={() => handleClick(item.default, item.options[1])}
                isSelected={initSelectedIds.includes(item.options[1])}
                imageUrl={false}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OptionalUpgrades;
