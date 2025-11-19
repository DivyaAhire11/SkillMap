import OpenAI from "openai";

const askai = async (question = "you are roadmap ai and your name is learnmap.ai") => {
    try {

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.LEARNMAP_AI_API
        });

        const response = await openai.chat.completions.create({
            model: "mistralai/mistral-nemo:free", // FIXED
            messages: [
                {
                    role: "user",
                    content: question
                }
            ]
        });

        return response.choices[0].message.content;

    } catch (error) {
        throw new Error(error.message); // FIXED ERROR HANDLING
    }
};

export default askai;
