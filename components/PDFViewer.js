import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViwer({ file, blurMessage = "To view full content, please complete profile." }) {
  const [numPages, setNumPages] = useState(null);
  const [pageLimit, setPageLimit] = useState(null);
  const [winWidth, setWinWidth] = useState(1);
  const [overlayTop, setOverlayTop] = useState(0);
  const lastPageRef = useRef(null);
  const pdfViewerRef = useRef(null);
  const [pdfScale, setPdfScale] = useState(1);
  const isProfile = useSelector((state) => state.loginStatemodal.isProfile);
  const router = useRouter();
  function handleconnect(){
    router.push('/userdetails')
  }

  const Loader = () => (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = pdfViewerRef.current?.clientWidth || window.innerWidth;
      const containerHeight = pdfViewerRef.current?.clientHeight || window.innerHeight;
      const widthScale = containerWidth / 612; // 612 is standard PDF width
      const heightScale = containerHeight / 792; // 792 is standard PDF height
      const newScale = Math.min(widthScale, heightScale) * 0.95; // 0.95 to leave a small margin
      setPdfScale(newScale);
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setWinWidth(window?.innerWidth);
  }, []);

  var PdfScale = 1.5;
  if (winWidth) {
    PdfScale = 1.5 * (winWidth / 1920);
    if (PdfScale < 1) {
      PdfScale = 1;
    }
  }
  
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    setPageLimit(isProfile ? nextNumPages : Math.ceil(nextNumPages / 2));
  }

  useEffect(() => {
    if (lastPageRef.current) {
      const observer = new ResizeObserver(() => {
        const lastPageRect = lastPageRef.current.getBoundingClientRect();
        const viewerRect = pdfViewerRef.current.getBoundingClientRect();
        setOverlayTop(lastPageRect.bottom - viewerRect.top);
      });
      observer.observe(lastPageRef.current);
      return () => observer.disconnect();
    }
  }, [pageLimit]);

  return (
    <div className="pdf-viewer-wrapper" ref={pdfViewerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
        className="pdf-container"
        loading={<Loader />}
      >
        {Array.from({ length: pageLimit }, (_, i) => i + 1).map((idx) => (
          <div key={idx} ref={idx === pageLimit ? lastPageRef : null}>
            <Page
              pageNumber={idx}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              scale={pdfScale}
              loading={<Loader />}
            />
            <p className="pageNum">
              Page {idx} of {numPages}
            </p>
          </div>
        ))}
      </Document>
      {!isProfile && pageLimit && (
        <div className="gradient-overlay" style={{ top: `${overlayTop}px` }}>
          <div className="blur-message">
            <p>{blurMessage}</p>
            <button
                  type="button"
                  className="btn-cutom btn-con-cus"
                  style={{ border: "2px solid #FF7468" }}
                  onClick={handleconnect}
                >
                  Complete Profile{" "}
                  
                </button>
          </div>
        </div>
      )}
    </div>
  );
}