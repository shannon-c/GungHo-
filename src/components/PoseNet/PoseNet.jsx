import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types";
import { useLoadVideo, useLoadPoseNet } from "./loaders"
import { drawKeypoints, drawSkeleton } from "./util"
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import posesImages from '../../data/posesImages';

const useStyles = makeStyles(theme => ({
  videoContainer: {
    overflow: 'hidden',
    borderRadius: "0 20px 20px 0",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  video: {
    display: 'none'
  },
  canvas: {
    width: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function PoseNet({
  videoWidth,
  videoHeight,
  minPoseConfidence,
  minPartConfidence,
  modelConfig,
  setStream,
  estimatePose,
  pose
}) {
  const classes = useStyles();

  const imageRef = useRef();
  const imagePoseRef = useRef()
  const [currentPose, setCurrentPose] = useState(posesImages[pose]);

  const videoRef = useRef();
  const canvasRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);

  const net = useLoadPoseNet(modelConfig)
  const video = useLoadVideo({
    videoWidth,
    videoHeight,
    videoRef,
    setStream
  })

  useEffect(() => {
    setCurrentPose(posesImages[pose])
  }, [pose])

  useEffect(() => {
    if (!net || !video) return () => {}
    if ([net, video].some(elem => elem instanceof Error)) return () => {}

    async function estimateImage() {
      imagePoseRef.current = await net.estimateSinglePose(imageRef.current, {
        flipHorizontal: true,
        decodingMethod: 'single-person'
      });
    }
    estimateImage();
  }, [currentPose, net, video]);

  useEffect(() => {
    if (!net || !video) return () => {}
    if ([net, video].some(elem => elem instanceof Error)) return () => {}

    let reqAnimation;
    const ctx = canvasRef.current.getContext("2d");

    async function poseDetectionFrame() {
      try {
        let poses = [];

        // var start = window.performance.now();

        const pose = await net.estimateSinglePose(video, {
          flipHorizontal: true,
          decodingMethod: 'single-person'
        });
        estimatePose(pose, imagePoseRef.current);

        // var end = window.performance.now();
        // console.log(`Execution time for estimating: ${end - start} ms`);

        poses = poses.concat(pose);

        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();

        poses.forEach(({score, keypoints}) => {
          if (score >= minPoseConfidence) {
            drawKeypoints(keypoints, minPartConfidence, ctx);
            drawSkeleton(keypoints, minPartConfidence, ctx);
          }
        });
      } catch (err) {
        setErrorMessage(err.message)
      }

      reqAnimation = requestAnimationFrame(poseDetectionFrame);
    }

    poseDetectionFrame();

    return () => {
      cancelAnimationFrame(reqAnimation);
    }
  }, [net, video])

  return (
    <Box className={classes.videoContainer}>
      {
        (!net || !video) ? (
          <Box className={classes.loadingContainer}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box mb={1}>
                <CircularProgress />
              </Box>
              <Typography variant="h6">Loading..</Typography>
            </Box>
          </Box>
        ) : (null)
      }
      <font color="red">{errorMessage}</font>
      <video 
        className={classes.video} ref={videoRef}
        width={videoWidth} height={videoHeight}
        style={{display: "none"}}
      />
      <canvas
        className={classes.canvas} ref={canvasRef}
        width={videoWidth} height={videoHeight}
      />
      <img ref={imageRef} src={currentPose}
        width={videoWidth} height={videoHeight}
        style={{display: "none"}}
      />
    </Box>
  )
}

PoseNet.propTypes = {
  videoWidth: PropTypes.number,
  videoHeight: PropTypes.number,
  minPoseConfidence: PropTypes.number,
  minPartConfidence: PropTypes.number,
  modelConfig: PropTypes.object,
  setStream: PropTypes.func,
  estimatePose: PropTypes.func
}

PoseNet.defaultProps = {
  videoWidth: 600,
  videoHeight: 500,
  minPoseConfidence: 0.1,
  minPartConfidence: 0.5,
  modelConfig: {},
  setStream: () => {},
  estimatePose: () => {},
}