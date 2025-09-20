import NotificationTable from "@/components/Notification/NotificationTable";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Notification"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <NotificationTable />
    </>
  );
}
