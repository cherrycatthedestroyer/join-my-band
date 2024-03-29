import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const ip_id = query.ip as string;

  if (method === "GET") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const collection = database.collection("visitors");

      const visitor = await collection.findOne({ ip_id: ip_id });

      if (!visitor) {
        res.status(200).json({ success: false, error: "Submission not found" });
        return;
      }

      res.status(200).json({ success: true, data: visitor });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error while retrieving submission" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
