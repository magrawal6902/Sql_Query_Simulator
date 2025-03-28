import { HfInference } from "@huggingface/inference";


const key = "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"
console.log(key);

const inference = new HfInference(key);
const model = "cssupport/t5-small-awesome-text-to-sql";

const response = await inference.textGeneration({
    model: model,
    inputs: prompt,
});
console.log(response);

// setSqlQuery(response.generated_text);