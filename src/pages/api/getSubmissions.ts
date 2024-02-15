import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const page = (parseInt(query.page as string, 10) || 0) - 1;

  if (method === "GET") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const collection = database.collection("submissions");
      const submissions = await collection.find({}).toArray();
      res.status(200).json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error while retrieving submissions:", error);
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
