import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageProps } from "@/lib/types";
import React, { lazy, Suspense } from "react";

const LazyStep = lazy(() => import("./ListSteps"));
const LazyMatrixes = lazy(() => import("./ListMatrixes"));
const LazyWorkflows = lazy(() => import("./ListWorkflows"));

export default function page(props: PageProps) {
  return (
    <PageLayout>
      <PageContent className="!mt-0 !pt-0">
        <Tabs
          defaultValue={props.searchParams.tab || "matrixes"}
          className="w-full flex flex-col items-center justify-center"
        >
          <TabsList className="mx-auto">
            <TabsTrigger value="matrixes">Matrixes</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="matrixes" className="w-full mt-3">
            <Suspense>
              <LazyMatrixes />
            </Suspense>
          </TabsContent>
          <TabsContent value="workflows" className="w-full mt-3">
            <Suspense>
              <LazyWorkflows />
            </Suspense>
          </TabsContent>
          <TabsContent value="steps" className="w-full mt-3">
            <Suspense>
              <LazyStep />
            </Suspense>
          </TabsContent>
        </Tabs>
      </PageContent>
    </PageLayout>
  );
}
