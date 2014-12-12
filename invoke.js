// Code example to invoke a lambda function from code...
var fs = require('fs');
var aws = require('aws-sdk');
aws.config.loadFromPath('client-config.json');
var lambda = new aws.Lambda({apiVersion: '2014-11-11'});

var event = {
  platform: "gcm",
  gcm_api_key: "TODO",
  tokens: ["reg id"],
  message: "You have a message!",
  collapse_key: "push_message",
  delay_while_idle: false,
  custom_data: {
    foo: "bar"
  }
}

var params = {
  FunctionName: 'aws-lambda-gcm-push-message-production',
  InvokeArgs: JSON.stringify(event)
};
lambda.invokeAsync(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
