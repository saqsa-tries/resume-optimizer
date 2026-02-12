export async function GET(request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          status: 'ERROR',
          message: 'API key is NOT set',
          availableVars: Object.keys(process.env).filter(k => k.includes('API') || k.includes('ANTHROPIC'))
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        status: 'OK',
        message: 'API key is set',
        keyPreview: apiKey.substring(0, 20) + '...'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 'ERROR', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
