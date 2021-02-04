import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import nextConnect from "next-connect";
import multer from "multer";

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const uploadPFP = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("imageFile");

// Adds the middleware to Next-Connect
uploadPFP.use(uploadMiddleware);

// Process a POST request
uploadPFP.post(async (req, res) => {
  const {
    query: { id },
  } = await req;

  console.log(id);

  const file = await req.file;

  console.log(file);
  console.log(process.env.S3_ACCESS_KEY_ID);

  const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

  const config = {
    Key: `profile-pics/${id}-pfp.jpg`,
    Bucket: "ludumlib",
    Body: fs.createReadStream(file.path),
  };

  s3.upload(config, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not upload image" });
    } else {
      return res.status(200).json(data);
    }
  });
});

export default uploadPFP;

export const config = {
  api: {
    bodyParser: false,
  },
};
