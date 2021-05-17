import ListSubheader from '@material-ui/core/ListSubheader';
import { Container, Draggable } from 'react-smooth-dnd';
import React from 'react';
import PropTypes from 'prop-types'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { fade} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import * as Icons from '@material-ui/icons/';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,height: "100%",
    padding: theme.spacing(3),
    minHeight: "100vh",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));

function Header(prop) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const matches = useMediaQuery('(min-width:1024px)');
  React.useEffect( () => {
    if(matches) setOpen(true);
     else setOpen(false);
  }, [matches])
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect( () => {
    if(isWidthDown('s', prop.width) ||  isWidthDown('xs', prop.width)) setOpen(false);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar
        color="inherit"
        style={{boxShadow: "none"}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge={"start"}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Typography variant="h6" noWrap>
            {(prop.data.title && prop.data.title.length)  ? React.createElement(Icons['BorderAll']):"-"}
            </Typography>
          </IconButton>
            <MenuIcon onClick={open? handleDrawerClose : handleDrawerOpen}/>
            
        </Toolbar>
      </AppBar>
      <Drawer
        style={{  opacity: 0.6 }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{float:'left'}}>
          <IconButton onClick={handleDrawerClose}>
          <Typography variant="h6" noWrap>
          {(prop.data.title && prop.data.title.length)  ? prop.data.title : "-"}
          </Typography>          
          </IconButton>
        </div>
        <Divider />
        <List selected  subheader={
        <ListSubheader id="nested-list-subheader">
          {open?"Drag from here.":'Drag...'}
        </ListSubheader>
      }>
          <Container groupName="1" behaviour="copy" getChildPayload={i => prop.data.list[i]} >
          {prop.data.list
          .map(({text, icon}, index) => (
            <Draggable key={index}>
              <ListItem button key={text.toUpperCase()} /* onClick={()=>routeChange(link)} */>
                <ListItemIcon>
                    {React.createElement(Icons[icon])}
                </ListItemIcon>
              <ListItemText primary={text[0].toUpperCase()+text.slice(1)} />
            </ListItem>
            </Draggable>
          ))}
           <Divider />
           <ListSubheader id="nested-list-subheader">
           {open?"Setting":'Set...'}

        </ListSubheader>
          <ListItem button onClick={()=>prop.download()}>
            <ListItemIcon>
            {React.createElement(Icons['GetApp'])}
            </ListItemIcon>
            <ListItemText primary="Download" />
          </ListItem>
          <ListItem button onClick={()=>prop.save()}>
            <ListItemIcon>
            {React.createElement(Icons['Save'])}
            </ListItemIcon>
            <ListItemText button primary="Save" />
          </ListItem>
          <ListItem button onClick={()=>prop.reset()}>
            <ListItemIcon>
            {React.createElement(Icons['Delete'])}
            </ListItemIcon>
            <ListItemText primary="Reset" />
          </ListItem>
          </Container>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

Header.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
}
export default withWidth()(Header)