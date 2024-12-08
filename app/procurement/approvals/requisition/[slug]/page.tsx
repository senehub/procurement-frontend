import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { PageProps } from "@/lib/types";

export default async function page(props: PageProps) {
  const { slug, id } = await props.params;
  return (
    <PageLayout>
      <PageHeader
        heading={`${slug?.[0].toUpperCase()}${slug?.slice(
          1
        )} | Approval Detail`}
      />
    </PageLayout>
  );
}
