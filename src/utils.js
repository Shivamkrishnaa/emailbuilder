const MJML = {
    MJML: 'mjml',
    HEADER: 'mj-head',
    TITLE: 'mj-title',
    STYLE: 'mj-style',
    TEXT: 'mj-text',
    BODY: 'mj-body',
    CONTAINER: 'mj-container',
    WRAPPER: 'mj-wrapper',
    SECTION: 'mj-section',
    COLUMN: 'mj-column',
    IMAGE: 'mj-image',
    BUTTON: "mj-button",
    ATTRIBUTES: 'mj-attributes',
    ALL: 'mj-all',
    DIVIDER: 'mj-divider'
  };
export const generateID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
export const downloadFile = ( filename, content, type ) => {
  var file = new Blob([content], {type: type})
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename)
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file)
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      setTimeout(function() {
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
      }, 0)
  }
}
const kebabize = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}
const removeEmpty = (obj) => {
  Object.keys(obj).forEach(
    (k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
  Object.keys(obj).forEach(
      (k) => {if(kebabize(k) !== k) {obj[kebabize(k)] = obj[k]; delete obj[k];}   });
  return obj;
};
const getText = ({html, intialValue, attributes}) => {
  return {
    tagName: MJML.TEXT,
    content: html || intialValue,
    attributes: attributes
  }
}
const getButton = ({html, intialValue, attributes}) => {
  return {
    tagName: MJML.BUTTON,
    content: html || intialValue,
    attributes: removeEmpty(attributes) || {}
  }
}
const getBreak = ({attributes}) => {
  return {
    tagName: MJML.DIVIDER,
    attributes: removeEmpty(attributes) || {}
  }
}
const getImage = ({attributes}) => {
  return {
    tagName: MJML.IMAGE,
    attributes: removeEmpty(attributes) || {}
  }
}
const mjmlColumns = (section) => {
  const child = [];
  switch (section.id) {
    case 'text':
      child.push(getText(section));
      break;
      case 'bullet':
        child.push(getText(section));
        break;
    case 'button':
      child.push(getButton(section));
      break;
    case 'break':
      child.push(getBreak(section));
      break;
    case 'image':
      child.push(getImage(section));
      break;
    default:
      break;
  }
  return {
      tagName: MJML.COLUMN,
      attributes: section.columnAttributes || {},
      children: [
        ...child
      ]
  }

  }
  const mjmlSections = ({ list }) => {

    return list.map((section)=>{
  
      return {
        tagName: MJML.SECTION,
        attributes: {},
        children: [
          mjmlColumns(section)
        ]
      }
      
  
    });
  
  }
  const mjmlBody = ({ list, body }) => {
    return {
      tagName: MJML.BODY,
      attributes: body || {},
      children: [
        ...mjmlSections({ list })
      ]
    }
  }
  
  export const getMjml = ({ header, body, list }) => {
    console.log(list,'list');
    return {
      tagName: MJML.MJML,
      attributes: header || {},
      children: [
        // mjmlHeader(),
        mjmlBody({ body, list })
      ]
    }
  }
export default {
    generateID,
    getMjml,
    downloadFile
}