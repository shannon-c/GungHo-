import React, { useState } from 'react';
import { 
  Box,  
  Typography, 
  Button, 
  Dialog, 
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { v4 as uuid4 } from "uuid";

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

function CreateRoomDialog(props) {
  const classes = useStyles();
  const gameID = uuid4().substring(0, 8);
  const [username, setUsername] = useState("");

  const closeDialog = () => {
    props.onClose();
  }

  const handleCreateGame = () => {
    props.createGame(gameID, username);
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
        <Typography variant="h6">Create Game</Typography>
        <Box>
          <IconButton style={{backgroundColor: "#efefef"}}
            onClick={closeDialog}
          >
            <ClearIcon fontSize="small"/>
          </IconButton>
        </Box>
      </Box>
      <form onSubmit={handleCreateGame}>
        <Box className={classes.section}>
          <TextField
            className={classes.textFiled}
            label="Enter username" 
            variant="outlined"
            value={username}
            onChange={e => {setUsername(e.target.value)}} 
          />
        </Box>
        <Box className={classes.section}>
          <Button variant="contained" size="large" color="primary" 
            disableElevation
            style={{ width: "100%" }}
            type="submit"
          >
            Create Game
          </Button>
        </Box>
      </form>
    </Dialog>
  )
}

export default CreateRoomDialog;