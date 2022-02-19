import React, { useCallback, useMemo } from "react";
import ImageCapture from "react-image-data-capture";
// import { FACING_MODES } from "react-html5-camera-photo";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

function ImageCapturer({ toggle, handleCaptureImage }) {
  const onCapture = imageData => {
    handleCaptureImage(imageData.file, imageData.webP);
    toggle();
  };

  const onError = useCallback(error => {
    console.log(error);
  }, []);
  const config = useMemo(() => ({ video: { facingMode: "environment" } }), []);

  // const dataURItoBlob = dataURI => {
  //   var byteString = atob(dataURI.split(",")[1]);

  //   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  //   var ab = new ArrayBuffer(byteString.length);
  //   var ia = new Uint8Array(ab);
  //   for (var i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([ab], { type: mimeString });
  // };

  // const onCapture = dataUri => {
  //   const blob = dataURItoBlob(dataUri);
  //   handleCaptureImage(blob, dataUri);
  //   toggle();
  // };

  return (
    <React.Fragment>
      <ImageCapture
        onCapture={onCapture}
        onError={onError}
        width={window.innerWidth}
        userMediaConfig={config}
      />
      {/* <Camera
        onTakePhotoAnimationDone={onCapture}
        idealFacingMode="environment"
        isImageMirror={false}
        isFullscreen
        isMaxResolution
      /> */}
    </React.Fragment>
  );
}

export default ImageCapturer;
