var gcm = require('node-gcm');

exports.handler = function(event, context) {
  console.log("Running aws gcm push message function");
  console.log("==================================");
  // console.log("event", event);

  var gcmApiKey = null; // Set your GCM API Key if you don't want to submit via the event JSON
  var registrationIds = (event.tokens != null ? event.tokens : []).reduce(function(a, b) { if (a.indexOf(b) < 0) a.push(b); return a;}, []);
  var message = new gcm.Message({
    collapseKey: event.collapse_key,
    data: {
      message: event.message,
      timestamp: (Math.round((new Date()).getTime() / 1000))
    }
  });
  if (event.delay_while_idle != null) {
    message.delayWhileIdle = event.delay_while_idle;
  }
  if (event.time_to_live != null) {
    message.timeToLive = event.time_to_live;
  }
  if (event.custom_data != null) {
    for(var key in event.custom_data) {
      message.data[key] = event.custom_data[key];
    }
  }

  var sender = new gcm.Sender(gcmApiKey != null ? gcmApiKey : event.gcm_api_key);
  sender.send(message, registrationIds, event.retries != null ? event.retries : 3, function (err, result) {
    if (err) {
      console.log("GCM messaging failed: " + err);
    } else {
      console.log("Result: " + JSON.stringify(result));
    }
    context.done();
  });
}
