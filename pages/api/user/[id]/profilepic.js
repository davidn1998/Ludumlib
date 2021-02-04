import { Storage } from "@google-cloud/storage";

export default async function handler(req, res) {
  const {
    query: { id },
  } = await req;

  console.log("test log");

  console.log({ private_key: process.env.PRIVATE_KEY });

  console.log("\n\n--------------------\n\n");

  console.log({
    private_key: process.env.PRIVATE_KEY.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    ),
  });

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
    await storage
      .bucket(process.env.BUCKET_NAME)
      .file(`profile-pics/${req.query.oldImage}.jpg`)
      .delete();
  }

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const file = bucket.file(`profile-pics/${req.query.newImage}.jpg`);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
}
