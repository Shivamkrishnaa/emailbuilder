

# emailbuilder

## Requirements

*   Node.js **10+**
## Features

*   Drag and drop components.
*   Edit components properties.
*   Change order of components.
*   Save email template.

### How To Setup?

1. Go to client `cd client`.
2. Run `npm install`.
3. Run `npm run start`.



## Design Specification

Email builder consists of a single screen. 
This page is created using material-UI & react-smooth-dnd. 

### Blocks

1.	Image: 

1.1 User and upload a new image from drag & drop in edit section.  
1.2 Image is resized using width & height in edit section.
1.3 Images is hyperlinked using href in edit section.

2.	Bullet:

2.1 Bullet points is editable through tinymce editor which appears on canvas only.

3.	Button: 

3.1 Button is styled from tinymce editor which appears on canvas only.
3.2 Button Color is changed with color picker in edit section
3.3 Button is hyperlinked using href in edit section.

4.	Horizontal Lines:

4.1 Color is changed with color picker in edit section.
4.2 Thickness is changed with border radius in edit section.




## How it works

 1. From the Contents menu a user and drag a component Text, Button, Image, Separator/ Divider, Bullet and drop it in the middle of the dividers. 
 2. After dropping the component it would be added in items and users can delete and edit.
 3. On save the current template is saved in local storage & on refresh saved template can be prefetched.
4. On download, a responsive Html file is downloaded and the user can view the Html.
5. On reset, all the current progress is removed.
6. Component can be editing using edit icon in right drawer.

## App Screenshots

# First view

![screencapture-emailbuilder-alpha-vercel-app-2021-05-17-14_32_14](https://user-images.githubusercontent.com/30428839/118464228-3e79be80-b71e-11eb-9c9c-a1d5ef025e59.png)

# After adding component / Editable settings

![screencapture-localhost-3000-2021-05-17-14_42_22](https://user-images.githubusercontent.com/30428839/118464342-5fdaaa80-b71e-11eb-8e19-3373b6e111ed.png)

# Genrated HTML

![screencapture-file-Users-shivamkrishna-Downloads-Email-1621242620238-html-2021-05-17-14_41_01](https://user-images.githubusercontent.com/30428839/118464248-433e7280-b71e-11eb-8211-b0c5649317f6.png)



### Folder Structure

/Users/shivamkrishna/Desktop/github/emailbuilder
├── node_modules
├── package.json
├── public
├── src
|  ├── App.css
|  ├── App.js
|  ├── App.test.js
|  ├── axios.js
|  ├── component
|  |  ├── Button.js
|  |  ├── Edit.js
|  |  ├── Options.js
|  |  ├── test.js
|  |  └── utils.js
|  ├── config
|  |  └── constant.js
|  ├── index.css
|  ├── index.js
|  ├── logo.svg
|  ├── reportWebVitals.js
|  ├── service-worker.js
|  ├── serviceWorkerRegistration.js
|  ├── setupTests.js
|  └── utils.js