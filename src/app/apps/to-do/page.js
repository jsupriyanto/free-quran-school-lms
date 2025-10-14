import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import ToDoLists from "@/components/Apps/ToDoLists";

export default function Page() {
  return (
    <>
      <PageTitle pageTitle="To Do" dashboardUrl={`/`} dashboardText="Dashboard" />

      <ToDoLists />
    </>
  );
}
