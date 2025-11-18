import askai from "../Config/askai.js";
import responder from "../Utils/responder.js";

const ganarateRoadmap = async (req, res) => {
   try {

      let { topic } = req.body;
      if (!topic) {
         return responder(res, 406, null, "topic is required to generate roadmap");
      }

      let question = ganaratePrompt(topic);

      let answer = await askai(question);
      return responder(res, 200, answer, "here is your roadmap");

   } catch (error) {
      return responder(res, error.status || 500, null, error.message);
   }
}


export { ganarateRoadmap };