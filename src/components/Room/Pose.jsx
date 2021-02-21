import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import posesImages from '../../data/posesImages';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#A558CB',
    position: 'relative',
    width: '100%',
    paddingTop: '84%'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function Pose({pose}) {
  const classes = useStyles();
  const [currentPose, setCurrentPose] = useState(pose);

  useEffect(() => {
    setCurrentPose(posesImages[pose]);
    return () => {}
  }, [pose]);

  return (
    <Box className={classes.root}>
      <Box className={classes.imageContainer}>
        <img src={currentPose} style={{width: '100%'}}/>
      </Box>
    </Box>
  );
}

export default Pose;