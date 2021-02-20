import { connectToDatabase } from "../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const { rating, game, user, pageSize, page } = await req.query;

  const queryParams = {};

  if (user?.length > 0) queryParams.user = user;
  if (game?.length > 0) queryParams.game = game;
  if (rating?.length > 0) queryParams.rating = rating;

  const count = await db.collection("reviews").countDocuments();

  const reviews = await db
    .collection("reviews")
    .find(queryParams)
    .sort({ date: -1 })
    .skip(parseInt((page - 1) * pageSize))
    .limit(parseInt(pageSize))
    .toArray();

  return res.status(200).json({ reviews, count: count });
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

  const currDate = new Date();

  await db.collection("reviews").insertOne({
    ...review,
    user: req.user.uid,
    date: currDate,
  });

  return res
    .status(200)
    .json({ ...review, user: req.user.uid, date: currDate });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    await db.collection("reviews").deleteMany({ user: req.user.uid });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not delete reviews" });
  }

  return res.status(200).json({ message: "Reviews deleted" });
});

export default handler;
