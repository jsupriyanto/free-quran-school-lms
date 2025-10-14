import NotificationTable from "@/components/Notification/NotificationTable";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Notification"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <NotificationTable />
    </>
  );
}
