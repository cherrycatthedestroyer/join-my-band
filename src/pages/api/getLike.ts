import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

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
  const { method, query } = req;
  const input_ip_id = query.ip_id as string;
  const input_sub_id = query.sub_id as string;

  if (method === "GET") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const likesCollection = database.collection<Like>("likes");

      // Search for a like with matching ip_id and sub_id
      const existingLike = await likesCollection.findOne({
        ip_id: input_ip_id,
        sub_id: input_sub_id,
      });

      if (existingLike) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error searching likes:", error);
      res.status(500).json({ success: false, error: "Error searching likes" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
