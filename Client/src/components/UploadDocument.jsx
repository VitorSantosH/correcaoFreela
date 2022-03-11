import React from "react";
import { isMobile } from "react-device-detect";

function UploadDocument({ imgSrc, handleCaptureImage, toggle }) {
  const handleImageUpload = e => {
    const { files } = e.target;
    handleCaptureImage(files[0], files[0].name);
    console.log(isMobile)
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <>
          {imgSrc != "" ? (
            <div class="image-holder main-image">
              <figure>
                <img
                  src={imgSrc}
                  alt="Captured Image"
                  style={{ width: "300px", height: "200px" }}
                />
              </figure>
              <button className="btn" onClick={() => toggle()}>
                Capturar novamente
              </button>
            </div>
          ) : (
            <div class="image-holder main-image d-flex justify-content-center align-items-center">
              <figure>
                <img src="images/camera-icon.svg" alt="Camera Image" />
              </figure>
              <button className="btn" onClick={() => toggle()}>
                Toque para tirar uma foto
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="file-wrapper">
          <label>
            <img src="images/file-icon.svg" />
            <input
              type="file"
              name="file"
              size="60"
              accept="image/jpeg,image/png,application/pdf"
              onChange={handleImageUpload}
            />
            <div className="inner-text">
              <p>
                <span className="d-md-block d-none">
                  {imgSrc || "Clique para enviar seu arquivo"}
                </span>
                <span className="d-md-none">Toque para enviar seu arquivo</span>
              </p>
            </div>
          </label>
        </div>
      )}
    </React.Fragment>
  );
}

export default UploadDocument;
