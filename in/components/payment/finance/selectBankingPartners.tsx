import React from "react";
import Button from "../../atoms/Button";
import VariantCard from "../../atoms/Cards/VariantCard";
import { TextElement } from "../../atoms/Texts";
import PaymentRenderSection from "../PaymentRenderSection";
import Styles from "./finance.module.scss";
import { getItoolTip } from "../../../utils/utils";
import { iConstants, iCustomPaymentIds } from "../../../constants/raw_data";

const ChooseBankingPartner = ({
  financeSet,
  onBankPartnerTappedHandler,
  selectedVariant,
  selectedBankPartnerItem,
  bankingPartnerItems,
  onNextHandler,
  isMobile,
  panNumber,
  phone,
  className = "",
  onBackTapped,
  emiPlans,
  tenure,
  userVariant = "", // User Selected Variant[Recon/Original/Limited]
}) => {
  const isSelected = selectedBankPartnerItem.partner.id !== null;

  return (
    <>
      {
        <div className={`${className} pt-6`}>
          <div
            className={Styles.configureBack}
            onClick={() => {
              onBackTapped();
            }}
          >
            {
              TextElement({
                text: "<",
                fontSize: 12,
                fontName: "nunito",
              }).REGULAR.BLACK
            }
            {
              TextElement({
                text: "Back",
                fontSize: 12,
                fontName: "nunito",
                className: "underline ",
              }).REGULAR.BLACK
            }
          </div>
        </div>
      }
      <div className={`${className} pb-20 overflow-auto`}>
        {/* Header Info */}
        <div className="mb-8"></div>
        <div className="mb-6">
          {
            TextElement({
              text: financeSet.subheader,
              fontSize: isMobile ? 16 : 20,
              fontName: "nunito",
            }).REGULAR.BLACK
          }
        </div>

        {/* Render Partners */}
        <div className="space-y-5  overflow-auto">
          {/* {selectedBankPartnerItem.completed && noneVariant()} */}
          {bankingPartnerItems.map((e, i) => (
            <div key={e.id}>
              {
                <VariantCard
                  description={e.description ? e.description : ""}
                  key={e.id}
                  selected={selectedBankPartnerItem.partner.id == e.id}
                  showEmi={true}
                  price={0}
                  isInProgress={
                    selectedBankPartnerItem.partner.id == e.id &&
                    selectedBankPartnerItem.completed
                  }
                  info={getItoolTip(e)}
                  disabled={
                    selectedBankPartnerItem.partner.id !== e.id &&
                    selectedBankPartnerItem.completed
                  }
                  label={e.display_name}
                  showIncluded={false}
                  onClick={
                    selectedBankPartnerItem.completed
                      ? null
                      : () => {
                          // Filter Emis
                          const filteredDetails = emiPlans.filter(
                            (emi) =>
                              emi.partner === e.id &&
                              emi.applicable_to_variant === userVariant
                          );

                          // Filter tenureOb
                          const filteredTenure = tenure.filter(
                            (item) => item.id === e.id
                          );

                          onBankPartnerTappedHandler({
                            emi_plans: filteredDetails,
                            partner: e,
                            tenure:
                              filteredTenure.length == 0
                                ? {}
                                : filteredTenure[0],
                          });
                        }
                  }
                />
              }
              {selectedBankPartnerItem.partner.id == e.id &&
                !selectedBankPartnerItem.completed &&
                selectedBankPartnerItem.emi_plans.length !== 0 && (
                  <>
                    <div className="relative overflow-x-auto pb-10 pl-4 pt-5">
                      <table className="w-full text-sm text-left font-normal ">
                        <thead className="text-sm uppercase disketMono">
                          <tr>
                            <th scope="col" className="px-2 pb-3 font-normal">
                              EMI PLAN
                            </th>
                            <th scope="col" className="px-2 pb-3 font-normal">
                              MONTHS
                            </th>
                            {/* <th scope="col" className="px-2 pb-3 font-normal">
                              TOTAL COST
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBankPartnerItem.emi_plans.map(
                            (plan, ind) => (
                              <tr
                                key={plan.emi_amount + ind}
                                className="bg-white "
                              >
                                <th
                                  scope="row"
                                  className="px-2 py-2 disketMono text-sm font-normal"
                                >
                                  {plan.emi_amount.toString()}
                                </th>
                                <td className="px-2 py-2 disketMono text-sm font-normal">
                                  {plan.tenure}
                                </td>
                                {/* <td className="px-2 py-2 disketMono font-normal">
                                  {plan.total_cost.toString()}
                                </td> */}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
            </div>
          ))}

          {/* Show Meta Info */}
        </div>
      </div>

      <div className="nextButton ">
        <Button
          text={"NEXT"}
          className="paymentBtn"
          onClick={() => (isSelected ? onNextHandler() : {})}
          bg={!isSelected ? "#EAEAEA" : "black"}
          hoverColor={isSelected ? "" : "black"}
          width="100%"
          disable={!isSelected}
          isDark={isSelected}
          allowHover={isSelected}
        />
      </div>
    </>
  );
};

export default ChooseBankingPartner;
