import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      await client.connect();
      const database = client.db("join_my_band");
      const collection = database.collection("visitors");
      const result = await collection.insertOne(body);
      console.log(
        `Successfully inserted document with _id: ${result.insertedId}`
      );

      // Retrieve the inserted document by querying with its ID
      const insertedId = result.insertedId;
      const insertedDocument = await collection.findOne({
        _id: new ObjectId(insertedId),
      });

      res.status(201).json({ success: true, data: insertedDocument });
    } catch (error) {
      console.error("Error while inserting document:", error);
      res
        .status(500)
        .json({ success: false, error: "Error while inserting document" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
