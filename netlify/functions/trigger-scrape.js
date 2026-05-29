exports.handler = async function(event, context) {
  const N8N_WEBHOOK = 'https://n8n-external.exservice.io/webhook/food-assistant-scrape';

  try {
    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'html_scrape_button',
        area: 'asoke',
        timestamp: new Date().toISOString(),
        project: 'AI Food Assistant'
      })
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ok: true, n8nStatus: response.status })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
