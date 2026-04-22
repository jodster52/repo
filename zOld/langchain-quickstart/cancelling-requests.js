import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `Reply every prompt in Spanish`],
    ["user","{input}"]
])



const chainToCancel = promptTemplate.pipe(model)

const controller = new AbortController()

console.time("CancellationTimer")

setTimeout(()=> {
    controller.abort()
}, 100)

try{
    await chainToCancel.invoke({
        input: "When was the Eiffel Tower Built"
    }, {
        signal: controller.signal
    })
} catch (error) {
    console.log(error)

}

console.timeEnd("CancellationTimer")