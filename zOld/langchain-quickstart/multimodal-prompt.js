import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {ChatPromptTemplate} from "@langchain/core/prompts"
import {readFile} from "fs/promises"

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const myImage = await readFile("./SignLang.jpg")

const base64Image = myImage.toString("base64")

const messages = [
    ["system","Describe the image"],
    ["user", [
        {
            type: "image_url",
            image_url: "data:image/jpg;base64,{myImage}"
        }
    ]]
]

const multimodalPrompt = ChatPromptTemplate.fromMessages(messages)

/*console.log(await multimodalPrompt.invoke({
    myImage: base64Image
}))*/

const multimodalChain = multimodalPrompt.pipe(geminiModel)

const response = await multimodalChain.invoke({
    myImage: base64Image
})

console.log(response.content)