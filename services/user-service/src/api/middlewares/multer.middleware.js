import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
      console.log("destination")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      console.log("filename")
    }
  })
  
export const upload = multer({ storage })