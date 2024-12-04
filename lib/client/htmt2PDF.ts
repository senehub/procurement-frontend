"use client";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type Params = {
  target: HTMLElement;
  filename?: `${string}.pdf`;
  IgnoreElement: (element: Element) => boolean;
  onCallback: (error?: Error) => void;
};

export async function downloadHTMLAsPdf(params: Params) {
  try {
    const canvas = await html2canvas(params.target, {
      ignoreElements: params.IgnoreElement,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
      compress: true,
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, width / 0.2, height / 0.2);
    pdf.save(params.filename || `${Date.now()}.pdf`);
    params.onCallback();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return params.onCallback(error);
    }
    params.onCallback(new Error("Error! failed to downloadPdf"));
  }
}
