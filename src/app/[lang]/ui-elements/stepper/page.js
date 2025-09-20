import React from "react";
import Grid from "@mui/material/Grid";
import HorizontalStepper from "@/components/UIElements/Stepper/HorizontalStepper";
import NonLinear from "@/components/UIElements/Stepper/NonLinear";
import AlternativeLabel from "@/components/UIElements/Stepper/AlternativeLabel";
import ErrorStep from "@/components/UIElements/Stepper/ErrorStep";
import CustomizedHorizontalStepper from "@/components/UIElements/Stepper/CustomizedHorizontalStepper";
import VerticalStepper from "@/components/UIElements/Stepper/VerticalStepper";
import MobileStepperText from "@/components/UIElements/Stepper/MobileStepperText";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Stepper"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* HorizontalStepper */}
          <HorizontalStepper />

          {/* AlternativeLabel */}
          <AlternativeLabel />

          {/* CustomizedHorizontalStepper */}
          <CustomizedHorizontalStepper />

          {/* MobileStepper */}
          <MobileStepperText />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* NonLinear */}
          <NonLinear />

          {/* ErrorStep */}
          <ErrorStep />

          {/* VerticalStepper */}
          <VerticalStepper />
        </Grid>
      </Grid>
    </>
  );
}
