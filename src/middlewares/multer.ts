const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, './Images/'); // Define the folder to save uploaded files
    },
    filename: function (req:any, file:any, cb:any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filename = uniqueSuffix + '-' + file.originalname; // Combine unique suffix and original filename

      cb(null, filename);
    },
  });
  
export const upload = multer({ storage }); 