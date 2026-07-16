import { redirect } from "next/navigation";

export default function HagelschadenRedirect() {
  redirect("/hagelschadenzentrum");
}

export const metadata = {
  title: "Hagelschadenzentrum Reutlingen",
  alternates: { canonical: "https://autoklinik-reutlingen.de/hagelschadenzentrum" },
};
