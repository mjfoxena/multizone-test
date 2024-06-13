
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ConfigImageContainer from './imageContainer';
import ConfigScrollContainer from './scrollContainer';
import style from "../../pages/configure/map.module.scss"

gsap.registerPlugin(ScrollTrigger);

const SelectionDefaults = {
  "Original": {
    option_code: "",
    selected_option: [],
    optionalUpgrades: [],
  },
  "Recon": {
    option_code: "",
    selected_option: [],
    optionalUpgrades: [],
  }
}

const ConfigureContainer = ({ selectedVariant }) => {

  const [selectedModelList, setSelectedModelList] = useState(selectedVariant);
  const [selectedPersonality, setSelectedPersonality] = useState("PTTR");

  const [originalSelections, setOriginalSelections] = useState(SelectionDefaults["Original"]);
  const [reconSelections, setReconSelections] = useState(SelectionDefaults["Recon"]);  

  //  updated Pricing Data state
  const [updatedPricing, setUpdatedPricing] = useState(null);
  const [renderSection, setRenderSection] = useState("IN");

  const handleListItemSelect = (item) => {
    setSelectedModelList(item);
  };
  const handlePersonalitySelect = (id) => {
    setSelectedPersonality(id);
  };

  useEffect(() => {    
    if (selectedModelList === "Original") {
      setOriginalSelections(prevState => ({ ...prevState, option_code: selectedModelList.option_code }));
    } else if (selectedModelList === "Recon") {
      setReconSelections(prevState => ({ ...prevState, option_code: selectedModelList.option_code }));
    }
  }, [selectedModelList]);
  

  const updateOptionCode = (optionCode, selectedModelList) => {    
    if (selectedModelList === 'Original' &&  optionCode !== originalSelections.option_code) {
      setOriginalSelections(prevState => ({ ...prevState, option_code: optionCode }));
    } else if (selectedModelList === 'Recon' &&  optionCode !== reconSelections.option_code) {
      setReconSelections(prevState => ({ ...prevState, option_code: optionCode }));
    }
  };

  console.log("SelectionDefaults ", originalSelections);
  console.log("SelectionDefaults =>", reconSelections);

  return (
    <div className={`${style.cotainer}`}>
      <ConfigImageContainer
        selectedVariant={selectedVariant}
        onPersonalitySelected={selectedPersonality}
        selectedModel={selectedModelList}
        setSelectedModelList={setSelectedModelList}
        originalSelections={originalSelections}
        reconSelections={reconSelections}
        renderSection={renderSection}
        setRenderSection={setRenderSection}
        updatedPricing={updatedPricing}
      />
      <ConfigScrollContainer
        selectedModel={selectedModelList}
        onPersonalitySelected={handlePersonalitySelect}
        setOriginalSelections={setOriginalSelections}
        setReconSelections={setReconSelections}
        originalSelections={originalSelections}
        reconSelections={reconSelections}
        setUpdatedPricing={setUpdatedPricing}
        setRenderSection={setRenderSection}
        updateOptionCode={updateOptionCode}
      />
    </div>
  );
}

export default ConfigureContainer;
