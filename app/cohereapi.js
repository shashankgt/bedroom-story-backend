const { CohereClient } = require('cohere-ai');
const cohereKey = process.env.COHERE_KEY;

const cohere = new CohereClient({
  token: cohereKey,
})
module.exports =async(story) => {
    const { genre, language, role, country, settings, size, theme } = story;
    let prompt = "Create a story";
    if (genre != null) prompt += ` in the genre of ${genre}`;
    if (language != null) prompt += ` in the language of ${language}`;
    if (role != null) prompt += ` for the role of ${role}`;
    if (country != null) prompt += ` set in ${country}`;
    if(settings != null ) prompt += ` and location is ${settings}`;
    if (theme != null) prompt += ` and theme in ${theme}`;
    prompt += ".";
    console.log("prompt",prompt)
    const response = await cohere.generate({
        model: "command",
        prompt: prompt,
        max_tokens: size || 500,
        temperature: 0.8,
    });

    if (!response.generations || response.generations.length === 0) {
        throw new Error("Failed to generate story content.");
    }
    const generatedText = response.generations[0].text.trim();
    return generatedText
}