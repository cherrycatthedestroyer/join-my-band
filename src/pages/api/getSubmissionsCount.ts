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
      const collection = database.collection("submissions");

      const totalDocuments = await collection.countDocuments();

      res.status(200).json({ success: true, total: totalDocuments });
    } catch (error) {
      console.error("Error while retrieving total count:", error);
      res
        .status(500)
        .json({ success: false, error: "Error while retrieving total count" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
