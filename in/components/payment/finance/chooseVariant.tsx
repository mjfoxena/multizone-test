import Button from "../../atoms/Button";
import PaymentRenderSection from "../PaymentRenderSection";
import Styles from "./finance.module.scss";
interface IVariant {
  id: string;
}

const ChooseVariant = ({
  financeSet,
  onVariantTappedHandler,
  selectedVariant,
  selectedBankPartnerItem,
  onNextHandler,
  className = "",
  isLoading = false,
}) => {
  const isVariantSelected = selectedVariant.id !== null;
  // console.log(selectedVariant);
  // console.log(selectedBankPartnerItem);

  return (
    <>
      <div className={`${className} pb-20`}>
        <PaymentRenderSection
          title={financeSet.title}
          key="payment_render_section_finance"
          description={financeSet.description}
          variants={financeSet.variants == undefined ? [] : financeSet.variants}
          onVariantTapped={onVariantTappedHandler}
          selectedVariants={selectedVariant == null ? null : [selectedVariant]}
          selectedBankPartnerItem={selectedBankPartnerItem}
          className={Styles.finance}
          styles={{
            subheader: Styles.subheader,
            header: Styles.header,
          }}
        />
      </div>

      <div className="nextButton">
        <Button
          className="paymentBtn"
          text={"NEXT"}
          onClick={() => {
            if (isVariantSelected) onNextHandler(selectedVariant);
          }}
          bg={!isVariantSelected ? "#EAEAEA" : "black"}
          hoverColor={isVariantSelected ? "" : "black"}
          width="100%"
          disable={!isVariantSelected || isLoading}
          isDark={isVariantSelected}
          allowHover={isVariantSelected}
        />
      </div>
    </>
  );
};

export default ChooseVariant;
