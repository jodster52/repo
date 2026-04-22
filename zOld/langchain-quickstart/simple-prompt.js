import {PromptTemplate} from "@langchain/core/prompts"

/*const myTemplate = new PromptTemplate({
    template: "How many {item} can fit into a {container}",
    inputVariables: ["item","container"]
})*/

const myTemplate = PromptTemplate.fromTemplate("How many {item} can fit into a {container}")

const prompt = await myTemplate.invoke({
    item: "Tennis Raquets",
    container: "Classroom"
})

console.log(prompt)