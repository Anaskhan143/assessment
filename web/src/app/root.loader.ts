export async function loader() {
  // This runs on the server side
  return { message: 'App loaded' };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const theme = formData.get('theme') as string;
  const language = formData.get('language') as string;

  if (theme) {
    return new Response(JSON.stringify({ success: true, theme }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `theme=${theme}; Max-Age=${365 * 24 * 60 * 60}; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }

  if (language) {
    return new Response(JSON.stringify({ success: true, language }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `language=${language}; Max-Age=${365 * 24 * 60 * 60}; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
