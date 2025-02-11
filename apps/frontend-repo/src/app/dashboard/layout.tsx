import DashboardTemplate from "@/components/templates/dashboard-template";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
