import React, { useState } from 'react';
import { 
  Box,  
  Typography, 
  Button, 
  Dialog, 
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(2)
  },
  textFiled: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

function JoinRoomDialog(props) {
  const classes = useStyles();
  const [gameID, setGameID] = useState("");
  const [username, setUsername] = useState("");

  const closeDialog = () => {
    props.onClose();
  }

  const handleJoinGame = () => {
    props.joinGame(gameID, username);
  }

  return (
    <Dialog
      open={props.open}
      PaperProps={{
        style: {width: 400, padding: "16px 24px"}
      }}
    >
      <Box display="flex" mb={4}
        justifyContent="space-between" alignItems="center"
      >
        <Typography variant="h6">Join Game</Typography>
        <Box>
          <IconButton style={{backgroundColor: "#efefef"}}
            onClick={closeDialog}
          >
            <ClearIcon fontSize="small"/>
          </IconButton>
        </Box>
      </Box>
      <form onSubmit={handleJoinGame}>
        <Box className={classes.section}>
          <TextField
            className={classes.textFiled}
            label="Enter game ID" 
            variant="outlined"
            value={gameID}
            onChange={e => {setGameID(e.target.value)}}
          />
          <TextField
            className={classes.textFiled}
            label="Enter username" 
            variant="outlined"
            value={username}
            onChange={e => {setUsername(e.target.value)}} 
          />
        </Box>
        <Box className={classes.section}>
          <Button variant="contained" size="large" color="primary" disableElevation
            style={{ width: "100%" }}
            type="submit"
          >
            Join Game
          </Button>
        </Box>
      </form>
    </Dialog>
  )
}

export default JoinRoomDialog;