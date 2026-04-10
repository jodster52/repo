import {ChatGoogleGenerativeAI} from "@langchain/google-genai"


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const response = await model.invoke("What is the capital of France?")

console.log(response)
