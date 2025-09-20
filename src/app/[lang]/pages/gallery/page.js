import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import GalleryContent from "@/components/Pages/Gallery/GalleryContent";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Gallery"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <GalleryContent />
    </>
  );
}
