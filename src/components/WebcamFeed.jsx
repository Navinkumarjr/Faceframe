import React, { useRef, useState , useEffect} from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
function WebCam()
{
const webcamRef = useRef(null)
const canvasRef = useRef(null)
const [CurrentEmotion,setCurrentEmotion] = useState('Detecting....')
const videoConstraints ={
    width:720,
    height:560,
    facingMode:"user"
}
useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Place models in public/models folder
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

useEffect(() => {
    const interval = setInterval(async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, {
          width: video.videoWidth,
          height: video.videoHeight,
        });

        const resized = faceapi.resizeResults(detections, {
          width: video.videoWidth,
          height: video.videoHeight,
        });
        if (detections[0] && detections[0].expressions) {
          const expressions = detections[0].expressions;
          const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          setCurrentEmotion(sorted[0][0]); // Highest confidence expression
        }

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);

        
      }
    }, 100); // Run every 100ms

    return () => clearInterval(interval);
  }, []);
return(
<>

<nav class="navbar navbar-expand-lg fixed-top navbar-scroll">
    <div class="container">
      <h1>FaceFrame</h1>
      <button class="navbar-toggler ps-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarExample01"
  aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="https://www.linkedin.com/in/naveenkumarj2005/"><i class="bi bi-linkedin"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="https://github.com/Navinkumarjr/"><i class="bi bi-github"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="https://www.instagram.com/naveen_jr.7/"><i class="bi bi-instagram"></i></a>
          </li>
        </ul>

        <ul class="navbar-nav flex-row">
          <li class="nav-item">
            <a class="nav-link px-2" href="#!">
              <i class="fab fa-facebook-square"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-2" href="#!">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ps-2" href="#!">
              <i class="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div className="d-flex justify-content-center align-items-center webcam-section row container-fluid">
<div className="webcam-wrapper">
<div className="position-relative" style={{width:'auto'}}>
    <Webcam audio={false}
    height={560}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    width={720}
    videoConstraints={videoConstraints}
    style={{border:"2px solid #000",borderRadius:"12px"}}
    className="rounded shadow text-center webcam"
    />
    <canvas
        ref={canvasRef}
        width={720}
        height={560}
        style={{ position: 'absolute', zIndex: 2 }}
        id="Appcanvas"
        className="position-absolute top-3 start-0"
      />
      <br />
      <h5 className="text-dark">Current Emotion: <strong>{CurrentEmotion}</strong></h5>
      </div>
</div>
</div>
</>

);
}
export default WebCam;