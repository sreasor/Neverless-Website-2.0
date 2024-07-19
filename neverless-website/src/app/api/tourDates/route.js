import db from '../../../lib/db';

export async function GET() {
  try {
    console.log("Attempting to access the table");
    const [rows] = await db.query('SELECT * FROM `tour_dates`');
    console.log("Rows retrieved from database:", rows);
    const res = new Response(JSON.stringify(rows), { status: 200 });
    return res;
  } catch (error) {
    console.error("Error fetching tour dates:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tour dates' }), { status: 500 });
  }
}
