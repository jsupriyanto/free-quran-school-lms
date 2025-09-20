import React from "react";
import BasicTooltip from "@/components/UIElements/Tooltip/BasicTooltip";
import PositionedTooltips from "@/components/UIElements/Tooltip/PositionedTooltips";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Tooltip"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      /> 
      {/* BasicTooltip */}
      <BasicTooltip />

      {/* PositionedTooltips */}
      <PositionedTooltips />
    </>
  );
}
