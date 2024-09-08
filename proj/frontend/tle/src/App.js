import './App.css';
import Courses from './components/ui/Courses.jsx';
import CourseDisplay from './components/ui/CourseDisplay';
import VideoDisplay from './components/ui/VideoDisplay';
import StudyPlanner from './components/ui/StudyPlanner';
import LandingPage from './components/ui/LandingPage';
import Navbar from './components/ui/Navbar';
import ExamGenerator from './components/ui/ExamGenerator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoubtsGPT from './components/ui/DoubtsGPT';
import Exam from './components/ui/Exam';
import Result from './components/ui/Result';
import Footer from './components/ui/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courseDisplay" element={<CourseDisplay />} />
        <Route path="/videoDisplay" element={<VideoDisplay />} />
        <Route path="/studyPlanner" element={<StudyPlanner />} />
        <Route path="/examGenerator" element={<ExamGenerator />} />
        <Route path="/doubtsgpt" element={<DoubtsGPT />} />
        <Route path="/exam/:examId" element={<Exam />} />
        <Route path="/results/:examId" element={<Result />} />
      </Routes>
      <Footer />
    </Router>
    
    </>
  );
}

export default App;
