const config = require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

module.exports = {
  /**
   * @param  {string} directory
   * @param  {string} fileNamePrefix
   * @param  {boolean} isFileNameRandom=false
   * @param  {regex} fileExtension=/\.(jpg|jpeg|png|gif|pdf|txt|JPG|PNG|JPEG/
   */
  uploader: (
    directory,
    fileNamePrefix,
    isFileNameRandom = false,
    fileExtension = /\.(jpg|jpeg|png|gif|pdf|txt|JPG|PNG|JPEG)/
  ) => {
    // Setting multer
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = process.env.FILE_STORAGE + directory;

        if (fs.existsSync(pathDir)) {
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
        }
      },
      filename: (req, file, cb) => {
        let ext = file.originalname.split(".");
        // Check filename mau random / tidak
        let filename = isFileNameRandom
          ? ""
          : fileNamePrefix + Date.now() + "." + ext[ext.length - 1];
        cb(null, filename);
      },
    });

    // Check extension file
    const fileFilter = (req, file, cb) => {
      const ext = fileExtension;
      if (!file.originalname.match(ext)) {
        return cb(new Error("Your file type are denied", false));
      }
      cb(null, true);
    };

    return multer({
      storage,
      fileFilter,
    });
  },
};
