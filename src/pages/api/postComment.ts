import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId, Db } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

async function connectToDatabase(): Promise<Db> {
  await client.connect();
  return client.db("join_my_band");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      const db = await connectToDatabase();
      const submissions = db.collection("submissions");

      const { submissionId, comment } = body;

      const submission = await submissions.findOne({
        _id: new ObjectId(submissionId),
      });

      if (submission) {
        if (!submission.comments) {
          submission.comments = [];
        }
        submission.comments.push(comment);
        await submissions.updateOne(
          { _id: new ObjectId(submissionId) },
          { $set: { comments: submission.comments } }
        );
        res
          .status(201)
          .json({ success: true, message: "Comment appended successfully" });
      } else {
        res.status(404).json({ success: false, error: "Submission not found" });
      }
    } catch (error) {
      console.error("Error while appending comment:", error);
      res
        .status(500)
        .json({ success: false, error: "Error while appending comment" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
