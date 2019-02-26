const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer bODvKqI44csLLH4N4DXl4GOmx2UJGMC+bHLSXeintd5Vn7n8C+2sJ0qtBhDV7TrcCCJ6JmyW9jGghciyMXzp3/2K1xaz7WB8QxBiZk7/WzKE3Yl9SNk9iQmTMomz+TWLENncMzyFY1DetljECvNdjwdB04t89/1O/w1cDnyilFU=`
};

exports.LineBot = functions.https.onRequest((req, res) => {
  if (req.body.events[0].message.type !== 'text') {
    return;
  }
  reply(req.body);
});

const reply = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text
        }
	  ]
    })
  });
};