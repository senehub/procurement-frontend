import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { PageProps } from "@/lib/types";

export default async function page(props: PageProps) {
  return (
    <PageLayout>
      <PageHeader
        heading={`${props.params.slug[0].toUpperCase()}${props.params.slug.slice(
          1
        )} | Approval Detail`}
      />

      <PageContent>
        <h3 className="text-xl text-muted-foreground mb-5">
          ID: {props.params.id}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground max-w-[70ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quaerat
          illum nam, vitae nihil blanditiis unde fugiat deserunt ea impedit.
          Officia sapiente at excepturi, dignissimos illo, assumenda eos vitae
          ex cupiditate obcaecati aspernatur harum in ad, distinctio autem?
          Molestiae nihil libero hic amet excepturi cum, fugit vitae cupiditate
          reiciendis ipsa ducimus similique rerum, earum repellat, commodi
          minus. Culpa earum, nemo, ipsam sunt quaerat repudiandae nobis eos
          consequuntur velit ratione dolor possimus dignissimos doloribus itaque
          ex autem tempore quod atque qui nulla modi. Enim architecto, quidem
          sit nobis tenetur eos laboriosam facere earum reiciendis consequuntur?
          Modi animi suscipit corrupti necessitatibus magni!
        </p>
      </PageContent>
    </PageLayout>
  );
}
