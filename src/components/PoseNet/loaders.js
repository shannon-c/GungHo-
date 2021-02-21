import { useState, useEffect } from "react"
import * as posenet from "@tensorflow-models/posenet"
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";

export function useLoadPoseNet(modelConfig = {}) {
  const [net, setNet] = useState(null);

  useEffect(() => {
    async function setupPoseNet() {
      return await posenet.load(modelConfig);
    }

    setupPoseNet().then(poseNet => {
      setNet(poseNet);
    })
  }, [])

  return net;
}

export function useLoadVideo({
  videoRef,
  videoWidth,
  videoHeight,
  setStream
}) {
  const [video, setVideo] = useState();
  
  useEffect(() => {
    async function setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
      }
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
          facingMode: 'user',
          width: videoWidth,
          height: videoHeight,
        },
      });
      videoRef.current.srcObject = stream;
      
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
      });
      
    }

    setupCamera().then(video => {
      video.play();
      setVideo(videoRef.current);
      setStream(videoRef.current.srcObject);
    });

    return () => {}
      
  }, [videoRef]);

  return video;
}