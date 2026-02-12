export async function POST(request) {
  try {
    let resumeText, jobDescText;
    
    try {
      const body = await request.json();
      resumeText = body.resumeText;
      jobDescText = body.jobDescText;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!resumeText || !jobDescText) {
      console.error('Missing data:', { hasResume: !!resumeText, hasJobDesc: !!jobDescText });
      return new Response(
        JSON.stringify({ error: 'Resume and job description are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error('API key not found');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `You are a professional resume optimizer. Analyze the following resume against the job description and provide specific, actionable bullet points that should be modified or added to better match the job requirements.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescText}

Please provide your response as a JSON array with this structure:
[
  {
    "id": 1,
    "original": "Original resume bullet point or section",
    "suggested": "How it should be changed to match the job description",
    "keyword": "Key skill/requirement from job description it addresses"
  }
]

Focus on:
1. Keywords and skills mentioned in the job description
2. Quantifiable achievements that match the role
3. Industry-specific terminology
4. Requirements that are missing from the resume

Provide at least 5-8 suggestions. Return ONLY the JSON array, no other text.`,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error('Anthropic error:', anthropicResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: `API error: ${anthropicResponse.status}` }),
        { status: anthropicResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await anthropicResponse.json();
    let content = data.content[0].text;
    content = content.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(content);

    return new Response(JSON.stringify({ suggestions: parsed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
