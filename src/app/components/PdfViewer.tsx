"use client";

import { useAppContext } from "@/app/context/store";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer(props: any) {
  const { file } = useAppContext();

  if (!file) {
    return <div>ファイルが読み込まれていません</div>;
  } else {
    return (
      <Document
        className={styles.pdf_document}
        file={file}
        onLoadSuccess={props.onDocumentLoadSuccess}
      >
        <Page className={styles.pdf_page} pageNumber={props.pageNum} />
      </Document>
    );
  }
}
