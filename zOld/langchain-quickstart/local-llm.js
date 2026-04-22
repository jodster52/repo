import { ChatOllama } from "@langchain/ollama";

const localModel = new ChatOllama({
    model: "llama3.2:1b"
})

const prompt = "What is 'Thank you very much, see you next time' in Spanish"

const response = await localModel.invoke(prompt)

console.log(response.content)