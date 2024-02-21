import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

interface Like {
  _id: string;
  ip_id: string;
  sub_id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      const { ip_id, sub_id } = body;

      await client.connect();
      const database = client.db("join_my_band");
      const likesCollection = database.collection<Like>("likes");

      // Check if a like with the same ip_id and sub_id exists
      const existingLike = await likesCollection.findOne({ ip_id, sub_id });

      if (existingLike) {
        // If a like already exists, remove it
        await likesCollection.deleteOne({ _id: existingLike._id });
        res.status(200).json({ success: true, message: "Like removed" });
      } else {
        // If no existing like, add the new like
        await likesCollection.insertOne(body);
        res.status(201).json({ success: true, message: "Like added" });
      }
    } catch (error) {
      console.error("Error adding like:", error);
      res.status(500).json({ success: false, error: "Error adding like" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
