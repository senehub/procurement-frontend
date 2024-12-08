"use client";
import React from "react";
import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import Animated404 from "@/components/ui/404-animate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Resource404() {
  return (
    <PageLayout hideBreadcrums>
      <PageContent className="!mt-0 flex flex-col items-center justify-center h-[70svh]">
        <div className="h-[20svh]">
          <Animated404 loop autoPlay />
        </div>
        <p className="text-xl pb-3 text-muted-foreground">Page not found</p>
        <div className="pt-5  flex items-center justify-center">
          <Button
            asChild
            size="lg"
            onClick={() => window.history.back()}
            className="text-lg rounded max-w-[300px] w-ful"
          >
            <Link prefetch href="/dashboard">
              Go Home
            </Link>
          </Button>
        </div>
      </PageContent>
    </PageLayout>
  );
}
