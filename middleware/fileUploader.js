const multer = require('multer')
// const UPLOAD_FOLDER = require(".././uploads")
const UPLOAD_FOLDER = "./uploads"
const  path  = require('path')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER)
  },
  filename:  (req, file, cb)=> {
    const fileExt = path.extname(file.originalname)
    const fileName = file.originalname
      .replace(fileExt, " ")
      .toLowerCase()
      .split(" ")
      .join("-") + Date.now()
    cb(null, fileName + fileExt);

  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000
  },
  fileFilter: (req, file, cb) => {
    if (
        file.originalname.match(/\.(xlsx|xls)$/)
    ) {
      cb(null, true)
    } else {
      cb(new Error("Only excel file allowed!"))
    }
  }
})
module.exports = { upload }