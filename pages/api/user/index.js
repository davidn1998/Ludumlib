import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const user = await req.body;
    const userExists = await db
      .collection("users")
      .findOne({ username: user.username });
    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const result = await db.collection("users").insertOne(user);
    return res.status(200).json(user);
  } else {
    return res.status(404).json({});
  }
};
