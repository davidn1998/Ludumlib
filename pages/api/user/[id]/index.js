import { connectToDatabase } from "../../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { id },
  } = await req;

  const user = await db.collection("users").findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ error: `User with id: ${id} not found` });
  }

  return res.status(200).json(user);
};
