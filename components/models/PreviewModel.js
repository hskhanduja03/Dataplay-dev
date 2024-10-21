import Modal from "react-bootstrap/Modal"
import React,  {useEffect, useState}from"react"
import ReactPlayer from "react-player"
import dynamic from "next/dynamic"

const PDFViewer = dynamic(() => import("../PDFViewer"), {
  ssr: false,
})

export default function FilePreviewModel({ open, onHide, file, type }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setScale(window.innerWidth / 768); // Adjust this ratio as needed
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Modal
      className="preview-modal course-view-model"
      centered
      show={open}
      style={{ height: "100%", width: "100%" }}
    >
      <button className="modal-close-btn" onClick={onHide}></button>
      <Modal.Body className="file-preview-modal-body">
        {type == "video" ? (
          <ReactPlayer
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            className="course-player"
            controls
            playing
            url={file}
            width="100%"
            height="100%"
          />
        ) : type == "image" ? (
          <>
            <div className="preview-wrap-img">
              <img src={file} />
            </div>
          </>
        ) : type == "pdf" ? (
          <PDFViewer file={file}
          blurMessage="To view full content, please complete your profile."
           />
        ) : type == "office" ? (
          <>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${file}`}
              width="100%"
              height="100%"
              frameBorder="0"
              Toolbars={false}
            ></iframe>
            <div className="office-viewer-layer"></div>
          </>
        ) : (
          <>
            <p>File Type not supported</p>
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}
