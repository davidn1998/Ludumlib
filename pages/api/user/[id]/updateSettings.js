import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    const {
      query: { id },
    } = await req;

    const updates = await req.body;
    const userExists = await db
      .collection("users")
      .findOne({ username: updates.username });
    if (userExists && userExists._id !== id) {
      return res.status(400).json({
        success: false,
        data: { message: "Username already exists" },
        message: "Username already exists",
      });
    }
    const result = await db
      .collection("users")
      .updateOne(
        { _id: id },
        { $set: { username: updates.username, fullname: updates.fullname } }
      );
    return res
      .status(200)
      .json({ username: updates.username, fullname: updates.fullname });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};
