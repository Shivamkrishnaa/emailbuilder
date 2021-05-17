import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Container, Draggable } from 'react-smooth-dnd';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {htmlToText} from 'html-to-text';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { HexColorPicker } from "react-colorful";
import Dropzone from 'react-dropzone'
import * as filestack from 'filestack-js';

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function PermanentDrawerRight(prop) {
const client = filestack.init('AfKryki4LQQaa2AhVpGTjz');
  const [value, setValue] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
    const handleChange = (event, newValue) => {
      setDisabled(true);
      prop.toggleEditor(activeIndex);
      setValue(newValue);
    };
  const classes = useStyles();
  // console.log(prop,'prop');
  const [color, setColor] = React.useState("#aabbcc");
  const [activeIndex, setActiveIndex] = React.useState(null);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
       
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Builder Options" >
          <Tab label="Items" {...a11yProps(0)} />
          <Tab label="Edit" {...a11yProps(1)} disabled={disabled}/>
        </Tabs>
      </AppBar>
        <Divider />
        <TabPanel value={value} index={0}>
        <List>
          <Container groupName="1" behaviour="copy" getChildPayload={i => prop.data.list[i]} >
          {prop.data.list
          .map(({text, icon, html, id, attributes}, index) => (
            <Draggable key={index}>
              <ListItem button key={text.toUpperCase()} /* onClick={()=>routeChange(link)} */>
                <div>
                    </div>
                <ListItemIcon>
                    {React.createElement(Icons[icon])}
                </ListItemIcon>
                
              <ListItemText  primary={text[0].toUpperCase()+text.slice(1)} secondary={htmlToText(html)} />
              <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                      <EditIcon onClick={()=>{
                        /* if(['text'].includes(id))   */prop.toggleEditor(index);
                        // if(['button'].includes(id)) {}
                        setDisabled(false);setValue(1);
                        setActiveIndex(index);
                        setColor(attributes.backgroundColor||'#aabbcc');
                      }}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={()=>prop.deleteItem(index)}/>
                    </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            </Draggable>
          ))}
          </Container>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TextField onChange={(e)=>prop.setHref(activeIndex, e.target.value)} id="standard-basic" label="Href" />
      <TextField type="number" onChange={(e)=>prop.setBorderWidth(activeIndex, e.target.value)} id="standard-borderWidth" label="Border width" />
      <TextField type="number" onChange={(e)=>prop.setFontSize(activeIndex, e.target.value)} id="standard-fontSize" label="Font size" />
      <TextField type="number" onChange={(e)=>prop.setBorderRadius(activeIndex, e.target.value)} id="standard-borderRadius" label="Border radius" />
      <TextField type="number" onChange={(e)=>prop.setWidth(activeIndex, e.target.value)} id="standard-width" label="Width" />
      <TextField type="number" onChange={(e)=>prop.setHeight(activeIndex, e.target.value)} id="standard-height" label="Height" />
      <br/><br/>
        <Typography  subtitle2="h2">
        Button background Color
        </Typography>
        <HexColorPicker color={color} onChange={(e)=>{setColor();prop.changeColor(activeIndex, e)}}/>
        <br/>
        <br/>
        <Paper className={classes.root} elevation={6} >
        <Dropzone onDrop={async (acceptedFiles) =>{
           client.upload(acceptedFiles[0])
            .then(r => {
              prop.setSrc(activeIndex, r.url)
            })
          }}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>
</Paper>
      </TabPanel>
      
         </Drawer>
         
    </div>
  );
}