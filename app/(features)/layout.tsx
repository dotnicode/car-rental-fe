import Header from "@/components/shared/header";

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto container">
      <Header />
      {children}
    </div>
  );
}
