import React from "react"; 
import BasicTable from "@/components/UIElements/Table/BasicTable";
import RecentOrders from "@/components/Dashboard/eCommerce/RecentOrders";
import TeamMembersList from "@/components/Dashboard/eCommerce/TeamMembersList";
import BrowserUsedTrafficReports from "@/components/Dashboard/Analytics/BrowserUsedTrafficReports";
import MyTasks from "@/components/Dashboard/ProjectManagement/MyTasks";
import AllProjects from "@/components/Dashboard/ProjectManagement/AllProjects";
import DataTable from "@/components/UIElements/Table/DataTable";
import DenseTable from "@/components/UIElements/Table/DenseTable";
import SortingSelectingTable from "@/components/UIElements/Table/SortingSelectingTable";
import CustomizationTable from "@/components/UIElements/Table/CustomizationTable";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle pageTitle="Table" dashboardUrl={`/${lang}/`} dashboardText="Dashboard" />

      {/* BasicTable */}
      <BasicTable />

      {/* RecentOrders */}
      <RecentOrders />

      {/* TeamMembersList */}
      <TeamMembersList />

      {/* BrowserUsedTrafficReports */}
      <BrowserUsedTrafficReports />

      {/* MyTasks */}
      <MyTasks />

      {/* AllProjects */}
      <AllProjects />

      {/* DataTable */}
      <DataTable />

      {/* DenseTable */}
      <DenseTable />

      {/* SortingSelectingTable */}
      <SortingSelectingTable />

      {/* CustomizationTable */}
      <CustomizationTable />
    </>
  );
}
