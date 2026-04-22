import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["user","Write a poem about the tallest mountains"]
])

const formattedPrompt = await promptTemplate.format({})

const response = await model.invoke(formattedPrompt)

console.log(response.usage_metadata.input_tokens)

console.log(response.usage_metadata.output_tokens)

console.log(response.usage_metadata.total_tokens)