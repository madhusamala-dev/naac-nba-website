import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function PreCheck() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'naac_previous',
      title: 'Previous NAAC Accreditation',
      question: 'What is your current NAAC accreditation status?',
      options: [
        { value: 'a++', label: 'A++ Grade', score: 10 },
        { value: 'a+', label: 'A+ Grade', score: 8 },
        { value: 'a', label: 'A Grade', score: 6 },
        { value: 'b++', label: 'B++ Grade', score: 4 },
        { value: 'b+', label: 'B+ Grade', score: 2 },
        { value: 'none', label: 'Not Accredited', score: 0 }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Quality',
      question: 'How would you rate your institutional infrastructure?',
      options: [
        { value: 'excellent', label: 'Excellent (Modern facilities, well-equipped)', score: 10 },
        { value: 'good', label: 'Good (Adequate facilities)', score: 7 },
        { value: 'average', label: 'Average (Basic facilities)', score: 4 },
        { value: 'poor', label: 'Poor (Limited facilities)', score: 1 }
      ]
    },
    {
      id: 'faculty_ratio',
      title: 'Faculty-Student Ratio',
      question: 'What is your current faculty-student ratio?',
      options: [
        { value: '1:10', label: '1:10 or better', score: 10 },
        { value: '1:15', label: '1:11 to 1:15', score: 8 },
        { value: '1:20', label: '1:16 to 1:20', score: 6 },
        { value: '1:25', label: '1:21 to 1:25', score: 4 },
        { value: 'above_25', label: 'Above 1:25', score: 2 }
      ]
    },
    {
      id: 'research_output',
      title: 'Research & Publications',
      question: 'How active is your institution in research and publications?',
      options: [
        { value: 'very_high', label: 'Very High (50+ publications/year)', score: 10 },
        { value: 'high', label: 'High (20-49 publications/year)', score: 8 },
        { value: 'moderate', label: 'Moderate (10-19 publications/year)', score: 6 },
        { value: 'low', label: 'Low (5-9 publications/year)', score: 3 },
        { value: 'very_low', label: 'Very Low (<5 publications/year)', score: 1 }
      ]
    },
    {
      id: 'placement_record',
      title: 'Placement Performance',
      question: 'What is your average placement percentage?',
      options: [
        { value: 'above_90', label: 'Above 90%', score: 10 },
        { value: '80_90', label: '80-90%', score: 8 },
        { value: '70_80', label: '70-80%', score: 6 },
        { value: '60_70', label: '60-70%', score: 4 },
        { value: 'below_60', label: 'Below 60%', score: 2 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
        }
      }
    });
    return totalScore;
  };

  const getGradeAndRecommendations = (score: number) => {
    const percentage = (score / 50) * 100;
    
    if (percentage >= 85) {
      return {
        grade: 'A++',
        color: 'bg-green-500',
        message: 'Excellent! You are well-positioned for top-tier accreditation.',
        recommendations: [
          'Focus on maintaining current standards',
          'Document all processes thoroughly',
          'Prepare for peer team visit'
        ]
      };
    } else if (percentage >= 75) {
      return {
        grade: 'A+',
        color: 'bg-blue-500',
        message: 'Very Good! Minor improvements can help achieve A++ grade.',
        recommendations: [
          'Enhance research output',
          'Improve faculty development programs',
          'Strengthen industry partnerships'
        ]
      };
    } else if (percentage >= 65) {
      return {
        grade: 'A',
        color: 'bg-yellow-500',
        message: 'Good foundation. Focus on key improvement areas.',
        recommendations: [
          'Invest in infrastructure upgrades',
          'Increase faculty recruitment',
          'Develop research culture'
        ]
      };
    } else if (percentage >= 50) {
      return {
        grade: 'B++',
        color: 'bg-orange-500',
        message: 'Significant improvements needed for higher grades.',
        recommendations: [
          'Comprehensive infrastructure development',
          'Faculty capacity building',
          'Establish research partnerships'
        ]
      };
    } else {
      return {
        grade: 'B+',
        color: 'bg-red-500',
        message: 'Substantial work required. Consider our comprehensive support.',
        recommendations: [
          'Complete institutional restructuring',
          'Major infrastructure investments',
          'Professional accreditation consulting'
        ]
      };
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const result = getGradeAndRecommendations(score);
    const percentage = (score / 50) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Your NAAC Readiness Assessment</CardTitle>
                <CardDescription className="text-lg">Based on your responses, here's your estimated readiness</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-24 h-24 ${result.color} text-white text-2xl font-bold rounded-full mb-4`}>
                    {result.grade}
                  </div>
                  <div className="text-2xl font-semibold mb-2">{percentage.toFixed(0)}% Ready</div>
                  <Progress value={percentage} className="w-full max-w-md mx-auto mb-4" />
                  <p className="text-lg text-gray-600">{result.message}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 text-left">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                        Key Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full" size="sm">
                          Schedule Expert Consultation
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          Download Detailed Report
                        </Button>
                        <Button variant="ghost" className="w-full" size="sm">
                          Explore Our Services
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <Button onClick={resetAssessment} variant="outline">
                    Take Assessment Again
                  </Button>
                  <Button>
                    Request Detailed Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NAAC Readiness Assessment</h1>
            <p className="text-gray-600">Answer a few questions to estimate your accreditation readiness</p>
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500 mt-2">
                Question {currentStep + 1} of {questions.length}
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <Badge variant="outline" className="w-fit">
                {currentQuestion.title}
              </Badge>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={prevStep} 
                  variant="outline" 
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                >
                  {currentStep === questions.length - 1 ? 'Get Results' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}