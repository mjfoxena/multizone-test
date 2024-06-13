import { useEffect } from "react";
import CommonFooter from "../../components/molecules/CommonFooter";
import PreferenceHearder from "../../components/molecules/Preference/PreferenceHeader";
import { saveConsentConfiguration } from "../../services/Preference";

function Preference() {
  const onPageLoaded = async () => {
    try {
      const fetchedCountries = await saveConsentConfiguration();
    } catch (error) {
      console.log("🚀 ~ onPageLoaded ~ error:", error);
    }
  };
  useEffect(() => {
    onPageLoaded();
  }, []);

  return (
    <div>
      <PreferenceHearder />
      <CommonFooter />
    </div>
  );
}

export default Preference;
