import db from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM `tour_dates`');
    const res = new Response(JSON.stringify(rows), { status: 200 });
    return res;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch tour dates' }), { status: 500 });
  }
}


export async function DELETE(req)
{
  try {
    const{id} = await req.json();
    const result = await db.query('DELETE FROM `tour_dates` WHERE id = ?', [id]);
    if (result[0].affectedRows > 0)
    {
      return new Response(JSON.stringify({ message: 'Record deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    else
    {
      return new Response(Json.stringify({message: 'Record not found'}), {
        status: 404,
        headers: {'Content-Type': 'application/json'}
      });
    }
  }
  catch (error)
  {
    return new Response(JSON.stringify({ error: 'Failed to delete record' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req)
{
  try{
    const { date, venue, city, state, ticketURL, address } = await req.json();

    const result = await db.query('INSERT INTO tour_dates(date, venue, city, state, ticket_url, address) VALUES(?, ?, ?, ?, ?, ?);', [date, venue, city, state, ticketURL, address]);

    if (result[0].affectedRows > 0){
      return new Response(
        JSON.stringify({ message: 'Record created successfully' }),
        {
          status: 201, // 201 Created status
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    else{
      return new Response( JSON.stringify({ message: 'Failed to create record' }),
        {
          status: 400, // Bad Request status for failure
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
  catch (error)
  {
    return new Response(JSON.stringify({ error: 'Failed to create record' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}