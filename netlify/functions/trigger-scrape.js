// AI Food Assistant — Netlify Function
// HTML กด "Scrape ใหม่" → ส่ง POST มาที่ฟังก์ชันนี้ → route ไป webhook n8n ของแต่ละย่าน

var AREA_WEBHOOKS = {
  asoke:      'https://n8n-external.exservice.io/webhook/f9d781ee-4918-4911-b883-2545c659b973',
  thonglor:   'https://n8n-external.exservice.io/webhook/fa44db35-13bf-48aa-8916-71a1bca57171',
  ari:        'https://n8n-external.exservice.io/webhook/cb327ed6-6e76-4476-93b6-b3693ae1e64a',
  siam:       'https://n8n-external.exservice.io/webhook/6b34ca74-8b66-438f-af3b-d419e0fcfc67',
  phromphong: 'https://n8n-external.exservice.io/webhook/3600dd47-7920-41c2-af79-fe9412f6772e'
};

exports.handler = async function(event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  // อ่าน area จาก body
  var area = 'asoke';
  try {
    if (event.body) {
      var parsed = JSON.parse(event.body);
      if (parsed && parsed.area) area = String(parsed.area).toLowerCase().trim();
    }
  } catch (e) {
    console.log('body parse error:', e.message);
  }

  // หา webhook URL ของย่าน
  var webhook = AREA_WEBHOOKS[area];
  if (!webhook) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        error: 'Unknown area: ' + area,
        availableAreas: Object.keys(AREA_WEBHOOKS)
      })
    };
  }

  try {
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
    console.log('area:', area, '| n8n status:', response.status);
    console.log('n8n response:', responseText);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        area: area,
        n8nStatus: response.status,
        n8nBody: responseText
      })
    };
  } catch (err) {
    console.log('fetch error:', err.message);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, area: area, error: err.message })
    };
  }
};
