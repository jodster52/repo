import {ChatPromptTemplate} from "@langchain/core/prompts"

const messages = [
    ["system", "You are a JavaScript Expert"],
    ["user", "{question}"]
]

const myChatPrompt = ChatPromptTemplate.fromMessages(messages)

const prompt = await myChatPrompt.invoke({
    question: "What is a Closure"
})

console.log(prompt.toChatMessages())