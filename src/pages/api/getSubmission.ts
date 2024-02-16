import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const submissionId = query.id as string;

  if (method === "GET") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const collection = database.collection("submissions");

      const submission = await collection.findOne({
        _id: new ObjectId(submissionId),
      });

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
