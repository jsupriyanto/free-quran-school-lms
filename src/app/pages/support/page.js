import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import SupportForm from "@/components/Pages/Support/SupportForm";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Support"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      {/* SupportForm */}
      <SupportForm />
    </>
  );
}
