import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import { PromptTemplate } from "@langchain/core/prompts"
import {RunnableSequence} from "@langchain/core/runnables"

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const templateString = "Suggest 3 nicknames for a {pet_animal}"

const template = PromptTemplate.fromTemplate(templateString)

/*const chain = RunnableSequence.from([
    template,
    model
])*/

const chain = template.pipe(model)

const response = await chain.invoke({
    pet_animal: "Cat"
})

console.log(response.content)