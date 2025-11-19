const generatePrompt = (topic) => {

  if (!topic || typeof topic !== "string") {
    throw new Error("Topic must be a valid non-empty string.");
  }

  return `
You are an AI that outputs ONLY valid JSON. Never include explanations, notes, markdown, or text outside JSON.

Generate a detailed learning roadmap for the given topic in STRICT JSON format.

{
  "title": "<Topic Name> Learning Roadmap",
  "levels": [
    {
      "level": "Beginner",
      "modules": [
        {
          "module": "<Module Name>",
          "topics": ["<Topic 1>", "<Topic 2>", "<Topic 3>", "..."]
        }
      ]
    },
    {
      "level": "Intermediate",
      "modules": [
        {
          "module": "<Module Name>",
          "topics": ["<Topic 1>", "<Topic 2>", "<Topic 3>", "..."]
        }
      ]
    },
    {
      "level": "Advanced",
      "modules": [
        {
          "module": "<Module Name>",
          "topics": ["<Topic 1>", "<Topic 2>", "<Topic 3>", "..."]
        }
      ]
    }
  ],
  "resources": [
    {
      "name": "<Resource Name>",
      "url": "<Resource URL>"
    }
  ]
}

REQUIREMENTS:
1. Output ONLY JSON.
2. Exactly 3 levels.
3. At least 2 modules per level.
4. At least 3 topics per module.
5. At least 3 resources.
6. JSON must be valid.

Now generate the roadmap for "${topic}".
`;
};

export default generatePrompt;
