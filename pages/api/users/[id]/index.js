import { connectToDatabase } from "../../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await db.collection("users").findOne({ _id: req.query.id });

  if (!user) {
    return res
      .status(404)
      .json({ error: `User with id: ${req.query.id} not found` });
  }

  return res.status(200).json(user);
});

handler.use(validateFirebaseIdToken);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();

  const updates = await req.body;
  const userExists = await db
    .collection("users")
    .findOne({ username: updates.username });
  if (userExists && userExists._id !== req.user.uid) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }
  const result = await db.collection("users").updateOne(
    { _id: req.user.uid },
    {
      $set: {
        username: updates.username,
        fullname: updates.fullname,
        bio: updates.bio,
        pfp: {
          name: updates.pfp?.name,
          uri: updates.pfp?.uri,
        },
      },
    }
  );

  return res.status(200).json({
    username: updates.username,
    fullname: updates.fullname,
    bio: updates.bio,
    pfp: {
      name: updates.pfp?.name,
      uri: updates.pfp?.uri,
    },
  });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await db.collection("users").deleteOne({ _id: req.user.uid });

  return res.status(200).json({ Success: "Account Deleted" });
});

export default handler;
