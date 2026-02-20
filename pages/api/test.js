// Example Next.js API route
export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ 
      message: 'Frontend API route working',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
