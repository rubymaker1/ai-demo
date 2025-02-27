const GEMINI_API_KEY = "AIzaSyBejLvpIN9cgkGJGUK3qUIrb0iFiprt94k";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateGeminiResponse(prompt: string) {
  try {
    const formattedPrompt = `
Please provide a concise and clean response. Keep it brief and well-structured.
When providing lists:
- Start each item on a new line
- Use "•" as bullet points
- Add a space after each bullet point
- Add a blank line before and after lists

Keep paragraphs short and avoid using markdown symbols.

User's question: ${prompt}
`;

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: formattedPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
} 