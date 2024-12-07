import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import SupplierOnboardingForm from "./OnboardingForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyOnboard } from "./page.actiions";
import { redirect } from "next/navigation";

export default async function Page() {
  const onboarded = await verifyOnboard();

  if (onboarded) {
    return redirect("/dashboard");
  }

  return (
    <PageLayout className="max-w-[1000px] mx-auto" hideBreadcrums>
      <PageContent>
        <Card className="p-4 bg-card/30 max-sm:p-0 max-sm:border-0 max-sm:shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Onboarding
            </CardTitle>
            <CardDescription>
              Let&apos;s get your supplier profile set up in just a few easy
              steps.
            </CardDescription>
          </CardHeader>
          <SupplierOnboardingForm emailAddress="" />
        </Card>
      </PageContent>
    </PageLayout>
  );
}
