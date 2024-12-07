import { Metadata } from "next";
import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import ClerkSignUp from "./SignUp";

export const metadata: Metadata = {
  title: "Vendor Signup",
  description: "Create a new vendor account for the E-Procurement platform",
};

export default function VendorSignupPage() {
  return (
    <PageLayout hideBreadcrums>
      <PageContent>
        <div className="max-w-[900px] mx-auto mt-[5svh]">
          <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center h-max">
              <h2 className="text-2xl font-semibold mb-4">Vendor Signup</h2>
              <p className="mb-6 to-muted-foreground leading-relaxed max-sm:text-sm max-w-[60ch]">
                This form is specifically designed for vendor registration
                purposes. If you are a staff member, please reach out to your
                administrator for access to the platform.
              </p>
            </div>
            <div className="">
              <ClerkSignUp />
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
