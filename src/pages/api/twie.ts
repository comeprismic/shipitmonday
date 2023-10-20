// pages/api/prismicWebhook.js
import axios from 'axios';
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";
import { PageDocument } from '../../../prismicio-types';
import 'dotenv/config'

console.log('process.env.OpenAI', process.env.OpenAIapiKey)
const openai = new OpenAI({
  apiKey: process.env.OpenAIapiKey,
});
export default async (req:any, res:any) => {
  if (req.method === 'POST') {
    // Extract document ID from Prismic's webhook payload
    const documentId:string = req.body.documents[0];
   // Fetch the document from Prismic (assuming you have the document ID)
  const documentContent:PageDocument = await getPrismicDocument(documentId);

    if (documentContent.first_publication_date == documentContent.last_publication_date){
      //NEW DOC
          // Get the document content and send it to GPT-3 for summarization
          const summary:any = await getGPT3Summary(documentContent, documentContent.url);
          // Send the summary to a Slack channel
          await sendToSlack(summary.content);
            res.status(200).send('Webhook received and processed');
    }
    else{
      //OLD DOC REPUBLISHED
      res.status(200).send('Webhook received and processed but old document');
    }

  } 
  else {
    // Method not allowed
    res.status(405).send('Method not allowed');
  }
};
async function getPrismicDocument(documentId:string) {
  // Implement a function to fetch document from Prismic using the document ID
  //documentId = "ZSacwRAAAPsmZnlt";
  const client = createClient();
  const documentPublished:PageDocument = await client.getByID(documentId);
  return documentPublished;  
}
async function getGPT3Summary(content:object, url:string | null) {
  // Implement a function to get the summary of the content from GPT-3
  const prompt = `At the beginning of your message name who wrote wrote the post and the team that they are part of (Something like, John from the Growth Team just released a new update) if you don't know the team please ignore the team, and then Summarize in maximum 450 characters what will be done next week based on that Prismic Document "${JSON.stringify(content)}". Structure the main next action point for the week as bullet list (it should be minimum 5 items and up to 10). Then break the line and Finish the message by : You can learn more at the shipitmonday.vercel.app${url}`;
  
  //console.log("Entering GPT3 Summary with content", content)
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": prompt
      }
    ],
    temperature: 1,
    max_tokens: 450,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message;
}
async function sendToSlack(summary:string) {
  // Implement a function to send the summary to Slack
  const slackWebhookUrl:any = process.env.slackWebhookUrl;
  await axios.post(slackWebhookUrl, {
    text: `${summary}`
  });
}