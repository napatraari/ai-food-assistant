exports.handler = async function(event, context) {

  const WEBHOOKS = {
    asoke:      'https://n8n-external.exservice.io/webhook/food-assistant-scrape',
    thonglor:   'https://n8n-external.exservice.io/webhook/fa44db35-13bf-48aa-8916-71a1bca57171',
    ari:        'https://n8n-external.exservice.io/webhook/83c604de-6099-45ce-825c-cba532a03aaf',
    siam:       'https://n8n-external.exservice.io/webhook/944b8532-c059-4e4d-9519-4928fc368c7a',
    phromphong: 'https://n8n-external.exservice.io/webhook/349411e0-4ea7-4e32-8661-fc4c64de5ed8'
  };

  try {
    var body = JSON.parse(event.body || '{}');
    var area = body.area || 'asoke';
    var webhook = WEBHOOKS[area] || WEBHOOKS['asoke'];

    var response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'html_scrape_button',
        area: area,
        timestamp: new Date().toISOString(),
        project: 'AI Food Assistant'
      })
    });
    var responseText = await response.text();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, area: area, n8nStatus: response.status })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
