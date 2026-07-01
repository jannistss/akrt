import AutoklinikNavbar from "@/components/autoklinik-navbar";
import AutoklinikFooter from "@/components/autoklinik-footer";

export default function KarriereLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoklinikNavbar />
      {children}
      <AutoklinikFooter />
    </>
  );
}
