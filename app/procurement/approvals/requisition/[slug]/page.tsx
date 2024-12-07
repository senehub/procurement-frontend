import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { PageProps } from "@/lib/types";

export default async function page(props: PageProps) {
  return (
    <PageLayout>
      <PageHeader
        heading={`${props.params.slug[0].toUpperCase()} ${props.params.slug.slice(
          1
        )} | Approval Detail`}
      />
    </PageLayout>
  );
}
