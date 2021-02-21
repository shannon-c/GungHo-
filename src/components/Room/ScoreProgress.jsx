import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography, LinearProgress } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    border: 'solid 1px #A558CB'
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#A558CB',
  },
}))(LinearProgress);

function ScoreProgress(props) {
  return (
    <Box width={1} display="flex" flexDirection="column"
      alignItems="center" justifyContent="center"
    >
      <Box >
        <Typography variant="body1" style={{fontWeight: 500, color: "#A558CB"}}>
          {`${props.value}% Correct`}
        </Typography>
      </Box>
      <Box my={1} width={1}>
        <BorderLinearProgress variant="determinate" value={props.value} />
      </Box>
      <Box >
        <Typography variant="body1">
          You're on fire!
        </Typography>
      </Box>
    </Box>
  )
}

export default ScoreProgress;