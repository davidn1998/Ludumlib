import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from "mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const list = await db.collection("lists").findOne({ _id: ObjectID(id) });

  if (!list) {
    return res.status(404).json({ message: `List with id: ${id} not found` });
  }

  return res.status(200).json(list);
});

handler.use(validateFirebaseIdToken);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const list = await db.collection("lists").findOne({ _id: ObjectID(id) });

  if (list.user !== req.user.uid) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }

  const updates = await req.body;
  await db.collection("lists").updateOne(
    { _id: ObjectID(id) },
    {
      $set: {
        title: updates.title,
        description: updates.description,
        games: updates.games,
      },
    }
  );

  return res.status(200).json({
    title: updates.title,
    description: updates.description,
    games: updates.games,
  });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  console.log(id);

  const list = await db.collection("lists").findOne({ _id: ObjectID(id) });

  if (list.user !== req.user.uid) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }
  await db.collection("lists").deleteOne({ _id: ObjectID(id) });

  return res.status(200).json({ Success: "List Deleted" });
});

export default handler;
