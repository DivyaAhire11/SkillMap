import askai from "../Config/askai.js";
import responder from "../Utils/responder.js";
import generatePrompt from "../Utils/genaratePrompt.js";

const ganarateRoadmap = async (req, res) => {
   try {

      let { topic } = req.body;
      if (!topic) {
         return responder(res, 406, null, "Topic is required to generate a roadmap");
      }

      let question = generatePrompt(topic);

      let answer = await askai(question);
      let parsedAnswer;
      parsedAnswer = JSON.parse(answer)
      return responder(res, 200,parsedAnswer, "here is your roadmap");

   } catch (error) {
      return responder(res, error.status || 500, null, error.message || "Failed to generate roadmap");
   }
}


export { ganarateRoadmap };