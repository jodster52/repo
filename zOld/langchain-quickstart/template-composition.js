import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { PromptTemplate, PipelinePromptTemplate } from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite"
})

const systemPrompt = PromptTemplate.fromTemplate("You are a helpful A.I assistant who is also a movie buff")

const aiExampleResponsePrompt = PromptTemplate.fromTemplate(`
    You response should always be in this format
    Question: Can you recommend a {example_genre} movie?
    Answer: Sure, {example_answer} is a great choice
`)

const newConversationPrompt = PromptTemplate.fromTemplate("Question: Can you recommend a {question_genre} movie?")

const finalHumanPrompt = PromptTemplate.fromTemplate(`
    {systemRole}
    {aiExampleResponse}
    {newConversation}
`)

const composedPrompt = new PipelinePromptTemplate({
    finalPrompt: finalHumanPrompt,
    pipelinePrompts: [
        {
            name: "systemRole",
            prompt: systemPrompt
        },
        {
            name: "aiExampleResponse",
            prompt: aiExampleResponsePrompt
        },
        {
            name: "newConversation",
            prompt: newConversationPrompt
        }
    ]
})

/*const formattedPrompt = await composedPrompt.format({
    example_genre: "sci-fi",
    example_answer: "Blade Runner",
    question_genre: "Comedy"
})

console.log(formattedPrompt)*/

const chain = composedPrompt.pipe(model)

const response = await chain.invoke({
    example_genre: "sci-fi",
    example_answer: "Blade Runner",
    question_genre: "Comedy"
})

console.log(response.content)