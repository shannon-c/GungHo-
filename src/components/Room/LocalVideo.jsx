import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid4 } from "uuid";
import { poseSimilarity } from './utils';
import io from "socket.io-client";
import Peer from 'peerjs';
import { PEER_HOST, PEER_PORT, SERVER_HOST } from '../../config';
import { 
  Box, 
  Grid, 
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import LeaderBoard from './LeaderBoard';
import ScoreProgress from './ScoreProgress';
import Pose from './Pose';
import PoseNet from '../PoseNet';
import posesImages from '../../data/posesImages';

const TIME_OUT = 10000

const useStyles = makeStyles(theme => ({
  leaderBoard: {
    width: '90%',
    boxShadow: '0px 10px 30px #DBD8EA80',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 100
  }, 
  menuButtonContainer: {
    width: 40, 
    height: 40, 
    overflow: 'hidden', 
    borderRadius: 10, 
    backgroundColor: "#fff"
  }
}));

const HEADER_HEIGHT = 80;

const initPeer = (localID) => (
  new Peer(localID, { host: PEER_HOST, port: PEER_PORT })
)

function LocalVideo(props) {
  const classes = useStyles();

  /* Local participant */
  const [localStream, setLocalStream] = useState();
  const localStreamDidMountRef = useRef(false);
  const [localID] = useState(uuid4());
  const { roomID, username } = props;

  /* Peer and socket */
  const peerDidMountRef = useRef(false);
  const [peer, setPeer] = useState();
  const [socket] = useState(io.connect(SERVER_HOST));

  /* Calls and connections */
  const [scores, setScores] = useState([]);
  const scoresRef = useRef([]);

  const [gameStarted, setGameStarted] = useState(false);
  const gameStartedRef = useRef(false);
  const [currentScore, setCurrentScore] = useState(0);
  const currentPointsRef = useRef(0)
  const [currentPoseKey, setCurrentPoseKey] = useState(() => Object.keys(posesImages)[0]);

  useEffect(() => {
    if (localStreamDidMountRef.current) {
      setPeer(initPeer(localID));
    } else {
      localStreamDidMountRef.current = true;
    }
  }, [localStream])

  useEffect(() => {
    if (peerDidMountRef.current) {
      // New user entred to the room
      peer.on('open', function () {
        const score = {
          id: peer.id,
          username: username,
          points: currentPointsRef.current
        }
        updateScores(score);
        socket.emit("join-room", roomID, peer.id);
        socket.on('user-connected', function(remoteID) {
          const conn = peer.connect(remoteID, {metadata: { username: username }});
          conn.on('data', handleReceivedMessage);
          conn.on('close', handleConnectionClosed);

          const call = peer.call(remoteID, localStream);
          call.on('stream', function(remoteStream) {
            props.updateVideos(remoteStream, call.peer);
          });
        });
        socket.on("game-started", function() {
          updateGameStarted(true);
        })
        socket.on("pose", function(posekey) {
          goNextPose(posekey)
        })
        socket.on("update-scores", function() {
          const id = peer.id
          const points = currentPointsRef.current
          updateScores({ id, points })
          socket.emit("myscore", id, points)
        })
        socket.on("remotescore", function(id, points) {
          console.log(id, points)
          updateScores({ id, points })
        })
        socket.on("gameover", function() {
          props.endGame(scoresRef.current);
        })
      });

      // Incoming calls for the new users
      peer.on('call', function(call) {
        const conn = peer.connect(call.peer, {metadata: { username: username }});
        conn.on('data', handleReceivedMessage);
        conn.on('close', function() {
          handleConnectionClosed(conn.peer)
        });

        call.answer(localStream);
        call.on('stream', function(remoteStream) {
          props.updateVideos(remoteStream, call.peer);
        });
      });

      // Peer is connected
      peer.on('connection', function(conn) {
        conn.on('data', handleReceivedMessage);
        conn.on('close', function() {
          handleConnectionClosed(conn.peer)
        });
        const score = {
          id: conn.peer,
          username: conn.metadata.username,
          points: 0
        }
        const player = {
          id: conn.peer,
          username: conn.metadata.username,
        }
        props.updatePlayers(player);
        updateScores(score);
      })
    } else {
      peerDidMountRef.current = true;
    }
  }, [peer]);

  const updateScores = (score) => {
    const index = scoresRef.current.findIndex(item => item.id == score.id)
    setScores(scores => {
      if (index >= 0) {
        const newScores = scores;
        newScores[index].points += score.points
        return scoresRef.current = newScores;
      } else {
        return scoresRef.current = [...scores, score]
      }  
    });
  }

  const updateGameStarted = (isGameStarted) => {
    setGameStarted(gameStartedRef.current = isGameStarted)
  }

  const handleReceivedMessage = (data) => {
    console.log(data);
  }

  const handleConnectionClosed = (remoteID) => {
    console.log(`${remoteID} is closed`)
  }

  const hangUp = () => {
  }

  const handleEstimatePose = (pose, imagePose) => {
    const similarity = poseSimilarity(pose, imagePose);
    const score = Math.round((1 - similarity) * 100);
    if (gameStartedRef.current) {
      currentPointsRef.current = Math.max(currentPointsRef.current, Math.round(score/5))
    }
    setCurrentScore(score);
  }

  const startGame = () => {
    updateGameStarted(true);
    socket.emit("game-started");
    handleGame();
  }

  const handleGame = async () => {
    let length = Object.keys(posesImages).length;
    for (let i=0; i<length; i++) {
      const posekey = Object.keys(posesImages)[i];
      socket.emit("pose", posekey);
      goNextPose(posekey)
      await timeout(TIME_OUT);
      socket.emit("update-scores")
      const id = peer.id
      const points = currentPointsRef.current
      updateScores({ id, points })
      socket.emit("myscore", id, points)
    }
    await timeout(TIME_OUT)
    socket.emit("gameover")
    props.endGame(scoresRef.current);
  }

  const goNextPose = (posekey) => {
    setCurrentPoseKey(posekey);
  }

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <Box display="flex" height="100%">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box width={1} height="100%" 
            display="flex" flexDirection="column" 
            alignItems="center"
          >
            <Box height={HEADER_HEIGHT} display="flex"
              alignItems="center" justifyContent="center"
              alignSelf="flex-start"
            >
              <Box mx={2} display="flex" alignItems="center" 
                justifyContent="center"
                className={classes.menuButtonContainer} 
              >
                <Button color="secondary" style={{width: "100%", height: "100%"}}>
                  <MenuIcon fontSize="small" />
                </Button>
              </Box>
            </Box>
            {/* Local video */}
            <PoseNet 
              videoWidth={600}
              videoHeight={500}
              minPoseConfidence={0.1}
              minPartConfidence={0.5}
              modelConfig = {{
                architecture: 'ResNet50',
                outputStride: 32,
                multiplier: 1,
                inputResolution: 200,
                quantBytes: 1
              }}
              // modelConfig = {{
              //   architecture: 'MobileNetV1',
              //   outputStride: 16,
              //   multiplier: 1,
              //   inputResolution: 200,
              // }}
              setStream={(stream) => setLocalStream(stream)}
              estimatePose={handleEstimatePose}
              pose={currentPoseKey}
            />
            <Box width={0.6} my={1}
              display="flex" justifyContent="center"
            >
              {
                !gameStarted ? (
                  <Button variant="contained" color="primary"
                    onClick={startGame}
                  >
                    Start the game
                  </Button>
                ) : (
                  <ScoreProgress value={currentScore} />
                )
              }
            </Box>
            <Box width={0.6} my={1}>
              {/* Current position */}
              {
                gameStarted ? (
                  <Pose 
                    pose={currentPoseKey}
                  />
                ) : null
              }
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box width={1} height="100%"
            display="flex" flexDirection="column" 
            alignItems="center"
          >
            <Box height={HEADER_HEIGHT} display="flex" flexDirection="column" 
              alignItems="center" justifyContent="center"
              style={{ color: '#08BFAF' }}
            >
              <Typography variant="h5" style={{ fontWeight: 600 }} >
                Champions 
              </Typography>
              <Typography variant="h6" style={{ fontWeight: 600 }} >
                Room#{roomID}
              </Typography>
            </Box>
            {/* Leader board score */}
            <LeaderBoard scores={scores} hangUp={hangUp} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LocalVideo;