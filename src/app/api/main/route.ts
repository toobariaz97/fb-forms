// pages/api/getLocation.ts
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers["x-forwarded-for"];
  console.log(ip);

  // Fetch geolocation data based on the IP address
  //   const response = await fetch(`http://ip-api.com/json/${ip}`, {});
  //   const locationData = await response.json();

  //   res.status(200).json(locationData);
}
