import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
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
import { htmlToText } from 'html-to-text';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { HexColorPicker } from "react-colorful";
import Dropzone from 'react-dropzone'
import * as filestack from 'filestack-js';
import * as Icons from '@material-ui/icons/';
const { forwardRef, useImperativeHandle } = React;

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
  button: {
    width: "100%",
    '& > *': {
      margin: theme.spacing(1)
    },
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(10),
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

const Child = forwardRef((prop, ref) => {

  useImperativeHandle(ref, () => ({

    resetEditor() {
      setDisabled(true);
      setValue(0);
    }

  }));

  const client = filestack.init('AfKryki4LQQaa2AhVpGTjz');

  function optionsBuilder(key, value) {
    switch (key) {
      case 'src':
        return <Paper >
          <Dropzone onDrop={async (acceptedFiles) => {
            client.upload(acceptedFiles[0])
              .then(r => {
                prop.setSrc(activeIndex, r.url)
              })
          }}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon />} >
                    Upload
                  </Button>
                </div>
              </section>
            )}
          </Dropzone>
        </Paper>;
      case 'borderWidth':
        return <TextField value={value.replace('px', '')} className={classes.button} id={key} type="number" onChange={(e) => prop.setBorderWidth(activeIndex, e.target.value)} label="Border width" />
      case 'href':
        return <TextField value={value} className={classes.button} id={key} onChange={(e) => prop.setHref(activeIndex, e.target.value)} label="Link" />
      case 'fontSize':
        return <TextField value={value.replace('px', '')} className={classes.button} id={key} type="number" onChange={(e) => prop.setFontSize(activeIndex, e.target.value)} label="Font size" />
      case 'borderRadius':
        return <TextField className={classes.button} id={key} type="number" onChange={(e) => prop.setBorderRadius(activeIndex, e.target.value)} label="Border radius" />
      case 'width':
        return <TextField value={value.replace('px', '')} className={classes.button} id={key} type="number" onChange={(e) => prop.setWidth(activeIndex, e.target.value)} label="Width" />
      case 'height':
        return <TextField value={value.replace('px', '')} className={classes.button} id={key} type="number" onChange={(e) => prop.setHeight(activeIndex, e.target.value)} label="Height" />
      case 'backgroundColor':
        return <React.Fragment>
          <Typography subtitle2="h2">
            Background Color
          </Typography>
          <HexColorPicker color={color} onChange={(e) => { setColor(); prop.changeColor(activeIndex, e) }} />
        </React.Fragment>
      case 'borderColor':
        return <React.Fragment>
          <Typography subtitle2="h2">
            Border Color
        </Typography>
          <HexColorPicker color={color} onChange={(e) => { setColor(); prop.setBorderColor(activeIndex, e); }} />
        </React.Fragment>
      default:
        break;
    }

  }
  const [value, setValue] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const handleChange = (event, newValue) => {
    setDisabled(true);
    setValue(newValue);
    prop.toggleEditor(activeIndex);
  };
  const classes = useStyles();
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

        <AppBar position="static">
          <Tabs TabIndicatorProps={{ style: { background: 'black' } }} style={{ backgroundColor: "#3498db" }} value={value} onChange={handleChange} aria-label="Builder Options" >
            <Tab label="Items" {...a11yProps(0)} />
            <Tab label="Edit" {...a11yProps(1)} disabled={disabled} />
          </Tabs>
        </AppBar>
        <Divider />
        <TabPanel value={value} index={0}>
          <List>
            <Container groupName="1" behaviour="copy" getChildPayload={i => prop.data.list[i]} >
              {prop.data.list
                .map(({ text, icon, html, id, attributes }, index) => (
                  <Draggable key={index}>
                    <ListItem button key={text.toUpperCase()} /* onClick={()=>routeChange(link)} */>
                      <div>
                      </div>
                      <ListItemIcon>
                        {React.createElement(Icons[icon])}
                      </ListItemIcon>

                      <ListItemText primary={text[0].toUpperCase() + text.slice(1)} secondary={htmlToText(html)} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                          <EditIcon onClick={() => {
                            prop.toggleEditor(index);
                            setDisabled(false); setValue(1);
                            setActiveIndex(index);
                            setColor(attributes.backgroundColor || '#aabbcc');
                          }} />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick={() => prop.deleteItem(index)} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Draggable>
                ))}
            </Container>
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!disabled &&
            Object.keys(prop.data.list[activeIndex].attributes).map((key) => {
              return optionsBuilder(key, prop.data.list[activeIndex].attributes[key]);
            })}
        </TabPanel>

      </Drawer>

    </div>
  );
});

export default Child;