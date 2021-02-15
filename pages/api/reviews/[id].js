import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from "mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const review = await db.collection("reviews").findOne({ _id: ObjectID(id) });

  if (!review) {
    return res.status(404).json({ message: `Review with id: ${id} not found` });
  }

  return res.status(200).json(review);
});

handler.use(validateFirebaseIdToken);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const review = await db.collection("reviews").findOne({ _id: ObjectID(id) });

  if (review.user !== req.user.uid) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }

  const updates = await req.body;
  await db.collection("reviews").updateOne(
    { _id: id },
    {
      $set: {
        title: updates.title,
        body: updates.body,
        rating: updates.rating,
      },
    }
  );

  return res.status(200).json({
    title: updates.title,
    body: updates.body,
    rating: updates.rating,
  });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = await req.query;

  const review = await db.collection("reviews").findOne({ _id: ObjectID(id) });

  if (review.user !== req.user.uid) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }
  await db.collection("reviews").deleteOne({ _id: ObjectID(id) });

  return res.status(200).json({ Success: "Account Deleted" });
});

export default handler;
