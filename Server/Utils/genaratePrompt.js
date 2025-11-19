
const generatePrompt = (topic) => {

    if (!topic || typeof topic !== "string") {
        throw new Error("Topic must be a valid non-empty string.")
    }

    return (`
        You are an AI that outputs ONLY valid JSON. Never include explanations , notes ,marksdown,or text outside JSON.
        
        Generate a detailed learning roadmap for the give topic in STRICT JSON format.
        
        The JSON MUST follow this exact structure and must be valid:

      {
        "title" : "<Topic Name> Learning Roadmap",
        "levels" : [
             {
                "level" : "Beginner",
                "modules" : [
                    {
                        "module": "<Module Name>",
                        "topics": [
                            "<Topic 1>",
                            "<Topic 2>",
                            "<Topic 3>",
                            "..."
                        ]

                   }
                ]
        
             },
             {
                "level": "Intermediate",
                "modules": [
                    {
                    "module": "<Module Name>",
                    "topics": [
                        "<Topic 1>",
                        "<Topic 2>",
                        "<Topic 3>",
                        "..."
                    ]
                    }
                ]
             
             },
             {
                "level": "Advanced",
                "modules": [
                    {
                    "module": "<Module Name>",
                    "topics": [
                        "<Topic 1>",
                        "<Topic 2>",
                        "<Topic 3>",
                        "..."
                    ]
                    }
                ]
             
             }
        
        ],
       "resoueces" : [
          {
            
           "name": "<Resource Name>",
           "url": "<Resource URL>"
          } 
       
       ]
      }


        REQUIREMENTS:
        1. Output ONLY JSON. No extra sentences.
        2. Use EXACTLY 3 levels: Beginner, Intermediate, Advanced.
        3. Each level must contain AT LEAST 2 modules.
        4. Each module must contain MULTIPLE topics (minimum 3).
        5. Add AT LEAST 3 reliable learning resources.
        6. The final output MUST be valid JSON — no comments, no trailing commas.

        Now generate the roadmap for this topic:
        "${topic}"
        `);
};

export default generatePrompt;
