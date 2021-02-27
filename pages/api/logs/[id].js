import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from "mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const log = await db.collection("logs").findOne({ _id: ObjectID(id) });

  if (!log) {
    return res.status(404).json({ message: `Log with id: ${id} not found` });
  }

  return res.status(200).json(log);
});

handler.use(validateFirebaseIdToken);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const log = await db.collection("logs").findOne({ _id: ObjectID(id) });

  if (log.user !== req.user.uid) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }

  const updates = await req.body;
  await db.collection("logs").updateOne(
    { _id: ObjectID(id) },
    {
      $set: {
        date: updates.date,
        game: updates.game,
        hours: updates.hours,
      },
    }
  );

  return res.status(200).json({
    date: updates.date,
    game: updates.game,
    hours: updates.hours,
  });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const log = await db.collection("logs").findOne({ _id: ObjectID(id) });

  if (log.user !== req.user.uid) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }
  await db.collection("logs").deleteOne({ _id: ObjectID(id) });

  return res.status(200).json({ Success: "log Deleted" });
});

export default handler;
