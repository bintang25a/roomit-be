import multer from "multer";
import path from "path";
import fs from "fs";

const folderPath = "./uploads";
if (!fs.existsSync(folderPath)) {
   fs.mkdirSync(folderPath);
}

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
   },
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 2 * 1024 * 1024 },
   fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(
         path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) return cb(null, true);
      cb(new Error("Only images are allowed (.jpg, .jpeg, .png)"));
   },
});

export default upload;
