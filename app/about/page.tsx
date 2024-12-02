import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHeader heading="About E-Procurement" />
      <PageContent>
        <p className="mb-4 max-w-[70ch] text-lg leading-relaxed">
          Our E-Procurement platform is designed to streamline the procurement
          process for businesses of all sizes. We offer a comprehensive suite of
          tools to manage vendors, contracts, and procurement activities
          efficiently.
        </p>
        <p className="mb-4 max-w-[70ch] text-lg leading-relaxed">
          With our platform, you can easily manage requisitions, automate
          approval processes, and gain valuable insights into your procurement
          activities.
        </p>
      </PageContent>
    </PageLayout>
  );
}
