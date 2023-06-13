"use client";

import { useAppContext } from "@/app/context/store";
import React from "react";
import { Document, Page } from "react-pdf";

export default function PdfViewer() {
  const { file } = useAppContext();

  return (
    <div>
      {file && (
        <div>
          <Document file={URL.createObjectURL(file)}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
}
