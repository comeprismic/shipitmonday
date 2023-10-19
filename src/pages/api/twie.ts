// pages/api/prismicWebhook.js
import axios from 'axios';
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OpenAIapiKey,
});
export default async (req, res) => {
  if (req.method === 'GET') {
    // Extract document ID from Prismic's webhook payload
    const documentId = req.body.id;
    // Fetch the document from Prismic (assuming you have the document ID)
    const prismicDocument = await getPrismicDocument(documentId);
    
    // Get the document content and send it to GPT-3 for summarization
   // const summary = await getGPT3Summary(documentContent);
    // Send the summary to a Slack channel
   // await sendToSlack(summary);
    res.status(200).send('Webhook received and processed');
  } else {
    res.status(405).send('Method not allowed');
  }
};
async function getPrismicDocument(documentId) {
  // Implement a function to fetch document from Prismic using the document ID
  console.log("GET PRISMIC DOCS");
  documentId = "ZSacwRAAAPsmZnlt";
  const client = createClient();
  const documentPublished = await client.getByID(documentId);
  console.log("doc",documentPublished.data)
  console.log("url", documentPublished.url);
  const summary = await getGPT3Summary(documentPublished.data,documentPublished.url);
  await sendToSlack(summary);
  return documentPublished;
}
async function getGPT3Summary(content, url) {
  console.log("Enter GPT Function", content);
  // Implement a function to get the summary of the content from GPT-3
  //const gpt3Endpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const prompt = `At the beginning of your message name who wrote wrote the post and the team that they are part of (Something like, John from the Growth Team just released a new update), and then Summarize what will be done next week based on that Prismic Document "${JSON.stringify(content)}" structure the main next action point for the week as bullet list, and then provide a link of the relevant page on the shipitmonday.vercel.app${url} website thanks to the url of the content`;
  
  console.log("prompt", prompt);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": prompt
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log("response from ChatGPT : ", response);
  console.log("summary", response.choices[0].message);
  return response.choices[0].message;
}
async function sendToSlack(summary) {
  console.log("send to slack");
  // Implement a function to send the summary to Slack
  const slackWebhookUrl = process.env.slackWebhookUrl;
  await axios.post(slackWebhookUrl, {
    text: `${summary.content}`
  });
}