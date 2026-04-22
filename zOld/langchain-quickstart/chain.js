import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import {StringOutputParser} from "@langchain/core/output_parsers"

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "You are an expert in {area_of_expertise}"],
    ["user","{question}"]
])

const stringParser = new StringOutputParser()

//pipe
const chatChain = promptTemplate.pipe(model).pipe(stringParser)

//invoke
const response = await chatChain.invoke({
    area_of_expertise: "Computer Engineering",
    question: "How do CPUs work?"
})

console.log("Response: "+response)