import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Grid, 
  Typography,
  Button,
  Container
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Avatar from './Avatar';
import LeaderBoard from './LeaderBoard';
import LeaderBoardImage from '../../static/leader_board.png';
import CoinImage from '../../static/coin.png';
import Badge01 from '../../static/1_badge_10.png';
import Badge02 from '../../static/2_badge_10.png';
import Badge03 from '../../static/3_badge_10.png';
import Badge04 from '../../static/4_badge_20.png';

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%'
  },
  winner2Container: {
    position: 'relative',
    top: 56
  },
  winner3Container: {
    position: 'relative',
    top: 72
  },
  badgesMenu: {
    backgroundColor: '#8B6AFC',
    borderRadius: '20px 0 0 20px'
  },
  badgeImage: {
    width: '60%'
  },
  sideBarContainer: {
    backgroundColor: '#8B6AFC',
    borderRadius: '0 20px 20px 0'
  }
}));

const badges = [
  {
    id: 1,
    src: Badge01,
    name: 'Leader'
  },
  {
    id: 2,
    src: Badge02,
    name: 'Ninja Warrior'
  },
  {
    id: 3,
    src: Badge03,
    name: 'Yoga Master'
  },
  {
    id: 4,
    src: Badge04,
    name: 'Dance Master'
  },
]

function Results(props) {
  const classes = useStyles();

  const scores = props.scores.sort((a, b) => b.points - a.points)
  console.log(props.scores)
  console.log(scores)

  const renderWinner = (username) => (
    <Box display="flex" flexDirection="column"
      alignItems="center"
    >
      <Typography>
        {username}
      </Typography>
      <Avatar username={username} />
    </Box>
  )

  return (
    <Box height="100vh" width={1} display="flex">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box height="100%" display="flex">
            <Grid container>
              <Grid item xs={false} md={1}>
                <Box height="100%" display="flex"
                  justifyContent="center"
                  className={classes.sideBarContainer}
                >
                  <Box my={4} width={40} height={40} 
                    display="flex" alignItems="center" justifyContent="center"
                    style={{borderRadius: 10, overflow: 'hidden'}}
                  >
                    <Button 
                      style={{
                        backgroundColor: '#E8CF02', 
                        color: "#fff", 
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <PlayArrowIcon />
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={11}>
                <Box height="100%" width={1} 
                  display="flex" flexDirection="column" 
                  alignItems="center" justifyContent="center"
                >
                  <Box width={0.5}>
                    <Box width={1} display="flex">
                      {
                        scores[1] ? (
                          <Box flex={1} className={classes.winner2Container}>{renderWinner(scores[1].username)}</Box>
                        ) : <Box flex={1} />
                      }
                      {
                        scores[0] ? (
                          <Box flex={1}>{renderWinner(scores[0].username)}</Box>
                        ) : <Box flex={1} />
                      }
                      {
                        scores[2] ? (
                          <Box flex={1} className={classes.winner3Container}>{renderWinner(scores[2].username)}</Box>
                        ) : <Box flex={1} />
                      }
                    </Box>
                    <img src={LeaderBoardImage} 
                      className={classes.image}
                    />
                    <Box mt={2}>
                      <Typography variant="h6" 
                        style={{fontWeight: 600, color: "#8B6AFC", textAlign: "center"}}
                      >
                        Great Party!
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="100%" display="flex">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box width={1} height="100%"
                  display="flex" flexDirection="column" 
                  alignItems="center" justifyContent="center"
                >
                  <Typography variant="h5" 
                    style={{ fontWeight: 600, color: '#08BFAF', marginBottom: 16 }}>
                    Score Board
                  </Typography>
                  <LeaderBoard scores={scores} />
                </Box>
              </Grid>
              <Grid item xs={false} md={6}>
                <Box height="100%" display="flex" className={classes.badgesMenu}
                >
                  <Container>
                    <Box py={4} display="flex" flexDirection="column">
                      <Box display="flex" justifyContent="flex-end">
                        <Box mr={2} width={40} height={40} display="flex" 
                          flexDirection="column" alignItems="center"
                        >
                          <Box flex={1}>
                            <img src={CoinImage} />
                          </Box>
                          <Typography variant="caption" style={{color: "#fff"}}>
                            300
                          </Typography>
                        </Box>
                        <Avatar username={props.scores[0].username} size="small" />
                      </Box>
                      <Box my={4}>
                        <Typography variant="h4" style={{fontWeight: 600, color: '#fff'}}>
                          Hi <br/>
                          Brahim!
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <Grid container>
                          {badges.map(badge => (
                            <Grid key={badge.id} item xs={12} sm={6}>
                              <Box display="flex" py={2} flexDirection="column"
                                justifyContent="center" alignItems="center"
                              >
                                <img src={badge.src} className={classes.badgeImage} />
                                <Typography variant="caption" 
                                  style={{fontWeight: 600, marginTop: 8, color: '#fff'}}
                                >
                                  {badge.name}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Results;