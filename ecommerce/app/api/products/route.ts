import { connectToDb } from "../db";

export async function GET() {
  const { db } = await connectToDb();
  const products = await db.collection('products').find({}).toArray();

  console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

    // if (!process.env.DATABASE_URL) {
    // return res.status(500).json({ error: "Missing DATABASE_URL env var" });
    // }

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}