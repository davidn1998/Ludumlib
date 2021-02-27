import { connectToDatabase } from "../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const { game, user, pageSize, page } = await req.query;

  const queryParams = {};

  if (user?.length > 0) queryParams.user = user;
  if (game?.length > 0) queryParams.games = game;

  const count = await db.collection("lists").countDocuments(queryParams);

  const lists = await db
    .collection("lists")
    .find(queryParams)
    .sort({ date: -1 })
    .skip(parseInt((page - 1) * pageSize))
    .limit(parseInt(pageSize))
    .toArray();

  return res.status(200).json({ lists, count: count });
});

handler.use(validateFirebaseIdToken);

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();

  const list = await req.body;

  const currDate = new Date();

  await db.collection("lists").insertOne({
    ...list,
    user: req.user.uid,
    date: currDate,
  });

  return res.status(200).json({ ...list, user: req.user.uid, date: currDate });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    await db.collection("lists").deleteMany({ user: req.user.uid });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not delete lists" });
  }

  return res.status(200).json({ message: "Lists deleted" });
});

export default handler;
