import React from "react";
import BasicAccordion from "@/components/UIElements/Accordion/BasicAccordion";
import ControlledAccordion from "@/components/UIElements/Accordion/ControlledAccordion";
import Customization from "@/components/UIElements/Accordion/Customization";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle pageTitle="FAQ" dashboardUrl={`/${lang}/`} dashboardText="Dashboard" />

      {/* BasicAccordion */}
      <BasicAccordion />

      {/* ControlledAccordion */}
      <ControlledAccordion />

      {/* Customization */}
      <Customization />
    </>
  );
}
