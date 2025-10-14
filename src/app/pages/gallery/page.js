import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import GalleryContent from "@/components/Pages/Gallery/GalleryContent";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Gallery"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <GalleryContent />
    </>
  );
}
