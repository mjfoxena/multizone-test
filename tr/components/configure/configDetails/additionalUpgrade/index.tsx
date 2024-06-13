import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ConfigButton from '../../../atoms/Button/configAdd'
import style from '../../../pages/configure/map.module.scss'
import AdditionalSection from './additonalSection'

const AdditionalUpgrades = ({ multiSelect, selectedModel, selectedDetails, setReconSelections, reconSelections }) => {

    useEffect(() => {
        if (selectedDetails) {
          const defaultUpgrades = selectedDetails?.sub_categories_data.map(
            (categoryItem) => categoryItem.default
          );
    
          if( reconSelections.optionalUpgrades.length === 0){
            setReconSelections({
              ...reconSelections,
              optionalUpgrades: defaultUpgrades,
            });
          }
        }
      }, [selectedDetails?.sub_categories_data]);      

    const [initSelectedIds, setInitSelectedIds] = useState<string[]>([]);

    useEffect(() => {
      if (selectedModel === "Recon") {
        setInitSelectedIds(reconSelections.optionalUpgrades);
      }
    }, [selectedModel, reconSelections.optionalUpgrades]);

    const handleClick = (deafultId: string, selectedId: string) => {
        const upgradeList = reconSelections.optionalUpgrades;
    
        const index = upgradeList.indexOf(deafultId);
        const selectedIndex = upgradeList.indexOf(selectedId);
    
        if (index !== -1) {
          upgradeList[index] = selectedId;
        } else if(selectedIndex !== -1) { 
            upgradeList[selectedIndex] = deafultId;
        }
    
        if (multiSelect) {
            setReconSelections({
            ...reconSelections,
            optionalUpgrades: upgradeList,
          });
        }
    };

    return (
        <div>
            <div style={{ letterSpacing: "0.2px" }}>
                <h2 className='brutal font-medium sm:text-[22px] text-[18px] uppercase'>{selectedDetails?.category_name}</h2>
            </div>
            <div>
                {selectedDetails?.sub_categories_data.map((item, i) => (
                    <div className={`${i === 0 ? 'sm:mt-10' : 'sm:mt-32'} mt-20`} key={i}>
                        <AdditionalSection
                            id={item.default}
                            item={item.category_name}
                            description={item.category_desc}
                            description_point={item.category_desc_points}
                            price={item.options_data[1].price}
                            onClick={() => handleClick(item.default, item.options[1])}
                            isSelected={initSelectedIds.includes(item.options[1])}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdditionalUpgrades
