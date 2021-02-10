import { connectToDatabase } from "../../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const {
      query: { id },
    } = await req;

    const user = await db.collection("users").findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: `User with id: ${id} not found` });
    }

    return res.status(200).json(user);
  } else if (req.method === "PUT") {
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
    const result = await db.collection("users").updateOne(
      { _id: id },
      {
        $set: {
          username: updates.username,
          fullname: updates.fullname,
          pfp: {
            name: updates.pfp?.name,
            uri: updates.pfp?.uri,
          },
        },
      }
    );

    return res.status(200).json({
      username: updates.username,
      fullname: updates.fullname,
      pfp: {
        name: updates.pfp?.name,
        uri: updates.pfp?.uri,
      },
    });
  } else if (req.method === "DELETE") {
    const {
      query: { id },
    } = await req;

    const user = await db.collection("users").deleteOne({ _id: id });

    return res.status(200).json({ Success: "Account Deleted" });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};
