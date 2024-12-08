import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import { PageProps } from "@/lib/types";
import { notFound } from "next/navigation";
import React, { lazy, Suspense } from "react";
import {
  getApprovalMatrixFormData,
  getApprovalStepFormData,
  getApprovalWorkflowFormData,
} from "../../../page.actions";

const SLUGS = ["matrix", "workflow", "step"] as const;

const ApprovalStepFormLazy = lazy(
  () =>
    import("@/app/procurement/approvals/requisition/new/step/ApprovalStepForm")
);
const ApprovalWorkflowFormLazy = lazy(
  () =>
    import(
      "@/app/procurement/approvals/requisition/new/workflow/ApprovalWorkflowForm"
    )
);
const ApprovalMatrixFormLazy = lazy(
  () =>
    import(
      "@/app/procurement/approvals/requisition/new/matrix/ApprovalMatrixForm"
    )
);

export default async function page(props: PageProps) {
  const { id, slug: _s } = await props.params;
  const slug = _s?.toLowerCase() as unknown as (typeof SLUGS)[number];

  if (!SLUGS.includes(slug)) {
    return notFound();
  }
  const objectId: string = id!;

  type PageData =
    | {
        slug: "step";
        data: Awaited<ReturnType<typeof getApprovalStepFormData>>;
      }
    | {
        slug: "workflow";
        data: Awaited<ReturnType<typeof getApprovalWorkflowFormData>>;
      }
    | {
        slug: "matrix";
        data: Awaited<ReturnType<typeof getApprovalMatrixFormData>>;
      };

  let response: PageData | undefined;

  try {
    switch (slug) {
      case "matrix":
        response = {
          slug: "matrix",
          data: await getApprovalMatrixFormData(objectId),
        };
        break;
      case "workflow":
        response = {
          slug: "workflow",
          data: await getApprovalWorkflowFormData(objectId),
        };
        break;
      case "step":
        response = {
          slug: "step",
          data: await getApprovalStepFormData(objectId),
        };
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return notFound();
  }

  if (!response) return getApprovalStepFormData;

  return (
    <PageLayout>
      <PageContent className="!mt-0 !pt-0">
        <Suspense>
          {response.slug === "step" && (
            <ApprovalStepFormLazy
              defaultValues={response.data}
              approvalStepId={objectId}
            />
          )}
          {response.slug === "workflow" && (
            <ApprovalWorkflowFormLazy
              defaultValues={response.data}
              workflowId={objectId}
            />
          )}
          {response.slug === "matrix" && (
            <ApprovalMatrixFormLazy
              defaultValues={response.data}
              matrixId={objectId}
            />
          )}
        </Suspense>
      </PageContent>
    </PageLayout>
  );
}
