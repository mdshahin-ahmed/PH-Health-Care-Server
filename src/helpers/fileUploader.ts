import multer from "multer";
import path from "path";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "diqirua3k",
  api_key: "768723949382635",
  api_secret: "qUTNU9SLG8fGquiPuQ1OBRza-kU",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  cloudinary.uploader.upload(
    "E:/Level2/POSTGRESQL/PH-Health-Care-Server/uploads/test.jpg",
    { public_id: "olympic_flag" },
    function (error, result) {
      console.log(result);
    }
  );
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
