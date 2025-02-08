import Header from "@/components/shared/header";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen container">
      <Header />
      {children}
    </div>
  );
}
