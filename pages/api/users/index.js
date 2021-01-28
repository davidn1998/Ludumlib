import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const users = await db.collection("users").find({});

  const usersArray = await users.toArray();

  return res.status(200).json(usersArray);
};
