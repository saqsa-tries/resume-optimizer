export async function POST(req) {
  try {
    const body = await req.json();
    const resumeText = body.resumeText || '';
    const jobDescText = body.jobDescText || '';

    if (!resumeText.trim() || !jobDescText.trim()) {
      return Response.json({ error: 'Resume and job description are required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'Server not configured properly' }, { status: 500 });
    }

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
            content: `Analyze this resume against the job description. Return ONLY a JSON array with 5-8 suggestions:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescText}

Format: [{"id":1,"original":"text","suggested":"text","keyword":"skill"}]`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return Response.json({ error: 'Claude API error' }, { status: response.status });
    }

    const data = await response.json();
    let text = data.content[0].text.trim();
    text = text.replace(/```json\n?|\n?```/g, '');
    const suggestions = JSON.parse(text);

    return Response.json({ suggestions });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Server error processing request' }, { status: 500 });
  }
}
