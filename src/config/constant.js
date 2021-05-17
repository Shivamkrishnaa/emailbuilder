const constants = {
    "options":{
       "title":"Content",
       "list":[
          {
             "text":"Text",
             "icon":"TextFields",
             "id":"text",
             "html":"Write your text here.",
             "initialValue":"Write your text here.",
             "open":false,
             "attributes":{
                "align":"center"
             }
          },
          {
             "text":"Bullet",
             "icon":"FormatListBulleted",
             "id":"bullet",
             "html":"<ul><li style=\"text-align: left;\">hello</li><li style=\"text-align: left;\">wold</li></ul>",
             "initialValue":"<ul><li style=\"text-align: left;\">hello</li><li style=\"text-align: left;\">wold</li></ul>",
             "open":false,
             "attributes":{
                "align":"center"
             }
          },
          {
             "text":"Image",
             "icon":"Image",
             "id":"image",
             "html":"",
             "initialValue":"",
             "open":false,
             "attributes":{
                "src":"https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg",
                "width":"300px",
                "height":"300px"
             }
          },
          {
             "text":"Rectangle Button",
             "icon":"Crop169",
             "id":"button",
             "html":"BUTTON",
             "initialValue":"BUTTON",
             "open":false,
             "attributes":{
                "href":null,
                "color":"white",
                "fontFamily":"Helvetica",
                "backgroundColor":"red",
                "borderRadius":"3px",
                "width":"100px",
                "fontSize": "12px"
             }
          },
          {
            "text":"Round Button",
            "icon":"RadioButtonUnchecked",
            "id":"button",
            "html":"BUTTON",
            "initialValue":"BUTTON",
            "open":false,
            "attributes":{
               "href":null,
               "color":"white",
               "fontFamily":"Helvetica",
               "backgroundColor":"red",
               "borderRadius":"30px",
               "width":"100px",
               "fontSize": "12px"
            }
         },
          {
             "text":"break",
             "icon":"Remove",
             "id":"break",
             "html":"",
             "initialValue":"",
             "open":false,
             "attributes":{
                "align":"center",
                "borderWidth":"1px",
                "borderStyle":"dashed",
                "borderColor":"lightgrey"
             }
          }
       ]
    },
    "api":{
       "baseUrl":`${process.env.REACT_APP_NODE_URL}`,
       "mjml":{
          "method":"post",
          "url":"/api/v1/auth/html"
       }
    }
 }
export default constants;