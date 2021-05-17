import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import * as filestack from 'filestack-js';

import Options from './component/Options';
import Edit from './component/Edit';
import constants from './config/constant';
import axios from 'axios';
import parse from 'html-react-parser';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from './component/utils';
import { getMjml, downloadFile } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  gridRoot: {flexGrow: 1},
  content: {
    flexGrow: 1, height: "100%",
    padding: theme.spacing(3),
    minHeight: "100vh",
    alignItems:'center',
    alignContent:'center'
  },
  paper:{
    maxWidth: 600,
  }
}));

function App(props) {
  const editorRef = useRef(null);

  const mjmlToHtml = function (previewed) {
    const parsedMjml = getMjml({body: {}, header: {},list:JSON.parse(JSON.stringify(myMjml))});
    return axios.post(
      'https://api.mjml.io/v1/render',
      JSON.stringify({ mjml: JSON.stringify(parsedMjml) }),
      { auth: { username: '98e46f77-2126-4db5-8bf7-edd960d5738c', password: 'd264dc69-5a72-4aab-b237-91c13a033f97' }}
  ).then((res) => {
      if(res.data) {
        if(!previewed) downloadFile(`Email-${Date.now()}.html`, res.data.html, 'html');
      }
  })
  .catch(e => {
  })

  }
  const [myMjml, setMyMjml] = React.useState([]);
  const classes = useStyles();
  function childData(a) {
    alert(a);
  }
  App.handleClickOutside = () =>{ 
    const temp = JSON.parse(JSON.stringify(myMjml)); 
    Object.keys(temp).filter(i => temp[i].hasOwnProperty('open')).map(i => temp[i].open = false); 
    setMyMjml(temp);
  };
  function toggleEditor(i, status) {
    if(!['text','bullet'].includes(myMjml[i]['id'])) return ;
    const temp = JSON.parse(JSON.stringify(myMjml));
    if(status) temp[i].open = status;
    else temp[i].open = !temp[i].open; 
    return setMyMjml(temp);
 }
 function deleteItem(i){
  const temp = JSON.parse(JSON.stringify(myMjml));
  temp.splice(i, 1);
  return setMyMjml(temp);
 }
 function colorEditor(i, color){
  const temp = JSON.parse(JSON.stringify(myMjml));
  temp[i].attributes.backgroundColor = color;
  return setMyMjml(temp);
 }
 
 function setHref(i, value){
   const temp = JSON.parse(JSON.stringify(myMjml));
  temp[i].attributes.href = value;
  return setMyMjml(temp);
 }
 function setBorderRadius(i, value){
  const temp = JSON.parse(JSON.stringify(myMjml));
 temp[i].attributes.borderRadius = value+'px';
 return setMyMjml(temp);
}
 function setSrc(i, value){
  const temp = JSON.parse(JSON.stringify(myMjml));
 temp[i].attributes.src = value;
 return setMyMjml(temp);
}
function setWidth(i, value){
  const temp = JSON.parse(JSON.stringify(myMjml));
 temp[i].attributes.width = value+"px";
 return setMyMjml(temp);
}
function setHeight(i, value){
  const temp = JSON.parse(JSON.stringify(myMjml));
 temp[i].attributes.height = value;
 return setMyMjml(temp);
}
function setFontSize(i, value){
  const temp = JSON.parse(JSON.stringify(myMjml));
 temp[i].attributes.fontSize = value+"px";
 return setMyMjml(temp);
}
function setBorderWidth(i, value){
  const temp = JSON.parse(JSON.stringify(myMjml));
 temp[i].attributes.borderWidth = value+"px";
 return setMyMjml(temp);
}
function save(){
  localStorage.setItem('mjml',JSON.stringify(myMjml));
}
function reset(){
  localStorage.clear();
  setMyMjml([]);
}
React.useEffect(()=>{
  if(localStorage.getItem('mjml')) setMyMjml(JSON.parse(localStorage.getItem('mjml'))) ;
},[])
 const Builder = (i, p) => {
   console.log(p.attributes.fontSize,'p.attributes.fontSize');
  switch (myMjml[i]['id']) {
    case "text":
      return parse(p.html);
    case "bullet":
      return parse(p.html);
    case "button":
      return <Button style={{borderRadius: p.attributes.borderRadius, background:p.attributes.backgroundColor, fontSize: p.attributes.fontSize , width: p.attributes.width, color: p.attributes.color }}>{parse(p.html)} </Button>;
    case "image":
    return <img src={p.attributes.src} width={p.attributes.width} height={p.attributes.height} alt="cropped" />
    default:
      break;
  }
 }
  const client = filestack.init('AfKryki4LQQaa2AhVpGTjz');

  return (
    <div className={classes.root}>
      
  
        <Options save={save.bind(this)} reset={reset.bind(this)} download={mjmlToHtml.bind(this)} {...props} sendData={childData} data={constants.options} ></Options>
        
        
        <main style={{ backgroundColor: "white", height: "100%" }} className={classes.content}>
        <br/><br/>
        <hr></hr>
       
         <Container  groupName="1" getChildPayload={i => myMjml[i]} onDrop={e => setMyMjml(applyDrag(myMjml, e))} >
         {
          (!myMjml || !myMjml.length)  ? <h1>Drop here</h1>:  myMjml.map((p, i) => {
             return (
               <Draggable key={i} >

             <br/>
             <br/>
                 {myMjml[i].id === 'break' ? <Divider style={p.attributes}/>:''}
                 <Grid direction="column" alignItems="center" justify="center" container className={classes.gridRoot} spacing={2}>
                 <Grid item xs={12}>
                 
                 <div className="draggable-item"  >
                   {
                     Builder(i,p)
                     
                   }
           
                 </div>
                 <br></br>
                 { myMjml[i].open ? (
                 <Editor onInit={(evt, editor) => editorRef.current = editor} 
                 initialValue={(p.initialValue)} 
                 apiKey="1zmii2qonhzm7ds7sw3ljonnuap21c1zsg0msy1drofrc5w1" 
                 onEditorChange={(r)=>{ const temp = JSON.parse(JSON.stringify(myMjml)); temp[i].html = r; return setMyMjml(temp); }} 
                 init={{ height: 300, menubar: false, 
                 toolbar_persist:false,
                 file_picker_types: "file image media",
                 filestack_api_key: 'AfKryki4LQQaa2AhVpGTjz',
                 plugins: [ 'link filestack advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount' ],
                 toolbar: (['text','bullet'].includes(myMjml[i]['id']) ? "| image | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  bold italic backcolor " : ' |  bold italic ')+ ' | linkremoveformat | undo redo | formatselect | removeformat | help',
                 content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' ,
                 images_upload_handler: async function( blobInfo, success, failure ) {
                   try{
                     return client.upload(blobInfo.base64())
                     .then(r => {
                       success(r.url);
                     })
                   }
                   catch(er){
                     failure('https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F812688695243567825%2F&psig=AOvVaw05d98XMH-5DL-orKD-eGbN&ust=1621255494021000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjmr7-dzvACFQAAAAAdAAAAABAD');
                   }
                 }
                 }} />
                  ) :''} 
               </Grid>
             </Grid>
             <br/>
             <br/>
               </Draggable>
             );
           })
         }
       </Container>
    
        
          <hr></hr>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </main>
        <Edit {...props} setBorderWidth={setBorderWidth.bind(this)}setBorderRadius={setBorderRadius.bind(this)} setFontSize={setFontSize.bind(this)} setWidth={setWidth.bind(this)} setHeight={setHeight.bind(this)}  setSrc={setSrc.bind(this)} setHref={setHref.bind(this)} changeColor={colorEditor.bind(this)} data={{list: myMjml, title: "Edit", edge: "end" }} sendData={childData} deleteItem={deleteItem.bind(this)} toggleEditor={toggleEditor.bind(this)} ></Edit>
    </div>
  );
}

export default App;