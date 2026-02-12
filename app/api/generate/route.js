export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  const { resumeText, jobDescText } = await req.json();

  if (!resumeText || !jobDescText) {
    return Response.json({ error: 'Missing resume or job description' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `Analyze this resume against the job description. Return ONLY a JSON array (no other text) with 5-8 suggestions:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescText}

Return this format:
[{"id":1,"original":"original text","suggested":"suggested text","keyword":"relevant skill"}]`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API Error:', response.status, error);
      return Response.json({ error: `API returned ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    let text = data.content[0].text.trim();
    text = text.replace(/```json\n?|\n?```/g, '');
    const suggestions = JSON.parse(text);

    return Response.json({ suggestions });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
