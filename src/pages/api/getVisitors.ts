import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const collection = database.collection("visitors");
      const submissions = await collection.find({}).toArray();
      res.status(200).json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error while retrieving visitors:", error);
      res
        .status(500)
        .json({ success: false, error: "Error while retrieving submissions" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
