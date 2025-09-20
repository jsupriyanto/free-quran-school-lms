import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import ToDoLists from "@/components/Apps/ToDoLists";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle pageTitle="To Do" dashboardUrl={`/${lang}/`} dashboardText="Dashboard" />

      <ToDoLists />
    </>
  );
}
