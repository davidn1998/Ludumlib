import { connectToDatabase } from "../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    user,
    game,
    hours,
    dateStart,
    dateEnd,
    pageSize,
    page,
  } = await req.query;

  const queryParams = {};

  if (user?.length > 0) queryParams.user = user;
  if (game?.length > 0) queryParams.game = game;
  if (hours?.length > 0) queryParams.hours = hours;
  if (dateStart?.length > 0 && dateEnd?.length > 0)
    queryParams.date = {
      $gte: new ISODate(dateStart),
      $lte: new ISODate(dateEnd),
    };

  const count = await db.collection("logs").countDocuments(queryParams);

  const logs = await db
    .collection("logs")
    .find(queryParams)
    .sort({ date: -1 })
    .skip(parseInt((page - 1) * pageSize))
    .limit(parseInt(pageSize))
    .toArray();

  return res.status(200).json({ logs, count: count });
});

handler.use(validateFirebaseIdToken);

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();

  const log = await req.body;

  await db.collection("logs").insertOne({
    ...log,
    user: req.user.uid,
  });

  return res.status(200).json({ ...log, user: req.user.uid });
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    await db.collection("logs").deleteMany({ user: req.user.uid });
  } catch (err) {
    return res.status(500).json({ message: "Could not delete logs" });
  }

  return res.status(200).json({ message: "Logs deleted" });
});

export default handler;
