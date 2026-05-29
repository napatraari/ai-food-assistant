exports.handler = async function(event, context) {
  var N8N_WEBHOOK = 'https://n8n-external.exservice.io/webhook/food-assistant-scrape';

  try {
    var response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'html_scrape_button',
        area: 'asoke',
        timestamp: new Date().toISOString(),
        project: 'AI Food Assistant'
      })
    });
    var responseText = await response.text();
    console.log('n8n status:', response.status);
    console.log('n8n response:', responseText);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, n8nStatus: response.status, n8nBody: responseText })
    };
  } catch (err) {
    console.log('fetch error:', err.message);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
