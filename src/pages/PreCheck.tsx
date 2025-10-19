import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, Trophy, TrendingUp, AlertCircle, Target } from 'lucide-react';

export default function PreCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      title: "Faculty–Student Ratio & Qualification",
      question: "What best describes your faculty profile?",
      options: [
        { value: "A", text: "Faculty–student ratio ≤1:10 and >80% Ph.D. holders", points: 10 },
        { value: "B", text: "Ratio 1:11–15 and 60–80% Ph.D. holders", points: 8 },
        { value: "C", text: "Ratio 1:16–20 and 40–60% Ph.D. holders", points: 5 },
        { value: "D", text: "Ratio >1:20 and <40% Ph.D. holders", points: 2 }
      ]
    },
    {
      id: 2,
      title: "Research & Publications",
      question: "How active is your research and publication output?",
      options: [
        { value: "A", text: ">1.5 publications per faculty/year, patents filed, funded projects", points: 10 },
        { value: "B", text: "1–1.5 publications per faculty/year, some projects/patents", points: 8 },
        { value: "C", text: "<1 publication per faculty/year, limited research", points: 5 },
        { value: "D", text: "Minimal or no research output", points: 2 }
      ]
    },
    {
      id: 3,
      title: "Placement & Higher Studies",
      question: "How strong are your placement and higher-study outcomes?",
      options: [
        { value: "A", text: ">85% of eligible students placed or pursuing higher studies", points: 10 },
        { value: "B", text: "70–85% placed or higher studies", points: 8 },
        { value: "C", text: "50–70% placed or higher studies", points: 5 },
        { value: "D", text: "<50% placed or higher studies", points: 2 }
      ]
    },
    {
      id: 4,
      title: "Industry Collaboration",
      question: "How strong is your connection with industry?",
      options: [
        { value: "A", text: ">15 active MoUs, funded consultancy, internships, startup tie-ups", points: 10 },
        { value: "B", text: "8–15 MoUs, some internships and live projects", points: 8 },
        { value: "C", text: "3–7 MoUs, limited collaboration", points: 5 },
        { value: "D", text: "Very few or no industry collaborations", points: 2 }
      ]
    },
    {
      id: 5,
      title: "Infrastructure & Learning Resources",
      question: "How modern and accessible are your academic facilities?",
      options: [
        { value: "A", text: "Smart classrooms, 100% ICT-enabled labs, digital library access", points: 10 },
        { value: "B", text: "75–99% ICT-enabled, good maintenance", points: 8 },
        { value: "C", text: "50–75% ICT-enabled, moderate upkeep", points: 5 },
        { value: "D", text: "Limited smart facilities, outdated resources", points: 2 }
      ]
    },
    {
      id: 6,
      title: "Research & Innovation Ecosystem",
      question: "How strong is your innovation and R&D culture?",
      options: [
        { value: "A", text: "Recognized research centers, incubation hub, consistent IPR", points: 10 },
        { value: "B", text: "Active innovation cell, startup activities, few patents/projects", points: 8 },
        { value: "C", text: "Basic innovation cell, limited initiatives", points: 5 },
        { value: "D", text: "No structured R&D or innovation ecosystem", points: 2 }
      ]
    },
    {
      id: 7,
      title: "Inclusivity & Diversity",
      question: "How inclusive is your campus in terms of gender, region, and support?",
      options: [
        { value: "A", text: ">40% female students, >20% from other states, 50% scholarship coverage", points: 10 },
        { value: "B", text: "30–40% female, 10–20% other states, 25–50% scholarships", points: 8 },
        { value: "C", text: "Limited diversity, <25% scholarships", points: 5 },
        { value: "D", text: "Very low diversity or inclusivity measures", points: 2 }
      ]
    },
    {
      id: 8,
      title: "Teaching & Learning Practices",
      question: "How effective are your teaching and evaluation systems?",
      options: [
        { value: "A", text: "Outcome-Based Education (OBE) fully implemented, regular review", points: 10 },
        { value: "B", text: "OBE partially implemented, moderate feedback system", points: 8 },
        { value: "C", text: "Traditional teaching, limited feedback", points: 5 },
        { value: "D", text: "No structured learning outcome system", points: 2 }
      ]
    },
    {
      id: 9,
      title: "Alumni & Employer Perception",
      question: "How strong is your alumni and employer reputation?",
      options: [
        { value: "A", text: "Active alumni network, strong employer participation", points: 10 },
        { value: "B", text: "Moderately active alumni & good recruiter relations", points: 8 },
        { value: "C", text: "Limited alumni connection, average recruiter engagement", points: 5 },
        { value: "D", text: "Weak alumni network, poor employer perception", points: 2 }
      ]
    },
    {
      id: 10,
      title: "Digital Presence & Institutional Visibility",
      question: "How visible is your institution in media and online platforms?",
      options: [
        { value: "A", text: "High online visibility, active website, awards/rankings covered", points: 10 },
        { value: "B", text: "Good website & moderate social media presence", points: 8 },
        { value: "C", text: "Basic online visibility, minimal outreach", points: 5 },
        { value: "D", text: "Outdated website, poor online presence", points: 2 }
      ]
    }
  ];

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        const selectedOption = question.options.find(opt => opt.value === answer);
        if (selectedOption) {
          totalScore += selectedOption.points;
        }
      }
    });
    return totalScore;
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 85) {
      return {
        level: "Excellent – NIRF Ready",
        rankBand: "Top 100",
        color: "bg-green-500",
        icon: Trophy,
        description: "Your institution demonstrates excellence across all NIRF parameters and is ready for top rankings."
      };
    } else if (score >= 70) {
      return {
        level: "Strong – Focus on Research & Outreach",
        rankBand: "100–200",
        color: "bg-blue-500",
        icon: TrendingUp,
        description: "Strong foundation with room for improvement in research output and institutional outreach."
      };
    } else if (score >= 50) {
      return {
        level: "Average – Improve Outcomes & Perception",
        rankBand: "200–300",
        color: "bg-yellow-500",
        icon: Target,
        description: "Moderate performance. Focus on improving graduation outcomes and employer perception."
      };
    } else if (score >= 30) {
      return {
        level: "Developing – Needs Major Improvement",
        rankBand: "300+",
        color: "bg-orange-500",
        icon: AlertCircle,
        description: "Significant improvements needed across multiple parameters to achieve NIRF ranking."
      };
    } else {
      return {
        level: "Foundational Stage",
        rankBand: "Unranked",
        color: "bg-red-500",
        icon: AlertCircle,
        description: "Institution needs comprehensive development across all NIRF parameters."
      };
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalScore = calculateScore();
  const readiness = getReadinessLevel(totalScore);
  const ReadinessIcon = readiness.icon;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                NIRF Readiness Assessment Results
              </h1>
              <p className="text-xl text-gray-600">
                Your institutional readiness for NIRF ranking
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className={`w-24 h-24 ${readiness.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <ReadinessIcon className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {totalScore}/100 Points
                </CardTitle>
                <CardDescription className="text-lg">
                  <Badge className={`${readiness.color} text-white text-sm px-3 py-1`}>
                    {readiness.level}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Indicative NIRF Rank Band: <span className="text-purple-600">{readiness.rankBand}</span>
                  </p>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {readiness.description}
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Completed Questions</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {Object.keys(answers).length}/10
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Average Score per Question</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {Object.keys(answers).length > 0 ? (totalScore / Object.keys(answers).length).toFixed(1) : 0}/10
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={resetAssessment}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                  >
                    Retake Assessment
                  </Button>
                  <div className="text-sm text-gray-500">
                    <p>Want to improve your NIRF ranking? Contact our experts for personalized guidance.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Parameter Breakdown</CardTitle>
                <CardDescription>Your scores across all NIRF parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => {
                    const answer = answers[question.id];
                    const selectedOption = answer ? question.options.find(opt => opt.value === answer) : null;
                    const score = selectedOption ? selectedOption.points : 0;
                    
                    return (
                      <div key={question.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{question.title}</h4>
                          <p className="text-sm text-gray-600">{selectedOption?.text || "Not answered"}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-purple-600">{score}/10</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NIRF Readiness Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Evaluate your institution's readiness for NIRF ranking across 10 key parameters
            </p>
            <div className="mb-4">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-gray-500 mt-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Parameter {questions[currentQuestion].id}
                </Badge>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {questions[currentQuestion].title}
              </CardTitle>
              <CardDescription className="text-lg">
                {questions[currentQuestion].question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option.text}</span>
                        <Badge variant="secondary" className="ml-2">
                          {option.points} pts
                        </Badge>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="px-8 py-3"
            >
              Previous
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={!answers[questions[currentQuestion].id]}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              {currentQuestion === questions.length - 1 ? 'View Results' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}