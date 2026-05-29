exports.handler = async function(event, context) {
  const N8N_WEBHOOK = 'https://n8n-external.exservice.io/webhook/food-assistant-scrape';

  fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      trigger: 'html_scrape_button',
      area: 'asoke',
      timestamp: new Date().toISOString(),
      project: 'AI Food Assistant'
    })
  }).catch(function() {});

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ok: true, message: 'Scrape triggered' })
  };
};
