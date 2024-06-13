import Head from "next/head";
import React from "react";
import CommonFooter from "../../../components/molecules/CommonFooter";
import CommonHyperLinkViewer from "../../../components/molecules/CommonHyperlinkViewer";
import GraphTags from "../../../components/GraphTags";
import { GetServerSidePropsContext } from "next";

const RenderSection = ({ header, subHeader, children, pExtraClass = "" }) => {
  return (
    <div className="my-8">
      {header && (
        <div className="font-semibold mt-2 text-[#000000] text-lg ">
          {header}
        </div>
      )}
      {subHeader && (
        <div className=" font-medium text-lg mt-5 text-[#000000]">
          {subHeader}
        </div>
      )}
      <p className={`mt-2 nunito ${pExtraClass}`}>{children}</p>
    </div>
  );
};

const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <Head>
        <title>Ultraviolette Automotive | Privacy Policy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Understand how Ultraviolette handles your data and prioritizes your privacy. Explore our privacy policy to learn about the measures we take to protect your information."
        />
        <link rel="canonical" href="https://www.ultraviolette.com/legal/privacy-policy" />
        <GraphTags
          title="Ultraviolette Automotive | Privacy Policy"
          description="initial-scale=1.0, width=device-width"
          image=""
          url="https://www.ultraviolette.com/legal/privacy-policy"
        />
      </Head>

      <CommonHyperLinkViewer
        Subheading={"Privacy policy"}
        Heading={"Ultraviolette Privacy Policy"}
        backgroundColor={"white"}
        noBackground
        customBodyStyle={{
          height: "min-content",
          width: "unset",
          paddingRight: "0px",
        }}
        body={
          <div className="-mt-8">
            <ol
              className={"mb-4 mt-2 ml-6 lg:ml-7 space-y-1"}
              style={{ listStyleType: "upper-alpha" }}
            >
              <li>
                <RenderSection header={"Introduction"} subHeader={""}>
                  This Privacy Policy was last updated in February 2023. <br />{" "}
                  <br />
                  Your privacy is important to Ultraviolette. Ultraviolette
                  Automotive Private Limited its affiliates and/or subsidiaries
                  (collectively,{" "}
                  <b>
                    &quot;Ultraviolette&quot;, &quot;we&quot;, &quot;us&quot; or
                    &quot;our&quot;
                  </b>
                  ) have developed this privacy policy.
                  <br /> <br />
                  Ultraviolette may collect, use, disclose, share, transfer or
                  store your Personal Information, Sensitive Personal
                  Information and Non-Personal Information (collectively{" "}
                  <b>&quot;information&quot;</b>) according to the provisions of
                  this Ultraviolette Privacy Policy.{" "}
                  <b>
                    By visiting the website i.e. https://www.ultraviolette.com/
                  </b>{" "}
                  (herein after referred as <b>&quot;Site&quot;</b>) or
                  downloading the <b>mobile application</b> or any other medium
                  used by Ultraviolette to provide its service to
                  you(hereinafter referred to as the <b>&quot;Platform&quot;</b>
                  ), you expressly agree to be bound by the terms and conditions
                  of this Ultraviolette Privacy Policy. We value the trust you
                  place in us and respect your privacy, maintaining the highest
                  standards for secure transactions and protection of your
                  personal information.
                  <br />
                  <br />
                  This Policy intends to inform you about how we collect,
                  receive, hold, use, transfer and/or disclose your information,
                  in accordance with the provisions of Information Technology
                  Act, 2000 and any other applicable provisions, including
                  amendments thereto for the time being in force (
                  <b>&quot;Indian Data Protection Law&quot;</b>).
                  <br />
                  <br />
                  Ultraviolette reserves the sole, unilateral right to modify
                  this Privacy Policy from time to time, as may be required due
                  to change in business policies, government regulations etc.
                  While reasonable efforts shall be made to notify you of any
                  significant changes to our Privacy Policy, it is incumbent
                  upon you to keep yourself apprised of any changes to this
                  Privacy Policy by visiting this page periodically.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={
                    "Personal and Sensitive Information Ultraviolette May Collect and Use "
                  }
                  subHeader={""}
                >
                  While visiting the Platform, you may be asked to provide
                  Ultraviolette with <b>&quot;Personal Information&quot;</b> for
                  different purposes, and Ultraviolette will collect and may
                  store such Personal Information. Personal information shall
                  include any information that specifically identifies an
                  individual or natural person, including but not limited to,
                  name, postal address, email address, telephone number, mobile
                  number or employer, etc. <br />
                  For instance, by requesting Ultraviolette to notify you of
                  updates to Ultraviolette’s products or updates to the Site,
                  Ultraviolette may ask you to provide your personal email
                  address. In addition, you may submit to Ultraviolette messages
                  that include information that can facilitate communication
                  with Ultraviolette including your name, personal telephone
                  number, mobile number, or your employer. <br /> <br />
                  <b>&quot;Sensitive Personal Information&quot;</b> As per the
                  Indian Data Protection Laws &quot;Sensitive Personal
                  Information&quot; means Personal Information which consists of
                  information relating to: (i) password; (ii) financial
                  information such as Bank account or credit card or debit card
                  or other payment instrument details; (iii) physical,
                  physiological and mental health condition; (iv) sexual
                  orientation; (v) medical records and history; (vi) biometric
                  information; (vii) any detail relating to the above clauses as
                  provided to a body corporate for providing service; and (viii)
                  any of the information received under the above clauses by a
                  body corporate for processing and/or is stored or processed
                  under lawful contract or otherwise. For example, Sensitive
                  Personal Information would include age, medical
                  history/records, weight etc. However, any information that is
                  freely available or accessible in public domain or furnished
                  under the Right to Information Act, 2005 or any other
                  applicable law for the time being in force shall not be
                  regarded as Sensitive Personal Information for the purposes of
                  this Policy.
                  <br /> <br />
                  Considering the above, please be informed that We may collect
                  and process one or more of the following Information
                  pertaining to You. The type of Information we may require may
                  change depending on whether You have just created an account,
                  booking a test ride, or processing such Information. Any or
                  all Information that is to be provided by You would be based
                  on Your consent. However, We would like You to note that
                  certain information would be required for performing one or
                  more services. We are also required to collect certain
                  Personal Information as required under applicable laws. You
                  may opt-out from providing us your Personal Information or
                  Sensitive Personal Information, however, You may not be able
                  to avail Our services in such case.
                  <br /> <br />
                  We wish to assure you that Your Information is safe with us.
                  We will process your Information lawfully and for purposes,
                  details of which We have provided in the below section.
                  <br /> <br />
                  <b>
                    The following are the types of Personal Information
                    pertaining to You that We may collect:
                  </b>
                  <ol
                    // style={{
                    //   listStyle: "decimal outside none",
                    //   listStylePosition: "inside",
                    // }}
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>Full name; </li>
                    <li>E-mail address; </li>
                    <li>Date of birth; </li>
                    <li>
                      Location information, including but not limited to the
                      current location, saved location, pinned locations,
                      searched locations and the GPS location of (a) any person
                      placing an order through the Application; (b) while using
                      location-based services through products and services; and
                      (b) addresses provided for providing the products or
                      services;{" "}
                    </li>
                    <li>Full name; </li>
                    <li>Address (including city or town);</li>
                    <li>Photograph of the user;</li>
                    <li>Emergency Contact Information;</li>
                    <li>Billing and shipping address;</li>
                    <li>Phone numbers; </li>
                    <li>Account login credentials and password;</li>
                    <li>Customer ID;</li>
                    <li>IP addresses; </li>
                    <li>
                      Details of the products or services ordered including
                      pricing;{" "}
                    </li>
                    <li>Date of purchase of products or services; </li>
                    <li>
                      Details of the vehicle purchased, e.g., vehicle license
                      number, VIN, etc.;{" "}
                    </li>
                    <li>
                      Driving license no. and expiry date or any other official
                      identification proof;
                    </li>
                    <li>Vehicle insurance policy number; </li>
                    <li>Vehicle repair history;</li>
                    <li>
                      Telematics data such as performance, operations,
                      performance, usage of products through vehicle (more
                      specifically described below) ;{" "}
                    </li>
                    <li>
                      User behavior and activities including but not limited to
                      clicks done, marketing e- mails opened, number of page
                      views, time of first session, time of last session,
                      facebook clicks, google plus clicks, first conversion
                      date, last e-mail sent date, number of submissions etc.
                    </li>
                    <li>
                      Payment information and history (excluding payment details
                      that shall be collected and processed by an authorized
                      payment service provider, which we do not collect);
                    </li>
                    <li>
                      Various certificates, e.g., registration certificate,
                      insurance certificate, road tax certificate, etc.
                    </li>
                    <li>
                      Any device and device identifier information as may be
                      deemed necessary;
                    </li>
                    <li>
                      Personal details of the secondary user, if provided;{" "}
                    </li>
                    <li>
                      We may automatically receive data on the successful
                      pairing of the Bluetooth;{" "}
                    </li>
                    <li>
                      Such other Personal Data as may be required from time to
                      time.
                    </li>
                  </ol>
                  <br />
                  Please note that the Personal Information as listed above,
                  other than financial information, is not Sensitive Personal
                  Information. We wish to share that it is possible that the
                  Government of India may categorize some of the other types of
                  Personal Information as Sensitive Personal Data/Information.
                  In such cases, We will inform You of the same and obtain Your
                  consent as, and if required.
                  <br />
                  It is also clarified that if You provide any data relating to
                  Your Aadhaar then the same shall be stored in the manner as
                  mandated by UIDAI.
                  <br /> <br />
                  For Personal Information received by Ultraviolette, it shall
                  be deemed that you knowingly and specifically agreed to
                  provide such Personal Information. In no event you shall not
                  provide to us any Personal Information pertains to third party
                  without such third party’s prior consent. If you do not agree
                  to provide your Personal Information, Ultraviolette may not be
                  able to inform you of any updates including, but not limited
                  to, updates to Ultraviolette products, Terms of Use or
                  Ultraviolette Privacy Policy.
                  <br />
                  <br />
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Personal Information Ultraviolette may use"}
                  subHeader={""}
                >
                  Ultraviolette may use your Personal Information by itself, or
                  through or together with its affiliates, subsidiaries,
                  strategic partners or third parties, if any, who act on our
                  behalf by disclosure, share or transfer of your Personal
                  Information for purposes below including:
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>
                      Where it is in both Your and our benefit that We further
                      process your Information as part of our business
                      administration, delivery of product or vehicle, its
                      maintenance and safety and security, maintaining service
                      quality, customer care, business management, risk
                      assessment/management, security, and operation purposes;
                    </li>
                    <li>
                      to provide the services, products, or information you
                      request, and to process and complete such requests and any
                      related transactions;
                    </li>
                    <li>
                      to send you confirmations, updates, alerts, and support
                      and administrative messages and otherwise facilitate your
                      use of, and our administration and operation of the
                      platform;
                    </li>
                    <li>
                      to keep you informed about various promotions, offers,
                      events, products or services;
                    </li>
                    <li>
                      For conducting marketing activities, for our services or
                      services of third parties, and to conduct market and other
                      research to improve our services and marketing activities;
                    </li>
                    <li>
                      to send you notices, such as changes to the Ultraviolette
                      Platform, the Terms of Use, Ultraviolette Privacy Policy
                      or any other policy or guideline;
                    </li>
                    <li>
                      for internal purposes, such as research, auditing or data
                      analysis; or
                    </li>
                    <li>
                      To allow You to participate in interactive features of our
                      service, when You choose to do so
                    </li>
                    <li>
                      to comply with any court order, law or legal process,
                      including to respond to any government or regulatory
                      request.
                    </li>
                  </ol>
                  For example,
                  <br />
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>
                      We determine Your real time location in order to provide
                      various location- enabled services, such as navigation.
                      You will have to specify whether determining and
                      collecting real time location is to be active or not.
                    </li>
                    <li>
                      When You visit our Application, usage data is collected
                      automatically through the Application. Such usage data can
                      include the type of device, the IP address, and the
                      current location. This is for security reasons, in
                      particular, to prevent and detect attacks on our
                      Application or attempts at fraud.
                    </li>
                    <li>
                      The information about Your click and search behavior is
                      used to adjust the Application or enhance the features of
                      our Services in order to make the Application layout more
                      convenient to You, change the order of search results and
                      to design certain pages differently, for Your convenience.
                    </li>
                    <li>
                      The information collected through cookies shall be used
                      for the purposes of advertising and analytics. We collect
                      usage data by using various types of cookies (small pieces
                      of data stored in your device) and other tracking tools.
                    </li>
                    <li>
                      Certain telematics data from the vehicle is collected to
                      further improve the performance of Your vehicle, ensure
                      safety, to facilitate the servicing of Your vehicle and to
                      give You insight on Your driving behaviour. The telematics
                      data shall include Personal Information such as vehicle
                      identification number, and other device related
                      information, such as performance, usage, operation,
                      condition of your vehicle, etc. The Ultraviolette vehicle
                      is equipped with several devices commonly referred to as
                      “Event Data Recorders” which record various types of real
                      time vehicle data AND with service-related devices that
                      record information about powertrain performance and
                      driving conditions. This data belongs to the customer and
                      may not be accessed by anyone else except as legally
                      required or with the permission of the customer. However,
                      this data may be accessed by Ultraviolette, its authorized
                      repairers, employees, representatives, its service
                      providers and contractors only for the purpose of the
                      technical diagnosis, research and development of your
                      vehicle.
                    </li>
                  </ol>
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={
                    "Types of Data collected and option to withdraw your consent "
                  }
                  subHeader={""}
                >
                  Data collected from you can be classified in the following
                  manner:
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>
                      <b>Essential</b> – This type of data is related with the
                      health check of the vehicle i.e. performance log of
                      various subsystems parameters, perform Over-The-Air’s
                      (&quot;OTAs&quot;) etc. This type of data is not
                      considered as personal information.
                    </li>
                    <li>
                      <b>Diagnostic</b> – This type of data will be accessed by
                      Us in case there is any requirement to perform diagnostics
                      or service task. This type of data is not considered as
                      personal information.
                    </li>
                    <li>
                      <b>Location</b> – This type of data will be accessed by us
                      to provide features like navigation, trip history,
                      geofencing, lockdown etc. This type of data is not
                      considered as personal information. User can turn on
                      incognito mode on app to control this.
                    </li>
                    <li>
                      <b>User provided information or personal information: </b>{" "}
                      Name, date of birth, phone number, email-id, license,
                      vehicle insurance, etc., will be accessed to provide
                      enhanced features.
                    </li>
                  </ol>
                  {/* <br /> */}
                  Your consent is voluntary to provide above mentioned data and
                  may always be revoked, for example by terminating a particular
                  service or contacting our representative in the manner
                  indicated in later sections. Where Your consent is required
                  and You do not give Your consent or consent withdrawn/revoked
                  subsequently, it may not be possible for You to use the
                  Application and/or avail the services being offered by us.
                  <br />
                  <br />
                  Your data is Yours - if You wish to withdraw Your consent at
                  any time, You can let Us know at info@ultraviolette.com.
                  Following will be the consequences of withdrawing consent and
                  it may disrupt some services;
                  <br />
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>
                      In case of Essential or Diagnostic data this may lead to
                      void your vehicle warranty{" "}
                    </li>
                    <li>
                      In case of Location data, We may not be able to provide
                      any features related to this type of data
                    </li>
                    <li>
                      In case of Personal Information we may not be able to
                      perform certain operations, such as processing Your
                      vehicle purchase and ensuring that You are able to access
                      various features of the Application, we would require
                      certain Personal Information which is essential for
                      completion of such operations.
                    </li>
                  </ol>
                  If You choose to withdraw Your consent, We may not be able to
                  provide You with any or all of our services
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={
                    "Purpose, Processing of Personal Information and Your Personal Information is collected at the following stages:"
                  }
                  subHeader={""}
                >
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                    style={{ listStyleType: "upper-roman" }}
                  >
                    <li>
                      <b>
                        Your Personal Information is collected at the following
                        stages:
                      </b>
                      <ol
                        className={
                          "mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"
                        }
                      >
                        <li>
                          When You register on the Application and create a user
                          account;
                        </li>
                        <li>When You visit and/or use our Platform;</li>
                        <li>When You book a test ride;</li>
                        <li>
                          When You pre-order or purchase our products or
                          services;
                        </li>
                        <li>When You set up and drive any of our products;</li>
                        <li>
                          When We communicate or undertake activities such as
                          servicing, referrals, affiliates, brand champions,
                          and/or other promotional activities, etc.{" "}
                        </li>
                      </ol>
                    </li>
                    <li>
                      <b>How Your Information is Processed (Processing):</b>
                      <br />
                      The information may be collected and processed by our
                      Platform and its service providers. Your Personal
                      Information is processed by us and by our service
                      providers under different circumstances and under a
                      different lawful basis. The same is provided below for
                      Your information:
                      <ol
                        className={
                          "mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"
                        }
                      >
                        <li>
                          Where you have provided Consent <br />
                          We may use and process Your Personal Information and
                          Sensitive Personal Data where You have consented for
                          Us to do so for the following purposes:
                          <ol
                            className={
                              "mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"
                            }
                            style={{ listStyleType: "lower-roman" }}
                          >
                            <li>
                              Process Your contact information, such as Your
                              email ID, full name and contact number to create
                              Your User Account on the Platform;
                            </li>
                            <li>
                              Process Your Personal Information, such as Your
                              name, contact information and address location for
                              arranging for test drives, or where You have
                              requested a call back for further information
                              about our products and services. Such information
                              may be further processed when the test drive has
                              been completed;
                            </li>
                            <li>
                              Process Your Personal Information, such as contact
                              information, photograph, address of delivery,
                              driving license or any other ID proof for
                              processing and completing Your purchase and
                              creation of Your User Account;{" "}
                            </li>
                            <li>
                              Processing Personal Information as indicated above
                              to process a return, if You are not happy with
                              Your vehicle, Process payments (or refunds as the
                              case may be) on Your behalf by using Your
                              financial information;
                            </li>
                            <li>
                              If You have opted for location-based features, We
                              may collect and process various location specific
                              information, in the form of Your favorite
                              locations, saved locations, pinned locations,
                              searched locations, etc., for providing various
                              location-based services, such as our stores,
                              charging stations, repair facilities and other
                              services relating to the products that are close
                              to Your location;{" "}
                            </li>
                            <li>
                              Processing Personal Information and vehicle
                              information for servicing and/or repair
                              activities;
                            </li>
                            <li>
                              To supply brochures and other material You have
                              specifically requested from Us;
                            </li>
                            <li>
                              Where You have opted in, to be contacted by Us or
                              by our authorized dealers or our recommended
                              third-party partners via email, text message, post
                              or telephone with marketing information about
                              their products and services (see Marketing section
                              below for further details); and
                            </li>
                            <li>
                              Complete and perform other processing activities
                              that You have expressly requested Us to complete
                              or You have expressly agreed to Us performing, as
                              the case may be. In such cases, We will again be
                              taking Your consent for such requested processing
                              activities.
                            </li>
                          </ol>
                          Your data is Yours - if You wish to withdraw Your
                          consent at any time, You can let Us know at
                          info@ultraviolette.com. Certain operations, such as
                          processing Your vehicle purchase and ensuring that You
                          are able to access various features of the Platform,
                          we would require certain Personal Information which is
                          essential for completion of such operations. If You
                          choose to withdraw Your consent, We may not be able to
                          provide You with any or all of our services.
                        </li>
                        <br />
                        <li>
                          To perform a Contract with You
                          <br /> We may use and process Your Personal
                          Information where it is necessary for the performance
                          of a contract with You or in order to take steps at
                          Your request before entering into a contract with You.
                        </li>
                        <br />
                        <li>
                          Where it is in Your Vital Interest in emergent
                          situations <br />
                          We may use Your personal information to reach to You
                          if there are any urgent safety or product recall
                          notices to communicate to You to ensure Your safety.
                          We may also use the contact information of Your
                          ‘Emergency Contact’ in the event of an incident, or
                          where We otherwise reasonably believe that the
                          processing of Your Personal Information will prevent
                          or reduce any potential harm to You or others.
                          Similarly, we will process your Personal Information
                          such as name, contact number, account login
                          credentials and password when attempts to login to
                          your account with a wrong password exceeds the
                          permitted number, in order to verify your identity and
                          help you recover your account.
                        </li>
                        <br />
                        <li>
                          Where there is a Legitimate Interest or for other
                          Reasonable Purposes We may use and process Your
                          Personal Information where it is necessary for Us to
                          pursue our legitimate interests and for other
                          reasonable purposes as a business without compromising
                          Your privacy for the following purposes:
                          <ol
                            className={
                              "mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"
                            }
                            style={{ listStyleType: "lower-roman" }}
                          >
                            <li>
                              For analysis which will aid our marketing strategy
                              or market research;
                            </li>
                            <li>
                              To improve, enhance and personalize Your customer
                              or visitor experience;
                            </li>
                            <li>
                              To manage and maintain the Application, and for
                              internal practices, including troubleshooting,
                              testing for security, statistical purposes, and
                              for prevention of any misuse or fraud;
                            </li>
                            <li>For network and information security;</li>
                            <li>
                              For marketing activities (other than where we rely
                              on Your consent), e.g., to tailor marketing
                              communications or send targeted marketing messages
                              via social media and other third-party platforms;
                              and if You have asked Us not to contact You for
                              marketing purposes, you are free to update with us
                              for ‘do not disturb’ mode; and{" "}
                            </li>
                          </ol>
                        </li>
                        <li>
                          For Compliance with Existing or Applicable Laws <br />{" "}
                          Wherever the law mandates Us to process certain data
                          for compliance or other legal purposes, We will have
                          to collect Your Personal Information to abide by it.
                          This may include information like collecting your age
                          proof or driving license before You are permitted to
                          have a test drive.
                        </li>
                        <br />
                        <li>
                          Third party Applications/Links: Through the use of the
                          Application, You may access certain third party
                          applications, links and other services linked with the
                          vehicle but provided by a third party, which may, for
                          example, require transmission of location data and
                          other Vehicle-recorded data to such third party. We
                          are not responsible for the collection or use of
                          Personal Data in such applications or services
                          provided by a third-party and recommend that You
                          carefully review applicable terms for (and any
                          integrity policy related to) such applications or
                          services before You use them. If You have questions
                          concerning a certain third party&apos;s use of Your
                          Personal Data, please contact the third party
                          directly.
                        </li>
                        <br />
                        <li>
                          Sharing/Transfer of Personal Data <br /> We shall
                          exercise reasonable care to keep Your information
                          confidential to the maximum possible extent. We may
                          limit disclosure of the user information to our
                          entities, joint ventures, agents, sellers or third
                          parties for the purposes of the services provided
                          herein or for any other marketing related activity
                          undertaken by or on behalf of our entities and/or its
                          joint ventures on a need-to-know basis.
                          <br /> <br />
                          As You are aware, We might share Your Personal
                          Information with our partners/third party service
                          providers in order to improve our service. We make
                          sure that they are as committed as We are to
                          protecting Your Data and Information.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"International transfers "}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  We may transfer your Personal Data to recipients in countries
                  outside India that may have differing data protection laws. In
                  those instances, We will ensure that appropriate safeguards
                  are in place for that transfer and storage as required by
                  applicable law. We will ensure there is a legal ground for the
                  transfer in accordance with applicable data protection
                  legislation. You will also be informed about the legal ground,
                  what safeguards were implemented, and where You can obtain a
                  copy of information on these safeguards. <br /> <br />
                  In case of Sensitive Personal Data, We will specifically seek
                  Your consent before such transfers to other countries, and
                  will also ensure that the conditions as required under law
                  (including but not limited to the Indian Data Protection Laws)
                  for such international transfer of sensitive data, such as
                  adequate level of protection to your Sensitive Personal Data,
                  are complied with.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Retention"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  We will only retain your Personal Data for as long as it is
                  necessary to fulfill the purposes outlined in this Policy or
                  the purposes of which You have otherwise been informed. This
                  means that when You have consented to our processing of Your
                  Personal Data, We will retain the data for as long as the
                  customer relationship lasts (and, where applicable, until the
                  expiry of the warranty period) or until You withdraw Your
                  consent. If You have revoked Your consent, We may nevertheless
                  retain certain Personal Data for the period required in order
                  for Us to meet our legal obligations and defend ourselves in
                  legal disputes. We will redact or delete Your Sensitive
                  Personal Data if you withdraw your consent, unless required to
                  be retained by applicable law. If We have not received Your
                  consent for Processing, the Personal Data will only be
                  retained to the extent We are permitted to do so by law.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Your Rights"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  If you live anywhere in India, the law has various rights
                  bestowed on You in relation to Your Personal Data. We will
                  have to confirm Your identity, wherever applicable, to ensure
                  that Your rights are being exercised appropriately. To
                  exercise these rights You will have to write to Us at
                  info@ultraviolette.com. <br /> <br /> Except in exceptional
                  circumstances, We will respond to Your request within 24 hours
                  during working hours (twenty-four hours) stating that when it
                  will be completed from the date We receive your email. We may
                  charge a minor sum to comply with your exercise of these
                  rights to aid the cost We incur for this compliance. You will
                  be informed of these charges once You write to us. Please be
                  informed that You have the following rights under applicable
                  laws in your country.
                  <br />
                  <br />
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>
                      Accessing Your Personal Information <br />
                      You have the right to access a copy Your Personal
                      Information that We hold in a standard form that will be
                      easy and understandable. In rare occasions We may not
                      provide You with a copy of Your information in which case
                      We will convey You this message with appropriate reasons.
                      Generally, We can only deny You Your right of access if it
                      concerns the right of other individuals or We have another
                      lawful reason to withhold that information and not
                      otherwise. You also have the right to access in one place
                      the identities of the data fiduciaries with whom Your
                      Personal Data has been shared by Us together with the
                      categories of Personal Data shared with them
                    </li>
                    <br />
                    <li>
                      Verify and rectify
                      <br /> Accuracy is an important principle of data
                      protection and You have the right to verify Your
                      Information with Us and ask Us to rectify it if it is
                      inaccurate.
                    </li>
                    <br />
                    <li>
                      Withdrawing Your consent <br /> You can always withdraw
                      Your consent You have given Us. We will be bound to stop
                      collecting or processing Your data We collect from You
                      solely on the basis of Your consent. For instance, there
                      are certain data points for which We take Your explicit
                      consent like GPS tracking. You can withdraw from GPS
                      tracking anytime by using the Application. However, We
                      will accordingly be unable to offer You other services
                      that are dependent on GPS tracking like navigation.
                      <br />
                      Also, we are legally permitted to continue collecting or
                      processing Your Personal Data if we can rely on grounds
                      other than consent to process Your Information.
                    </li>
                    <br />
                    <li>
                      Erasing Your Personal Information <br /> You have the
                      right to get Your Information erased from our systems, as
                      per processes prescribed under applicable laws. Unless
                      there is a reason that the law allows Us to use Your
                      Personal Information for longer, We will make reasonable
                      efforts to comply with Your request.
                    </li>
                    <br />
                    <li>
                      Your right to port Your Information <br /> You have the
                      right to ask for a copy of information that We collect
                      from You in a structured data file. We will provide this
                      to You electronically in a structured, commonly used and
                      machine-readable form.
                    </li>
                    <br />
                    <li>
                      Your right to be forgotten <br />
                      You may also ask Us to restrict or prevent processing Your
                      Personal Information in the following situations:
                      <ul
                        className={"mb-4 mt-2 list-disc ml-6 lg:ml-7 space-y-1"}
                      >
                        <li>
                          where You believe it is unlawful for Us to do so,
                        </li>
                        <li>
                          You have objected to its use or withdrawn Your consent
                          and our assessment is pending or
                        </li>
                        <li>Where Your data has served the purpose </li>
                      </ul>
                      In these situations, We may only process Your Personal
                      Information whilst its processing is restricted if We have
                      Your consent or are legally permitted to do so, for
                      example for storage purposes, to protect the rights of
                      another individual or company or in connection with legal
                      proceedings.
                    </li>
                  </ol>
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Data Breach:"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  In case of breach of security leading to the accidental or
                  unlawful destruction, loss, alteration, unauthorized
                  disclosure of, or access to, Information transmitted, stored
                  or otherwise processed, We will promptly notify You within the
                  time frame prescribed, as per applicable laws. However, We
                  will not be liable for any security breach committed as a
                  result of negligence by action or omission by You including,
                  but not limited to, setting up of a weak passcode for Your
                  account.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Security:"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  We strive to work towards the security, integrity and privacy
                  of Your Information and to protect Your Information against
                  unauthorized disclosure, access or destruction to the extent
                  reasonably possible by Us as per processes compliant with the
                  applicable laws. <br /> <br /> Notwithstanding anything
                  contained in this Policy or elsewhere, We shall not be held
                  responsible for any loss, damage or misuse of Your
                  Information, if such loss, damage or misuse takes place as a
                  result of a Force Majeure Event (as defined below). <br />{" "}
                  <br /> A &quot;Force Majeure Event&quot; shall mean any event
                  that is beyond our reasonable control and shall include,
                  without limitation, fire, flood, explosion, acts of God, civil
                  commotion, strikes, insurrection, war, epidemic, pandemic,
                  acts of government, computer hacking, software failure and
                  storage device, computer crashes etc.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Phishing:"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  Identity theft and the fraudulent practice currently known as
                  &quot;phishing&quot; are of great concern to Us. Phishing is
                  an attempt to acquire personal/sensitive information which the
                  legitimate organization already has. Safeguarding information
                  to help protect You from identity theft is a top priority. We
                  do not and will not, at any time, request Your credit card
                  information or national identification numbers in a non-secure
                  or unsolicited e-mail or telephone communication. Please
                  exercise caution while providing any such information.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={
                    "Non-Personal Information Ultraviolette May Collect and Use"
                  }
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  <ol
                    className={"mb-4 mt-2 list-decimal ml-6 lg:ml-7 space-y-1"}
                  >
                    <li>
                      <b>Non-Personal Information Ultraviolette may collect</b>
                      <br />
                      Once you visit the Ultraviolette Platform or act on a
                      Ultraviolette email, Ultraviolette or Ultraviolette’s
                      strategic partners may use some technologies to collect
                      “Non-Personal Information” about your usage of or activity
                      on the Platform that cannot, on its own, identify or allow
                      direct association with a specific individual.
                      Non-Personal Information may include, without limitation,
                      information collected by or through web beacons or
                      cookies. <br /> <br />
                      For instance, web beacons are electronic images that we
                      use on the Site or in Ultraviolette email or on any other
                      Platform that Ultraviolette sends to you, for the purpose
                      of understanding your usage when you open or take any
                      action via the email.
                    </li>
                    <br />
                    <li>
                      <b>Non-Personal Information Ultraviolette may use</b>
                      <br />
                      Ultraviolette Privacy Policy does not limit our use or
                      disclosure of any Non-Personal Information in any way, and
                      we reserve the right to use and disclose Non-Personal
                      Information to our affiliates, subsidiaries, its strategic
                      partners or third parties at our discretion. For instance,
                      such Non-Personal Information may be used to better
                      understand your behavior, to realize which parts of the
                      Platform that visitors have visited, and to facilitate and
                      measure the effectiveness of advertisements and web
                      searches.
                    </li>
                  </ol>
                </RenderSection>
              </li>

              <li>
                <RenderSection
                  header={"Minor/Children"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  Ultraviolette is not intended for children under Eighteen (18)
                  years of age. Ultraviolette, its affiliates, subsidiaries or
                  its strategic partners do not knowingly or intentionally
                  collect, disclose, share, transfer any Personal Information
                  from children under the age of Eighteen (18) and you should
                  not, under any circumstance or for any reason, provide your
                  Personal Information if you are under the age of Eighteen
                  (18). If Ultraviolette becomes aware of any collection of any
                  Personal Information of a child under the age of Eighteen
                  (18), Ultraviolette will take steps to delete such Personal
                  Information
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Changes to Ultraviolette Privacy Policy"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  Ultraviolette may change the provisions of Ultraviolette
                  Privacy Policy at any time. If we change or update
                  Ultraviolette Privacy Policy, we will indicate that changes
                  have been made by updating the effective date of Ultraviolette
                  Privacy Policy. Ultraviolette encourages you to review
                  Ultraviolette Privacy Policy from time to time to make sure
                  you understand how any personal information you provide may be
                  used.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Ultraviolette may use cookies"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  We and our partners use tracking technologies such as cookies
                  on our Platform to personalize content and ads, to provide
                  social media features and to analyze our traffic. We also
                  share information about your use of our site with our social
                  media, advertising and analytics partners who may combine it
                  with other information that you have provided to them or that
                  they have collected from your use of their or other services.{" "}
                  <br /> <br /> We reserve the right to make changes to the
                  cookie statement at any time and for any reason. We will alert
                  you about any changes by updating the “Last Updated” date of
                  the cookie statement. Any changes will become effective
                  immediately upon posting the updated statement on our Platform
                  and you waive the right to receive specific notices of each
                  such change. You are encouraged to periodically review this
                  policy to stay informed of updates. <br /> <br /> You can
                  choose to accept or decline cookies. Most web browsers
                  automatically accept cookies, but you can usually modify your
                  browser settings to decline cookies if you prefer. Note that
                  disabling cookies might hinder the transacting of business on
                  the Platform.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Telematics data"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  You understand that the motorcycle will capture telematics
                  data that includes location, speed, idling, time, harsh
                  acceleration or breaking, battery charge and discharge
                  consumption, GPS, and driving behavior and data vehicle faults
                  etc. the said data will be managed as per this privacy policy.{" "}
                  <br /> <br /> The data is stored by the vehicle and may be
                  accessed, used and stored by our service technicians during
                  vehicle servicing or periodically transmitted to us wirelessly
                  through the vehicle’s telematics system. This data may be used
                  by us for various purposes, including, but not limited to:
                  providing you with telematics services; troubleshooting;
                  evaluation of your vehicle’s quality, functionality and
                  performance; analysis and research by Ultraviolette and its
                  partners for the improvement and design of our vehicles and
                  systems; to defend Ultraviolette; and as otherwise may be
                  required by law. In servicing your vehicle, Ultraviolette can
                  potentially resolve issues remotely simply by reviewing your
                  vehicle’s data log.
                </RenderSection>
              </li>
              <li>
                <RenderSection
                  header={"Contact"}
                  subHeader={""}
                  pExtraClass="pt-4"
                >
                  We welcome feedback if you have any questions regarding our
                  Privacy Policy or the use of your information, please send an
                  email to info@ultraviolette.com, or write to us at 529-530,
                  Intermediate Ring Road, Domlur, Bangalore 560071 Karnataka
                  India.
                </RenderSection>
              </li>
            </ol>
            <RenderSection header={""} subHeader={""} pExtraClass="pt-4">
              Copyright © 2015-2022 Ultraviolette Automotive Pvt Ltd. All rights
              reserved.
            </RenderSection>
          </div>
        }
      />

      <CommonFooter />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
      props: {
          country: country
      },
  };
}


export default PrivacyPolicy;
