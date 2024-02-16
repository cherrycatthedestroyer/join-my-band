import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.status(200).json({ ip });
};
