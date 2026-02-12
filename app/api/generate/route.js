export async function POST(req) {
  try {
    console.log('Step 1: Parsing request body');
    const body = await req.json();
    console.log('Step 2: Body parsed, keys:', Object.keys(body));
    
    const resumeText = body.resumeText || '';
    const jobDescText = body.jobDescText || '';
    
    console.log('Step 3: Resume length:', resumeText.length);
    console.log('Step 4: JobDesc length:', jobDescText.length);

    if (!resumeText.trim() || !jobDescText.trim()) {
      console.log('Step 5: Missing data - returning 400');
      return Response.json({ error: 'Resume and job description are required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log('Step 6: API key exists:', !!apiKey);
    
    if (!apiKey) {
      console.log('Step 7: No API key - returning 500');
      return Response.json({ error: 'Server not configured properly' }, { status: 500 });
    }

    const requestBody = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Analyze resume vs job description. Return ONLY JSON array:
RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescText}

Format: [{"id":1,"original":"","suggested":"","keyword":""}]`,
        },
      ],
    };

    console.log('Step 8: Sending to Anthropic');
    console.log('Step 9: Request model:', requestBody.model);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Step 10: Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Step 11: Error response:', errorText);
      return Response.json({ error: `API returned ${response.status}: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log('Step 12: Got response from Anthropic');
    
    let text = data.content[0].text.trim();
    text = text.replace(/```json\n?|\n?```/g, '');
    const suggestions = JSON.parse(text);

    console.log('Step 13: Parsed suggestions, count:', suggestions.length);
    return Response.json({ suggestions });
  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Stack:', error.stack);
    return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
  }
}
