// import S3 from "aws-sdk/clients/s3";
// import fs from "fs";
// import nextConnect from "next-connect";
// import multer from "multer";

// Returns a Multer instance that provides several methods for generating
// // middleware that process files uploaded in multipart/form-data format.
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// const uploadPFP = nextConnect({
//   // Handle any other HTTP method
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// const uploadMiddleware = upload.single("imageFile");

// // Adds the middleware to Next-Connect
// uploadPFP.use(uploadMiddleware);

// // Process a POST request
// uploadPFP.post(async (req, res) => {
//   const {
//     query: { id },
//   } = await req;

//   const file = await req.file;

//   const s3 = new S3({
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   });

//   const config = {
//     Key: `profile-pics/${id}-pfp.jpg`,
//     Bucket: "ludumlib",
//     Body: file.buffer,
//   };

//   s3.upload(config, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Could not upload image" });
//     } else {
//       return res.status(200).json(data);
//     }
//   });
// });

// export default uploadPFP;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import aws from "aws-sdk";

export default async function handler(req, res) {
  const {
    query: { id },
  } = await req;

  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: `profile-pics/${id}-pfp.jpg`,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 5000000], // up to 5 MB
    ],
  });

  res.status(200).json(post);
}
