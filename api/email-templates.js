const path = require("path")

const templateList = [
  {
    templateId: "ocho-fitness-schedule-session",
    templateSubject: "Ocho Fitness - Schedule Session",
  },
  {
    templateId: "ocho-fitness-contact-form",
    templateSubject: "Ocho Fitness - Contact Form",
  },
]

templateList.reduce((acc, templateInfo) => {
  const {templateId} = templateInfo
  if (acc[templateId] === 1) {
    throw new Error(
      `Error: Duplicate SES template id "${templateId}", they should be unique`
    )
  }
  acc[templateId] = 1
  return acc
}, {})

/**
 * @param {Object} serverless - Serverless instance
 * @param {Object} _options - runtime options
 * @returns {Promise<{name: string, subject: string, html: string, text}[]>}
 */
module.exports = async (serverless, _options) => {
  // You can load template configuration from filesystem using serverless object + runtime options
  // or from any other source like database or API

  return templateList.map((templateInfo) => {
    const {templateId, templateSubject} = templateInfo
    const templatePathHtml = path.join(
      __dirname,
      `../email/dist/${templateId}.html`
    )

    return {
      name: templateId,
      subject: templateSubject,
      html: serverless.utils.readFileSync(templatePathHtml),
    }
  })
}
