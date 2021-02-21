import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box,  
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    borderRadius: 20,
    backgroundColor: '#A558CB',
    color: '#fff',
  },
}));

function Avatar(props) {
  const classes = useStyles();

  const width = props.size == "small" ? 40 : 56;
  const height = props.size == "small" ? 40 : 56;
  const borderRadius = props.size == "small" ? 10 : 20

  return (
    <Box className={classes.avatar} display="flex" 
      alignItems="center" justifyContent="center"
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
    >
      <Typography variant="h6" style={{fontWeight: 600}}>
        {props.username.substring(0,1).toUpperCase()}
      </Typography>
    </Box>
  );
};

export default Avatar;