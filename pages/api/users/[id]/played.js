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

  if (!user.likes) return res.status(200).json([]);

  return res.status(200).json(user.played);
});

handler.use(validateFirebaseIdToken);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();

  const updates = await req.body;

  await db.collection("users").updateOne(
    { _id: req.user.uid },
    {
      $push: {
        played: updates.game,
      },
    }
  );

  return res.status(200).json({ message: "Added to Played Games" });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();

  const updates = await req.body;

  await db.collection("users").updateOne(
    { _id: req.user.uid },
    {
      $pull: {
        played: updates.game,
      },
    }
  );

  return res.status(200).json({ Success: "Removed from Played Games" });
});

export default handler;
