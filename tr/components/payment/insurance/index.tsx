import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { useRouter } from "next/router";
import Modal from "../../molecules/Modal";
import ViewProtectionPlan from "./protectionPlans";
import ShowPartners from "./showPartners";
import { saveInsuranceSelection } from "../../../services/PaymentService";
import { iConstants, iContent } from "../../../constants/raw_data";
import Button from "../../atoms/Button";
import { TextElement } from "../../atoms/Texts";
import { TooltipInfo } from "../../atoms/Cards/VariantCard";
import Image from "next/image";

const InsuranceTab = ({
  items,
  details,
  title,
  description,
  subheader,
  meta,

  onCompleted,
  selectedBankPartner,
  onSaveInsuranceSelection,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Show Modal
  const [showModal, setShowModal] = useState(false);

  // Show Modal
  const [showAgreeModal, setShowAgreeModal] = useState(false);

  const { isMobile, userData } = useContext(NavbarContext);

  // [0: Showing partners, 1: display_partner info]
  const [indexing, setIndexing] = useState(0);

  // Choose Bank Partner Item
  const [selectedBankPartnerItem, setSelectedBankPartnerItem] = useState({
    partner: {
      id: "",
      name: "",
    },
    plans: [],
    selectedPlan: {},
    completed: false,
  });

  useEffect(() => {
    console.log("selectedBankPartner===> ", selectedBankPartner);

    if (selectedBankPartner) setSelectedBankPartnerItem(selectedBankPartner);
  }, [selectedBankPartner]);

  const isPartnerBankSelected = (): boolean =>
    selectedBankPartnerItem.partner.id !== "" &&
    Object.keys(selectedBankPartnerItem.partner).length !== 0;

  const resetItem = () => {
    setSelectedBankPartnerItem({
      partner: {
        id: "",
        name: "",
      },
      plans: [],
      selectedPlan: {},
      completed: false,
    });
  };

  const saveInsuranceSelectionStuff = async ({
    partner_id,
    plan_id,
    has_own = false,
  }) => {
    const body = {
      email: userData.email,
      phone: userData.phone,
      insurance_partner: partner_id,
      bring_my_own: has_own,
      insurance_plan: plan_id,
    };
    return await saveInsuranceSelection(body);
  };

  const handleBringMyOwnStuff = async (item) => {
    // Save user choice
    console.log("Bring my own Clicked: ", item);
    setIsLoading(true);
    const { error, payload } = await saveInsuranceSelectionStuff({
      partner_id: item.id,
      plan_id: 0,
      has_own: true,
    });
    console.log(error, payload);
    setIsLoading(false);

    if (payload) {
      // Process completed and MAke in Progress
      setSelectedBankPartnerItem({
        ...selectedBankPartnerItem,
        completed: true,
      });
      onSaveInsuranceSelection(null); // plan=null

      setShowAgreeModal(false);
      // Show In Progress
      // setIndexing(0);
      // onCompleted(selectedBankPartnerItem);
    }
  };

  const showPartners = () => (
    <ShowPartners
      description={description}
      details={details}
      items={items}
      meta={meta}
      onCompleted={(data) => {
        onCompleted(data);
      }}
      onNextHandler={async (item) => {
        console.log(item);

        if (
          item.partner.bring_my_own ||
          item.partner.id === iConstants.I_BRING_IT_OWN
        ) {
          // Show Agree Modal
          setShowAgreeModal(true);
        } else {
          setIndexing(1);
        }
      }}
      subheader={subheader}
      title={title}
      key="insurance_show_partners"
      selectedBankPartnerItem={selectedBankPartnerItem}
      isPartnerBankSelected={isPartnerBankSelected()}
      onItemClickHandler={async (item) => {
        if (selectedBankPartnerItem.partner.id == item.id) {
          resetItem();
        } else {
          console.log(item);

          // Handle Bring My Own
          if (item.id === iConstants.I_BRING_IT_OWN || item.bring_my_own) {
            // resetItem();
            setSelectedBankPartnerItem({
              partner: item,
              completed: false,
              plans: [],
              selectedPlan: {},
            });
          } else {
            // Filter Details
            const filteredPlans = details.filter(
              (pln) => pln.partner === item.id
            );
            setSelectedBankPartnerItem({
              partner: item,
              completed: false,
              plans: filteredPlans,
              selectedPlan: {},
            });
          }
        }
      }}
    />
  );
  const viewProtectionPlan = () => (
    <ViewProtectionPlan
      isMobile={isMobile}
      className="px-7 md:px-20"
      isLoading={isLoading}
      onBackTapped={() => {
        setIndexing(0);
      }}
      onNextHandlerCompleted={async (protectionPlan) => {
        setIsLoading(true);

        const { error, payload } = await saveInsuranceSelectionStuff({
          partner_id: selectedBankPartnerItem.partner.id,
          plan_id: protectionPlan.id,
          has_own: false,
        });
        console.log(error, payload);
        if (payload) {
          setIsLoading(false);
          setSelectedBankPartnerItem({
            ...selectedBankPartnerItem,
            selectedPlan: protectionPlan,
          });
          onSaveInsuranceSelection(protectionPlan);
          setShowModal(true);
        }
      }}
      partner={selectedBankPartnerItem.partner}
      plans={selectedBankPartnerItem.plans}
      selectedPlan={selectedBankPartnerItem.selectedPlan}
    />
  );
  const renderTabView = (index) => {
    switch (index) {
      case 0:
        return showPartners();

      case 1:
        return viewProtectionPlan();
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
              // Show In Progress
              setIndexing(0);
            }
          }}
          closeOnClickOutside
        >
          <div className="max-w-sm p-6 bg-white rounded-lg shadow mx-2">
            <h5 className="font-bold brutal  ">
              {
                // @ts-ignore
                selectedBankPartnerItem.partner.display_name
              }
            </h5>
            <p className="mt-7 mb-3 font-normal text-gray-700 text-base ">
              You will be contacted by one of the insurance partner representive
              in 2-3 business days.
            </p>
          </div>
        </Modal>
      )}
      {showAgreeModal && (
        <Modal
          state={showAgreeModal}
          stateHandler={(v) => {
            if (!v) {
              setShowAgreeModal(false);
            }
          }}
          closeOnClickOutside
        >
          <div className="bg-white rounded-sm">
            <div className="max-w-2xl p-7  shadow">
              <div className="flex justify-between">
                <div>
                  {
                    TextElement({
                      // @ts-ignore
                      text: selectedBankPartnerItem.partner.display_name,
                      fontSize: isMobile ? 14 : 20,
                      className: "text-left",
                      fontName: "brutal",
                    }).REGULAR.BLACK
                  }
                </div>
                <div
                  className=" right-7 top-7 cursor-pointer"
                  onClick={(e) => setShowAgreeModal(false)}
                >
                  <Image
                    width={10}
                    height={10}
                    alt="tent"
                    src="/images/icons/cross-black.svg"
                  />
                </div>
              </div>

              <p className="mt-4 mb-3 font-normal text-gray-700 text-base ">
                {iContent.insurance.bringMyOwn.modal}
              </p>
            </div>
            {/* Button Stuff */}
            <Button
              onClick={(e) => {
                handleBringMyOwnStuff(selectedBankPartnerItem.partner);
              }}
              text="AGREE"
              disable={false}
              bg="black"
              isDark
              width="100%"
              height="auto"
              allowHover
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default InsuranceTab;
