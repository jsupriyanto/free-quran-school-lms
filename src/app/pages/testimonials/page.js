import React from "react";
import TestimonialsOne from "@/components/Pages/Testimonials/TestimonialsOne";
import TestimonialsTwo from "@/components/Pages/Testimonials/TestimonialsTwo";
import TestimonialsThree from "@/components/Pages/Testimonials/TestimonialsThree";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Testimonials"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <TestimonialsOne />

      <TestimonialsTwo />

      <TestimonialsThree />
    </>
  );
}
