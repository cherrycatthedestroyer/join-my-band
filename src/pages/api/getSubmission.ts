import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const submissionIndex = parseInt(query.index as string, 10);

  if (method === "GET") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const collection = database.collection("submissions");

      const submission = await collection.findOne(
        {},
        { skip: submissionIndex }
      );

      if (!submission) {
        res.status(404).json({ success: false, error: "Submission not found" });
        return;
      }

      res.status(200).json({ success: true, data: submission });
    } catch (error) {
      console.error("Error while retrieving submission:", error);
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
