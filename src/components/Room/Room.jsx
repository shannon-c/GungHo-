import React, {useState, useRef} from "react";
import { useParams, useLocation } from "react-router-dom";
import { 
  Box, 
  Grid, 
} from '@material-ui/core';
import RemoteVideo from './RemoteVideo';
import LocalVideo from "./LocalVideo";
import Results from './Results';


function Room(props) {
  
  const { roomID } = useParams();
  const { username } = useLocation().state;

  const [remoteVideos, setRemoteVideos] = useState([]);
  const remoteVideosRef = useRef();

  const [players, setPlayers] = useState([]);
  const playersRef = useRef();

  const [isGameOver, setIsGameOver] = useState(false)
  const scoresRef = useRef([]);

  const updateVideos = (remoteStream, remoteID) => {
    const video = {
      id: remoteID,
      stream: remoteStream,
    };
    setRemoteVideos(remoteVideos => (
      remoteVideosRef.current = [...remoteVideos, video]
    ));
  }

  const updatePlayers = (player) => {
    setPlayers(players => (
      playersRef.current = [...players, player]
    ));
  }

  const endGame = (scores) => {
    scoresRef.current = scores
    setIsGameOver(true)
  }

  if (isGameOver) 
    return (
      <Results 
        scores={scoresRef.current}
      />
    )

  return (
    <Box height="100vh" width={1} display="flex">
      <Grid container>
        <Grid item xs={12} md={6}>
          <LocalVideo 
            roomID={roomID}
            username={username}
            updateVideos={updateVideos}
            updatePlayers={updatePlayers}
            endGame={endGame}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="100%" width={1}>
            <Grid container direction="row-reverse">
              {/* Remote videos */}
              {remoteVideos.map((video) => (
                <Grid key={video.id} item xs={12} md={6}>
                  <RemoteVideo id={video.id} stream={video.stream} players={players} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Room;