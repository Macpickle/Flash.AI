const { GoogleGenerativeAI } = require("@google/generative-ai");
const { extractTextFromFile } = require("./file-processing.service");

// Initialize Google AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

/*
{
        "type": "fill_in_blank",
        "question": "Question with ___ blank",
        "answer": "correct answer",
        "difficulty": 1
      },
      {
        "type": "matching",
        "matching": {
          "pairs": [
            {"question": "Term 1", "answer": "Definition 1"},
            {"question": "Term 2", "answer": "Definition 2"},
            {"question": "Term 3", "answer": "Definition 3"}
          ]
        },
        "difficulty": 3
      }
*/

const createFlashCardPrompt = (content) => {
  return `Generate flash cards from the following content, in the format:
  Summary: Brief summary of the content, under 100 characters.
  Tags: List of relevant tags, maximum of 3.
  Flash Cards: List of flash cards with questions and answers.
  Difficulty: 1 (easy) to 3 (hard).
  Flash Card Types: Multiple Choice
  
  {
    "summary": "Brief summary of the content, under 100 characters.",
    "tags": ["tag1", "tag2", "tag3"],
    "flashCards": [
      {
        "type": "multiple_choice",
        "question": "Question text",
        "multipleChoice": {
          "options": [
            {"text": "Correct answer", "isCorrect": true},
            {"text": "Wrong answer 1", "isCorrect": false},
            {"text": "Wrong answer 2", "isCorrect": false},
            {"text": "Wrong answer 3", "isCorrect": false}
          ]
        },
        "difficulty": 2
      },
  }

  Generate as many cards as you can, based on the content provided, and ensure the questions are relevant and accurate.

  Content to analyze:
  ${content}`;
};

const generateFlashCards = async (file) => {
  try {
    // For text generation, use the gemini-pro model since it's better for text processing
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Extract text from the file
    const content = await extractTextFromFile(file);

    const prompt = createFlashCardPrompt(content);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response text to ensure it's valid JSON
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === 0) {
      console.error("AI response does not contain valid JSON structure:", text);
      throw new Error("AI response is not in the expected JSON format");
    }

    const jsonText = text.slice(jsonStart, jsonEnd);

    try {
      const parsedResponse = JSON.parse(jsonText);
      return {
        success: true,
        data: parsedResponse,
      };
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return {
        success: false,
        error: "Failed to parse AI response",
      };
    }
  } catch (error) {
    console.error("Error generating flash cards:", error);
    return {
      success: false,
      error: "Failed to generate flash cards",
    };
  }
};

module.exports = {
  generateFlashCards,
};
