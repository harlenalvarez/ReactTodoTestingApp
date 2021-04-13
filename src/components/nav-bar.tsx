import { Fragment } from 'react';
import { AppBar, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    background: 'linear-gradient(135deg, rgba(0,176,255,1) 0%, rgba(6,93,173,1) 20%, rgba(9,41,121,1) 20%, rgba(17,0,55,1) 100%)'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  selected: {
    '& > div:first-child': {
      backgroundColor: theme.palette.action.selected
    }
  },
  separator:{
    flexGrow: 1
  },
  links: {
    marginLeft:0,
    position: 'relative',
    marginRight: '2px'
  }
}));

export const NavBar = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='relative'>
        <Toolbar>
          <Typography>My Daily List</Typography>
          <div className={classes.separator}></div>
          <Button variant='text'>
            <Typography><NavLink to='/' className={classes.link}>Home</NavLink></Typography>
          </Button>
          <Button variant='text'>
            <Typography><NavLink to='/todos' className={classes.link}>My Todos</NavLink></Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
};
