"use client";

import { useAppContext } from "@/app/context/store";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer(props: any) {
  const { file } = useAppContext();

  return (
    <div>
      {file && (
        <div>
          <Document file={file} onLoadSuccess={props.onDocumentLoadSuccess}>
            <Page pageNumber={props.pageNum} />
          </Document>
          <p>
            Page {props.pageNum} of {props.numPages}
          </p>
        </div>
      )}
    </div>
  );
}
