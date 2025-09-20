import React from "react";
import TestimonialsOne from "@/components/Pages/Testimonials/TestimonialsOne";
import TestimonialsTwo from "@/components/Pages/Testimonials/TestimonialsTwo";
import TestimonialsThree from "@/components/Pages/Testimonials/TestimonialsThree";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Testimonials"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <TestimonialsOne />

      <TestimonialsTwo />

      <TestimonialsThree />
    </>
  );
}
