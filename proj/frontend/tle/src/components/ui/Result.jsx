import React, { useState, useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function Result(){
    const navigate = useNavigate();
    const { examId } = useParams();
    const [exam, setExam] = useState(null);

    useEffect(() => {
        const fetchExamResults = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/exam/results/${examId}`);
                console.log(response.data.exam);
                setExam(response.data.exam);
            } catch (error) {
                console.error('Error fetching exam results:', error);
            }
        };

        fetchExamResults();
    }, [examId]);

    if (!exam) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center text-white p-4">
                <div className="w-full max-w-3xl p-6 rounded-md border  border-blue-800 bg-black shadow-[5px_5px_50px_rgba(8,_112,_184,_0.7)]">
                    <div className="text-xl font-semibold mb-6">Exam Name: {exam.examname}</div>
                    <div className="mb-6">
                        <div className="font-medium">Duration: {exam.examduration} minutes</div>
                        {typeof exam.exammarks === 'number' && (
                            <div className="font-medium">Total Score: {exam.exammarks}</div>
                        )}
                    </div>
                    <div className="space-y-6">
                        {Array.isArray(exam.questions) && exam.questions.map((question, index) => (
                            <div key={index} className="rounded-md border  border-blue-800 bg-black p-8 shadow-[5px_5px_50px_rgba(8,_112,_184,_0.7)]">
                                <div className="font-medium mb-2">Question: {question.question}</div>
                                <div className="mb-2">Your Answer: {question.useranswer}</div>
                                <div className="mb-2">Correct Answer: {question.answer}</div>
                                <div className="font-medium">Score: {question.score}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    className="inline-flex items-center justify-center bg-blue-700 px-6 py-3 text-white bg-primary-600 hover:bg-primary-800  font-medium rounded-lg text-sm dark:focus:ring-primary-900"
                    // onClick={() => navigate('/userhome')}
                >
                    Home
                </button>
            </div>

        </div>
    );
};
