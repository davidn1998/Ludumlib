import { connectToDatabase } from "../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";
import MiniReview from "../../../components/MiniReview";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const reviews = await db.collection("reviews").find({});

  const reviewsArray = await reviews.toArray();

  return res.status(200).json(reviewsArray);
});

handler.use(validateFirebaseIdToken);

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();

  const review = await req.body;

  const reviewExists = await db
    .collection("reviews")
    .findOne({ user: req.user.uid, game: review.game });

  if (reviewExists) {
    return res.status(400).json({ message: "Review already exists" });
  }

  const result = await db
    .collection("reviews")
    .insertOne({ ...review, user: req.user.uid });
  return res.status(200).json({ ...review, user: req.user.uid });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    await db.collection("reviews").deleteMany({ user: req.user.uid });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not delete reviews" });
  }

  return res.status(200).json({ message: "reviewsDeleted" });
});

export default handler;
