import Question from "../Models/Question.js";
import Session from "../Models/Session.js";

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Add the new question IDs to the session and save
    const questionIds = createdQuestions.map((q) => q._id);
    session.questions.push(...questionIds);
    await session.save();

    res.status(201).json({ success: true, message: "Questions added", questions: createdQuestions });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
