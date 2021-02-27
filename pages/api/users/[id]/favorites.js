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

  if (!user.favorites) return res.status(200).json([]);

  return res.status(200).json(user.favorites);
});

handler.use(validateFirebaseIdToken);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();

  const updates = await req.body;

  await db.collection("users").updateOne(
    { _id: req.user.uid },
    {
      $set: {
        favorites: updates.favorites,
      },
    }
  );

  return res.status(200).json({ favorites: updates.favorites });
});

export default handler;
