import { connectToDatabase } from "../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";
import { parseISO } from "date-fns";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    user,
    game,
    hours,
    dateFrom,
    dateTo,
    pageSize,
    page,
  } = await req.query;

  const queryParams = {};

  if (user?.length > 0) queryParams.user = user;
  if (game?.length > 0) queryParams["game.value"] = parseInt(game);
  if (hours?.length > 0) queryParams.hours = parseFloat(hours);
  if (dateTo || dateFrom) queryParams.date = {};
  if (dateFrom?.length > 0) queryParams.date["$gte"] = parseISO(dateFrom);
  if (dateTo?.length > 0) queryParams.date["$lte"] = parseISO(dateTo);

  const count = await db.collection("logs").countDocuments(queryParams);

  const logs = await db
    .collection("logs")
    .find(queryParams)
    .sort({ date: -1, _id: 1 })
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
    game: log.game,
    hours: parseFloat(log.hours),
    date: parseISO(log.date),
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
