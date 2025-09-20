import React from "react";
import EditorArea from "@/components/Forms/EditorArea";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Editors"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <EditorArea />
    </>
  );
}
