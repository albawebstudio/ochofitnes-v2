"use strict"

const AWS = require("aws-sdk")
const sesClient = new AWS.SES({apiVersion: "2010-12-01"})

module.exports.contactForm = (event, context, callback) => {
  const data = JSON.parse(event.body)
  let response = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    }
  }

  try {
    sendContactFormToOchoFitness(data)

    // create a response
    response['statusCode'] = 200
    response['body'] = JSON.stringify({
      success: true
    })
  } catch (err) {
    console.error(err)
    response['body'] = JSON.stringify({
      sucess: false,
      message: err.message
    })
  }

  callback(null, response)
}

const sendContactFormToOchoFitness = (data) => {
  // massage data
  sesClient
    .sendTemplatedEmail({
      Destination: {
        ToAddresses: process.env.TO_EMAIL.split(","),
      },
      Source: process.env.SOURCE_EMAIL,
      Template: `ocho-fitness-contact-form_${process.env.STAGE}`,
      TemplateData: JSON.stringify(data),
      ReplyToAddresses: [process.env.REPLY_TO_EMAIL],
    })
    .promise()
    .then(function () {
      console.log("sendContactFormToOchoFitness email queued")
    })
    .catch(function (err) {
      console.error(err, err.stack)
    })
}

module.exports.scheduleSession = async (event, context, callback) => {

  const data = JSON.parse(event.body)
  // create a response
  let response = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    }
  }
  try {
    sendScheduleSessionToOchoFitness(data)
    response['statusCode'] = 200
    response['body'] = JSON.stringify({
      success: true
    })

  } catch (err) {
    console.error(err)
    response['body'] = JSON.stringify({
      success: false,
      message: err.message
    })
  }
  callback(null, response)
}

const sendScheduleSessionToOchoFitness = (data) => {
  sesClient
    .sendTemplatedEmail({
      Destination: {
        ToAddresses: process.env.TO_EMAIL.split(","),
      },
      Source: process.env.SOURCE_EMAIL,
      Template: `ocho-fitness-schedule-session_${process.env.STAGE}`,
      TemplateData: JSON.stringify(data),
      ReplyToAddresses: [data.email],
    })
    .promise()
    .then(function () {
      console.log("SignUpConfirmationToUser email queued")
    })
    .catch(function (err) {
      console.error(err, err.stack)
    })
}
