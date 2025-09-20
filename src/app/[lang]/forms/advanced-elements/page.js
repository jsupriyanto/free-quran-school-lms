import React from "react";
import Grid from "@mui/material/Grid";
import DefaultSelect from "@/components/Forms/AdvancedElements/DefaultSelect";
import MultiSelect from "@/components/Forms/AdvancedElements/MultiSelect";
import MultipleSelectChip from "@/components/Forms/AdvancedElements/MultipleSelectChip";
import CountrySelect from "@/components/Forms/AdvancedElements/CountrySelect";
import BasicDatePicker from "@/components/Forms/AdvancedElements/BasicDatePicker";
import BasicTimePicker from "@/components/Forms/AdvancedElements/BasicTimePicker";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Advanced Elements"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          {/* DefaultSelect */}
          <DefaultSelect />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          {/* MultiSelect */}
          <MultiSelect />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          {/* MultipleSelectChip */}
          <MultipleSelectChip />
        </Grid>
      </Grid>

      {/* CountrySelect */}
      <CountrySelect />

      {/* BasicTimePicker */}
      <BasicTimePicker />

      {/* BasicDatePicker */}
      <BasicDatePicker />
    </>
  );
}
