import { useContext } from "react";
import { TextElement } from "../atoms/Texts";
import { NavbarContext } from "../../contexts/NavbarContext";
import VariantCard from "../atoms/Cards/VariantCard";
import { getItoolTip, MapCss } from "../../utils/utils";

const PaymentRenderSection = ({
  isLast = true,
  variants,
  title = "",
  description = "",
  selectedVariants,
  onVariantTapped,
  selectedBankPartnerItem,
  className = "",
  styles = {
    subheader: "",
    header: "",
  },
}) => {
  const { isMobile, userData, IsInternational } = useContext(NavbarContext);

  const isInProgress = (v) =>
    selectedBankPartnerItem.completed &&
    v.id === selectedBankPartnerItem.variant_id;

  const haDisabled = (e) => {
    if (selectedVariants[0].id === null) {
      return false;
    } else if (!selectedBankPartnerItem.completed) {
      return false;
    }
    return !isInProgress(e) && selectedVariants[0].id !== e.id;
  };

  return (
    <div
      className={className}
      style={{ borderBottom: isLast ? "none" : "1px solid #d1d1d1" }}
    >
      <div className={styles.header}>
        {
          TextElement({ text: title, fontSize: isMobile ? 16 : 20 }).MEDUIM
            .BLACK
        }
      </div>

      {
        TextElement({
          text: description,
          fontSize: isMobile ? 12 : 14,
          className: styles.subheader,
        }).REGULAR.BLACK
      }

      <div className="space-y-5">
        {variants.map((e, i) => (
          <div key={e.id + i}>
            {
              <VariantCard
                description={e.description ? e.description : ""}
                key={e.id + i}
                info={getItoolTip(e)}
                selected={
                  selectedVariants == null
                    ? false
                    : selectedVariants.find((each) => {
                        return each.id === e.id;
                      })
                }
                showEmi={true}
                price={0}
                isInProgress={isInProgress(e)}
                label={e.title}
                showIncluded={e.included}
                disabled={haDisabled(e)} // Make Disabled: No Progress && it's not a selected variant
                onClick={
                  selectedBankPartnerItem.completed
                    ? null
                    : () => {
                        onVariantTapped(e);
                      }
                }
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentRenderSection;
