import OpenAI from "openai";

/*
It takes a question parameter.

If no question is provided, it uses the default string:
"you are rodmap ai and your name is learnmap.ai".

*/
const askai = async (question = "you are rodmap ai and your name is learnmap.ai") => {
    try {

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.LEARNMAP_AI_API
        })

        const response = await openai.chat.completions.create({
            model: "mistralai/ministral-3d",//Specifies which model to use through OpenRouter.
            messages: [
                {
                    "role": "user",   // tells the model who is speaking
                    "content": question  //sends the user’s input message to the model
                }
            ]
        })
        return (response.choices[0].message.content);  //Reads the model’s text output

    } catch (error) {
        return (error.message);
    }
}

export default askai;