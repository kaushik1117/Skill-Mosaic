import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';


export default function ExamPage(){
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const [expiryTimestamp, setExpiryTimestamp] = useState();

  useEffect(() => {
    const fetchExam = async () => {
      const response = await axios.get(`http://localhost:4000/exam/getexam/${examId}`);
      setQuestions(response.data.questions);
      setAnswers(new Array(response.data.questions.length).fill(''));

      const durationInSeconds = response.data.examduration * 60;
      const time = new Date();
      time.setSeconds(time.getSeconds() + durationInSeconds);
      setExpiryTimestamp(time);
    };

    fetchExam();
  }, [examId]);

  const {
    seconds,
    minutes,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp: expiryTimestamp || new Date(),
    onExpire: () => handleSubmit()
  });

  useEffect(() => {
    if (expiryTimestamp) {
      restart(expiryTimestamp);
    }
  }, [expiryTimestamp, restart]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/exam/check/${examId}`, {
        answers: answers
      }) ;

      console.log('Exam submitted successfully:');
      console.log(response.data);
      navigate(`/results/${examId}`);
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold">Exam</div>
          <div className="text-xl font-semibold">
            Time left: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
          </div>
        </div>
        {questions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{questions[currentQuestionIndex].question}</h3>
            <textarea
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              value={answers[currentQuestionIndex]}
              onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
            ></textarea>
          </div>
        )}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {/* {loading && <Loader msg={"Results are getting generated"} />} */}
    </div>
  );
};
