export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error) {
    res.status(401).send(`GitHub OAuth error: ${data.error_description}`);
    return;
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!doctype html><html><body><script>
    window.opener.postMessage('authorization:github:success:${payload}', '*');
    window.close();
  </script></body></html>`);
}
