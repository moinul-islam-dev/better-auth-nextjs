import DashboardClientPage from "./dashboard-client";

export default async function DashboardPage() {

  // const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });
  
  //   if( !session ) {
  //     redirect("/auth");
  //   }

  return <DashboardClientPage />;
}
