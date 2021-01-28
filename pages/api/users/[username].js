import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { username },
  } = await req;

  const user = await db.collection("users").findOne({ username: username });

  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }

  return res.status(200).json({ message: "Username is free" });
};
