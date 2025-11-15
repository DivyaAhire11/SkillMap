import OpenAI from "openai";
import responder from "../Utils/responder";

const askai = async(question = "you are rodmap ai and your name is learnmap.ai")=>{
    try {
        
        const openai = new OpenAI({
            baseURL : "https://openrouter.ai/api/v1",
            apiKey : process.env.LEARNMAP_AI_API 
        })

        const responce = await openai.chat.completions.create({
            model : "mistralai/ministral-3d",
            messages:[
                {
                    "roe" : "user",
                    "constent" : question
                }
            ]
        })
        return (responce.choices[0].message.content);

    } catch (error) {
        return (error.message);
    }
}