import { Storage } from "@google-cloud/storage";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../../util/authenticateUser";

const handler = nextConnect();

handler.use(validateFirebaseIdToken);
handler.get(async (req, res) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(
        new RegExp("\\\\n", "g"),
        "\n"
      ),
    },
  });

  if (req.query.oldImage) {
    // Deletes old pfp file from the bucket
    try {
      await storage
        .bucket(process.env.BUCKET_NAME)
        .file(`profile-pics/${req.query.oldImage}.jpg`)
        .delete();
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Could not update profile picture" });
    }
  }

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const file = bucket.file(`profile-pics/${req.query.newImage}.jpg`);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
});

handler.delete(async (req, res) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(
        new RegExp("\\\\n", "g"),
        "\n"
      ),
    },
  });

  if (req.body.image) {
    // Deletes pfp file from the bucket
    try {
      await storage
        .bucket(process.env.BUCKET_NAME)
        .file(`profile-pics/${req.body.image}.jpg`)
        .delete();
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Could not update profile picture" });
    }
  }

  return res.status(200).json({ message: "Profile Pic Deleted" });
});

export default handler;
