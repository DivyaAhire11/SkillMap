import askai from "../Config/askai.js";
import responder from "../Utils/responder.js";
import generatePrompt from "../Utils/genaratePrompt.js";

const ganarateRoadmap = async (req, res) => {
   try {

      let { topic } = req.body;
      if (!topic) {
         return responder(res, 406, "topic is required to generate roadmap", null);
      }

      let question = generatePrompt(topic);

      let answer = await askai(question);
      return responder(res, 200, "here is your roadmap", answer);

   } catch (error) {
      return responder(res, error.status || 500, null, error.message);
   }
}


export { ganarateRoadmap };