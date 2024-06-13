import { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import Modal from "../../molecules/Modal";
import ChooseTenure from "./chooseTenure";
import ChooseBankingPartner from "./selectBankingPartners";
import ChooseVariant from "./chooseVariant";
import ViewLoanInfo from "./viewLoanInfo";
import {
  dataSet,
  iConstants,
  iCustomPaymentIds,
} from "../../../constants/raw_data";
import { saveFinanceSelection } from "../../../services/PaymentService";
import React from "react";

const FinanceTab = ({
  items,
  content,
  details,
  tenure,
  kyc_info,
  onCompleted,
  selectedBankPartner,
  total_amount,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState({
    id: null,
  });
  const { isMobile, userData } = useContext(NavbarContext);

  // Choose Bank Partner Item
  const [selectedBankPartnerItem, setSelectedBankPartnerItem] = useState({
    partner: { id: null, display_name: "" },
    completed: false,
    isNoneSelected: false,
    emi_plans: [], // Sorted Details
    tenure: {}, // tenure based on Selected part
    loan_info: {
      tenure,
      loan_amount: 0,
      total_loan_amount: total_amount,
    }, // Payment[Loan] Information
    variant_id: "",
  });

  useEffect(() => {
    if (selectedBankPartner) {
      setSelectedBankPartnerItem(selectedBankPartner);
      // Update Variant
      if (selectedBankPartner.variant_id.length !== 0) {
        const findVariants = financeSet.variants.filter(
          (v) => v.id === selectedBankPartner.variant_id
        );
        if (findVariants.length !== 0) {
          // @ts-ignore
          setSelectedVariant(findVariants[0]);
        }
      }

      if (
        selectedBankPartner.completed &&
        selectedBankPartner.variant_id !== iConstants.I_DONT_NEED_ONE
      ) {
        // Move to direct Show Partners View if Completed
        setIndexing(1);
      } else {
        // Show Active Variant [Direct Payment MOde]
        setIndexing(0);
      }
    }
  }, [selectedBankPartner]);

  // Show Modal
  const [showModal, setShowModal] = useState(false);

  // Render Component BAsed on Index
  /// {choose_variant:0, banking_partners: 1, view_partner: 2, view_tenure:3, in_progress:4}
  const [indexing, setIndexing] = useState(0);

  // Define Local Object
  const financeSet = {
    title: content.title,
    description: content.description,
    subheader: content.subheader,
    variants: dataSet.financeVariants,
  };

  const isPartnerBankSelected = (): boolean =>
    Object.keys(selectedBankPartnerItem.partner).length !== 0;
  const isVariantSelected = (): boolean =>
    Object.keys(selectedVariant).length !== 0;

  const onVariantTappedHandler = (variant) => {
    setSelectedVariant(variant);

    setSelectedBankPartnerItem({
      ...selectedBankPartnerItem,
      variant_id: variant.id,
    });
  };

  const saveFinanceStuff = async ({ loan_amount, tenureId, partnerId }) => {
    // isNone:  I dont Need one gets Selected By User
    // Store into db:

    // API Call
    setIsLoading(true);
    const body = {
      email: userData.email,
      phone: userData.phone,
      finance_partner: partnerId,
      finance_plan: tenureId,
      loan_amount: loan_amount,
    };
    const { error, payload } = await saveFinanceSelection(body);
    console.log(error, payload);
    if (payload) {
      setSelectedBankPartnerItem((pre) => {
        return {
          ...pre,
          completed: true,
        };
      });
      setIsLoading(false);
      return true;
    }
    return false;
  };

  // Choose/Select Variant
  const chooseVariant = () => (
    <ChooseVariant
      key={"choose_variant"}
      className="px-7 md:px-20"
      financeSet={financeSet}
      onVariantTappedHandler={onVariantTappedHandler}
      selectedBankPartnerItem={selectedBankPartnerItem}
      selectedVariant={selectedVariant}
      isLoading={isLoading}
      onNextHandler={async () => {
        if (
          isVariantSelected() &&
          selectedVariant.id === iConstants.CHECK_IT_OUT
        ) {
          // Move to next
          setIndexing(1);
        } else if (
          isVariantSelected() &&
          selectedVariant.id === iConstants.I_DONT_NEED_ONE // one time direct payment
        ) {
          // Check If Already Completed
          if (!selectedBankPartnerItem.completed) {
            // Move to payment tab
            // Make An API Call
            // @ts-ignore
            const isSaved = await saveFinanceStuff({
              loan_amount: 0,
              partnerId: selectedVariant.id,
              tenureId: 0,
            });
            if (isSaved) {
              selectedBankPartnerItem.completed = true;
              selectedBankPartnerItem.variant_id = selectedVariant.id;
              onCompleted(selectedBankPartnerItem, true); // true: for none
              console.log(selectedBankPartnerItem, selectedVariant);
            }
          } else {
            onCompleted(selectedBankPartnerItem, true);
          }
        }
      }}
    />
  );

  // Choose/Select Partner
  const chooseBankingPartner = () => (
    <ChooseBankingPartner
      key={"choose_banking_partner"}
      userVariant={userData.variant}
      className="px-7 md:px-20"
      financeSet={financeSet}
      emiPlans={details}
      tenure={tenure}
      isMobile={isMobile}
      bankingPartnerItems={items}
      onBackTapped={() => {
        // Move to next
        setIndexing(0);
      }}
      onBankPartnerTappedHandler={({ partner, emi_plans, tenure }) => {
        if (partner === "none") {
          setSelectedBankPartnerItem({
            ...selectedBankPartnerItem,
          });

          return;
        }
        if (selectedBankPartnerItem.partner.id == partner.id) {
          // reset to default
          setSelectedBankPartnerItem({
            ...selectedBankPartnerItem,
          });
        } else {
          // Filter
          setSelectedBankPartnerItem({
            ...selectedBankPartnerItem,
            partner,
            emi_plans,
            tenure,
          });
        }
      }}
      selectedBankPartnerItem={selectedBankPartnerItem}
      selectedVariant={selectedVariant}
      onNextHandler={async () => {
        console.log(selectedBankPartnerItem, selectedVariant);

        if (
          selectedBankPartnerItem.completed ||
          selectedBankPartnerItem.isNoneSelected
        ) {
          // Move to payment tab
          onCompleted(selectedBankPartnerItem);
        } else if (
          iCustomPaymentIds.find(
            (id) => id === selectedBankPartnerItem.partner.id
          )
        ) {
          // Save Finance Stuff and Go To Payment tab
          //partner [id= ill_arrange, none, bring_own_finance]

          const isSaved = await saveFinanceStuff({
            loan_amount: 0,
            partnerId: selectedBankPartnerItem.partner.id,
            tenureId: 0,
          });
          console.log("saveFinanceStuff: ", isSaved, selectedBankPartnerItem);

          if (isSaved) {
            if (
              selectedBankPartnerItem.partner.id === iConstants.ILL_ARRANGE_IT
            ) {
              // Not Showing modal for Ill arrange
              // Make Complete true
              selectedBankPartnerItem.completed = true;
              onCompleted(selectedBankPartnerItem, false, selectedVariant.id);
            } else {
              setShowModal(true);
              onCompleted(selectedBankPartnerItem, true, selectedVariant.id); // true: for none
            }
          }

          // Move to Choose Partner tab to Display Progress status
          // setIndexing(1);
        } else {
          if (isPartnerBankSelected()) {
            // Move to next
            setIndexing(2);
          } else {
            // May show Error Msg
          }
        }
      }}
      panNumber={kyc_info.pancard}
      phone={kyc_info.phone}
    />
  );

  const chooseTenureLoan = () => (
    <ChooseTenure
      className="px-7 md:px-20"
      isMobile={isMobile}
      onBackTapped={() => {
        setIndexing(1);
      }}
      isLoading={isLoading}
      total_amount={total_amount}
      onNextHandlerCompleted={async ({
        tenure,
        loan_amount,
        total_loan_amount,
      }) => {
        // tenure: Selected by USER
        setSelectedBankPartnerItem((pre) => {
          return {
            ...pre,
            loan_info: {
              tenure,
              loan_amount,
              total_loan_amount,
            },
          };
        });
        // setIndexing(3);

        await saveFinanceStuff({
          tenureId: tenure.id,
          loan_amount,
          partnerId: selectedBankPartnerItem.partner.id,
        });
        setShowModal(true);
        // Move to Choose Partner tab to Display Progress status
        setIndexing(1);
      }}
      partner={selectedBankPartnerItem.partner}
      tenure={selectedBankPartnerItem.tenure}
      emi_plans={selectedBankPartnerItem.emi_plans}
      key={"choose_tenure"}
    />
  );

  const viewLoanInfo = () => (
    <ViewLoanInfo
      className="px-7 md:px-20"
      isMobile={isMobile}
      onBackTapped={() => {
        setIndexing(2);
      }}
      onNextHandlerCompleted={async () => {
        // await saveFinanceStuff();
        setShowModal(true);
        // Move to Choose Partner tab to Display Progress status
        setIndexing(1);
      }}
      partner={selectedBankPartnerItem.partner}
      loan_info={selectedBankPartnerItem.loan_info}
      key={"fill_user_finance_form"}
    />
  );

  const renderTabView = (index) => {
    switch (index) {
      case 0:
        return chooseVariant();

      case 1:
        return chooseBankingPartner();

      case 2:
        return chooseTenureLoan();
      // case 3:
      //   return viewLoanInfo();
    }
  };

  return (
    <>
      {renderTabView(indexing)}
      {/* For Modal Show */}
      {showModal && (
        <Modal
          state={showModal}
          stateHandler={(v) => {
            if (!v) {
              setShowModal(false);
              // Process completed and MAke in Progress
              setSelectedBankPartnerItem({
                ...selectedBankPartnerItem,
                completed: true,
              });
            }
          }}
          closeOnClickOutside
        >
          <div className="max-w-sm p-6 bg-white rounded-lg shadow ">
            <h5 className="mb-2 font-bold brutal  ">
              {selectedBankPartnerItem.partner.display_name}
            </h5>
            <p className="mb-3 font-normal text-gray-900 text-xs ">
              You will be contacted by one of the{" "}
              {selectedBankPartnerItem.partner.display_name} representative in
              2-3 business days.
            </p>
            <p className="mb-3 font-normal text-gray-500 text-xs ">
              Please close this popup and proceed for further steps.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FinanceTab;
