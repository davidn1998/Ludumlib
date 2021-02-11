import { connectToDatabase } from "../../../util/mongodb";
import nextConnect from "next-connect";
import validateFirebaseIdToken from "../../../util/authenticateUser";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { username, validate },
  } = await req;

  let user = null;

  if (username) {
    user = await db.collection("users").findOne({ username: username });

    if (validate === "true") {
      if (user) {
        return res.status(400).json({ message: `Username already taken` });
      } else {
        return res.status(200).json({ message: `Username available` });
      }
    }

    if (user) {
      return res.status(200).json(user);
    }

    return res
      .status(404)
      .json({ message: `User with username: ${username} not found.` });
  }
  const users = await db.collection("users").find({});

  const usersArray = await users.toArray();

  return res.status(200).json(usersArray);
});

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await req.body;
  const userExists = await db
    .collection("users")
    .findOne({ username: user.username });
  if (userExists) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const result = await db.collection("users").insertOne(user);
  return res.status(200).json(user);
});

export default handler;
