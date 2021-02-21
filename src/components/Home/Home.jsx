import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid4 } from "uuid";
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  TextField, 
  Container
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
import JoinRoomDialog from './JoinRoomDialog';
import CreateRoomDialog from './CreateRoomDialog';
import SplashImage from '../../static/home_splash.png';

const useStyles = makeStyles(theme => ({
  splashContainer: {
    height: '96%',
    width: '96%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  splash: {
    backgroundImage: `url(${SplashImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(4),
    padding: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: 20,
    boxShadow: '0px 10px 30px #DBD8EA80',
    width: 200,
    height: 240
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 96,
    borderRadius: 20
  },
  textActionContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [joinDialogOpen, SetJoinDialogOpen] = useState(false);
  const [createDialogOpen, SetCreateDialogOpen] = useState(false);

  const handleOpenJoin = () => {
    SetJoinDialogOpen(true);
  }

  const handleCloseJoin = () => {
    SetJoinDialogOpen(false)
  }

  const handleOpenCreate = () => {
    SetCreateDialogOpen(true);
  }

  const handleCloseCreate = () => {
    SetCreateDialogOpen(false)
  }

  const handleCreateGame = (roomID, username) => {
    history.push({
      pathname: `/room/${roomID}`, 
      state: {username: username}
    });
  }

  const handleJoinGame = (roomID, username) => {
    history.push({
      pathname: `/room/${roomID}`, 
      state: {username: username}
    });
  }

  return (
    <Box height="100vh" width={1} display="flex">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box height="100%" width={1} display="flex">
            <Container maxWidth="sm">
              <Box width={1} height="100%" flexDirection="column"
                display="flex" alignItems="flex-start" justifyContent="center"
              >
                <Box>
                  <Typography variant="h5" style={{fontWeight: 700}} >
                    <span style={{color: '#600BC1'}} >Socialize,</span> 
                    <span style={{color: '#E8CF02'}} > have fun, </span> 
                    stay <br/> <span style={{color: '#08BFAF'}} > physically </span>
                    and<span style={{color: '#F38B5F'}} > mentally </span> 
                    active <br/> through multiple challenges
                  </Typography>
                </Box>
                <Box display="flex" my={4}>
                  <Box className={classes.cardContainer} >
                    <Button className={classes.iconContainer}
                      variant="contained" disableElevation
                      color="primary"
                      onClick={handleOpenCreate}
                    >
                      <VideoCallRoundedIcon fontSize="large" style={{ color: "#fff"}}/>
                    </Button>
                    <Box className={classes.textActionContainer}>
                      <Typography variant="h6">
                        Create
                      </Typography>
                      <Typography variant="body2">
                        Create your game
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.cardContainer} >
                    <Button className={classes.iconContainer}
                      variant="contained" disableElevation
                      color="secondary"
                      onClick={handleOpenJoin}
                    >
                      <AddIcon fontSize="large" style={{ color: "#fff"}}/>
                    </Button>
                    <Box className={classes.textActionContainer}>
                      <Typography variant="h6">
                        Join
                      </Typography>
                      <Typography variant="body2">
                        Join existing game
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item xs={false} md={6}>
          <Box height="100%" display="flex"
            alignItems="center" justifyContent="center"
          >
            <Box className={classes.splashContainer}>
              <Box className={classes.splash} ></Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <JoinRoomDialog open={joinDialogOpen} onClose={handleCloseJoin} 
        joinGame={handleJoinGame}
      />
      <CreateRoomDialog open={createDialogOpen} onClose={handleCloseCreate}
        createGame={handleCreateGame}
      />
    </Box>
  )
}

export default Home;