import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Typography,
  Button
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from './Avatar';

const useStyles = makeStyles(theme => ({
  leaderBoard: {
    width: '60%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0px 10px 30px #DBD8EA80',
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  scoreContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 56/2,
    backgroundColor: '#A558CB',
    color: '#fff',
    marginRight: theme.spacing(2)
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    overflow: "hidden",
    borderRadius: 20,
    margin: `0 ${theme.spacing(1)}px`
  },
  button: {
    width: '100%',
    height: '100%'
  }
}));

function LeaderBoard(props) {
  const classes = useStyles();

  const hangUp = () => {
    props.hangUp();
  }

  const renderScore = (score) => (
    <>
      <Avatar username={score.username} />
      <Box ml={2} display="flex" flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="caption">
          {score.username}
        </Typography>
        <Typography variant="h6" style={{fontWeight: 600}}>
          {score.points}
        </Typography>
      </Box>
    </>
  )

  return (
    <Box className={classes.leaderBoard}>
      <Box py={2} px={2}>
        {props.scores.map((score) => (
          <Box key={score.id} display="flex" className={classes.scoreContainer}>
            {renderScore(score)}
          </Box>
        ))}
      </Box>
      {props.hangUp ?
      (
        <Box py={2} px={2} display="flex" justifyContent="center" >
          <Box display="flex">
            <Box className={classes.buttonContainer} >
              <Button className={classes.button} style={{backgroundColor: "#F5F5F5"}} >
                <MicNoneOutlinedIcon fontSize="small" />
              </Button>
            </Box>
            <Box className={classes.buttonContainer} >
              <Button className={classes.button} variant="contained" 
                style={{ backgroundColor: red[500], color: '#fff'}}
                onClick={hangUp}
              >
                <CallOutlinedIcon fontSize="small" />
              </Button>
            </Box>
            <Box className={classes.buttonContainer} >
              <Button className={classes.button} style={{backgroundColor: "#F5F5F5"}} >
                <MoreHorizIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default LeaderBoard;