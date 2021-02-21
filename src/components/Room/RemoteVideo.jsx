import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  usernameContainer: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
}));

function RemoteVideo(props) {
  const classes = useStyles();
  const streamVideoRef = useRef();

  const username = props.players
    .find(player => (player.id == props.id))
    .username;

  useEffect(() => {
    streamVideoRef.current.srcObject = props.stream;
  });

  return (
    <Box display="flex"
      style={{ position: 'relative' }}
    >
      <Box className={classes.usernameContainer}>
        <Typography variant="caption" style={{color: "#A558CB", fontWeight: 600}}
        >
          {username}
        </Typography>
      </Box>
      <video ref={streamVideoRef} autoPlay style={{ width: "100%"}}/>
    </Box>
  )
}

export default RemoteVideo;