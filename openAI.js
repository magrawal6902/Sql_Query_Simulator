import OpenAI from "openai";
 
const openai = new OpenAI({
  apiKey: "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",
});
 
const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});
 
completion.then((result) => console.log(result.choices[0].message));