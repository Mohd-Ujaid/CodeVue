import axios from "axios";
import {db} from "../libs/db.js";

// Environment Variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;
const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
// const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST;
// const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

async function callGeminiAPI(prompt) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {prompt}
      // {
      //   headers: {
      //     'Authorization': `Bearer ${GEMINI_API_KEY}`,
      //     'Content-Type': 'application/json'
      //   }
      // }
    );
    return response.data; // Assume { question: string, followUpPossible: boolean }
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Failed to get response from AI interviewer");
  }
}

async function evaluateAnswerGemini(question, userAnswer) {
  const prompt = `You are an expert technical interviewer. Evaluate this user answer: "${userAnswer}" to question: "${question}". Give feedback, correctness, and suggest follow-up questions if applicable. Respond in JSON with keys: correctness (boolean), feedback (string), followUps (array of string).`;
  const result = await callGeminiAPI(prompt);
  return result;
}

export const startInterview = async (req, res) => {
  try {
    const {interviewType} = req.body;
    // Prompt Gemini API to generate opening question based on interviewType
    const prompt = `Generate a challenging technical interview question for a ${interviewType} position. Provide only the question text.`;
    const aiResponse = await callGeminiAPI(prompt);
    const questionText = aiResponse.question || aiResponse;

    // Save interview session in DB
    const interview = await prisma.interview.create({
      data: {
        userId: req.user.id,
        interviewType,
        startedAt: new Date(),
      },
    });

    // Store question in DB for tracking
    const question = await prisma.question.create({
      data: {
        content: questionText,
        language: "General",
        company: "AI Generated",
        role: interviewType,
        difficulty: "MEDIUM",
      },
    });

    // Relate question to interview (many to many)
    await prisma.interview.update({
      where: {id: interview.id},
      data: {
        questions: {
          connect: {id: question.id},
        },
      },
    });

    res.json({
      interviewId: interview.id,
      questionId: question.id,
      questionText,
      message: "Interview started. Answer the question.",
    });
  } catch (err) {
    console.error("startInterview error:", err);
    res.status(500).json({error: "Failed to start interview"});
  }
};

export const answerQuestion = async (req, res) => {
  try {
    const {interviewId, questionId, answer} = req.body;

    // Fetch question content
    const question = await prisma.question.findUnique({
      where: {id: questionId},
    });
    if (!question) return res.status(400).json({error: "Invalid question ID"});

    // Evaluate answer with Gemini AI
    const evaluation = await evaluateAnswerGemini(question.content, answer);

    // Save submission
    await prisma.submission.create({
      data: {
        userId: req.user.id,
        questionId,
        code: answer,
        language: "Text",
        result: JSON.stringify(evaluation),
      },
    });

    // Decide follow-up or next question
    let nextQuestionText = null;
    if (evaluation.followUps?.length > 0) {
      nextQuestionText = evaluation.followUps[0];
    } else {
      // Optionally generate another question or end interview
      nextQuestionText =
        "Thank you for your answers. This concludes the interview.";
    }

    res.json({
      correctness: evaluation.correctness,
      feedback: evaluation.feedback,
      followUpQuestion: nextQuestionText,
    });
  } catch (err) {
    console.error("answerQuestion error:", err);
    res.status(500).json({error: "Failed to evaluate answer"});
  }
};

export const submitCode = async (req, res) => {
  try {
    const {code, language, questionId} = req.body;

    // Judge0 API expects base64 or plain text source code
    // Note: Some Judge0 APIs require language_id instead of language name, this example assumes name
    const payload = {
      source_code: code,
      language_id: language, // Ideally: map language name to Judge0 language_id
      // Additional config can be added here like stdin, expected_output, etc.
    };

    // Send submission to Judge0
    let submissionResponse;

    try {
      const options = {
        method: "POST",
        url: JUDGE0_API_URL,
        // headers: {
        //   'Content-Type': 'application/json',
        //   'X-RapidAPI-Host': JUDGE0_API_HOST,
        //   'X-RapidAPI-Key': JUDGE0_API_KEY,
        // },
        data: payload,
      };
      submissionResponse = await axios.request(options);
    } catch (e) {
      // fallback without rapidapi headers if self-hosted
      submissionResponse = await axios.post(
        JUDGE0_API_URL,
        payload
        //   {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }
      );
    }

    const token = submissionResponse.data.token;

    // Poll for result until complete
    const getResult = async () => {
      let resultResponse;
      while (true) {
        resultResponse = await axios.get(
          `${JUDGE0_API_URL}/${token}`
          //   {
          //   headers: {
          //     'X-RapidAPI-Host': JUDGE0_API_HOST,
          //     'X-RapidAPI-Key': JUDGE0_API_KEY,
          //   }
          // }
        );
        if (resultResponse.data.status.id >= 3) break; // 3=Accepted, 4=Wrong Answer, etc
        await new Promise(r => setTimeout(r, 1000));
      }
      return resultResponse.data;
    };

    const result = await getResult();

    // Store submission result in DB (optional - assuming req.user.id present)
    await prisma.submission.create({
      data: {
        userId: req.user.id,
        questionId,
        code,
        language,
        result: JSON.stringify(result),
      },
    });

    res.json({result});
  } catch (err) {
    console.error("submitCode error:", err);
    res.status(500).json({error: "Failed to execute code"});
  }
};
