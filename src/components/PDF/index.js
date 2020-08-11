import React, { Component } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const PDF = ({ src }) => (
  <div>
    <Document file={src}>
      <Page pageNumber={1} />
      <Page pageNumber={2} />
    </Document>
  </div>
);

export default PDF;
