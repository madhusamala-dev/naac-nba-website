import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, TrendingUp, Award, Users, BookOpen, Loader2, User, Mail, Phone, Building } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Teaching, Learning & Resources',
    question: 'What is the current student-to-faculty ratio in your institution?',
    options: [
      { value: 'excellent', label: 'Below 15:1', score: 10 },
      { value: 'good', label: '15:1 to 20:1', score: 8 },
      { value: 'average', label: '20:1 to 25:1', score: 6 },
      { value: 'poor', label: 'Above 25:1', score: 3 }
    ]
  },
  {
    id: 2,
    category: 'Research, Innovations & Extension',
    question: 'How many research publications has your institution produced in the last 3 years?',
    options: [
      { value: 'excellent', label: 'More than 100 per year', score: 10 },
      { value: 'good', label: '50-100 per year', score: 8 },
      { value: 'average', label: '20-50 per year', score: 6 },
      { value: 'poor', label: 'Less than 20 per year', score: 3 }
    ]
  },
  {
    id: 3,
    category: 'Graduation Outcomes',
    question: 'What is your institution\'s average placement rate?',
    options: [
      { value: 'excellent', label: 'Above 80%', score: 10 },
      { value: 'good', label: '60-80%', score: 8 },
      { value: 'average', label: '40-60%', score: 6 },
      { value: 'poor', label: 'Below 40%', score: 3 }
    ]
  },
  {
    id: 4,
    category: 'Outreach and Inclusivity',
    question: 'What percentage of students belong to economically weaker sections?',
    options: [
      { value: 'excellent', label: 'More than 30%', score: 10 },
      { value: 'good', label: '20-30%', score: 8 },
      { value: 'average', label: '10-20%', score: 6 },
      { value: 'poor', label: 'Less than 10%', score: 3 }
    ]
  },
  {
    id: 5,
    category: 'Perception',
    question: 'How would you rate your institution\'s reputation among employers?',
    options: [
      { value: 'excellent', label: 'Excellent - Top choice for recruiters', score: 10 },
      { value: 'good', label: 'Good - Regular recruitment visits', score: 8 },
      { value: 'average', label: 'Average - Moderate employer interest', score: 6 },
      { value: 'poor', label: 'Poor - Limited employer recognition', score: 3 }
    ]
  }
];

export default function PreCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    contact_number: '',
    college_name: ''
  });

  const handleAnswer = (questionId: number, option: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Last question answered, show contact form popup
      setShowContactForm(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum: number, answer: any) => sum + answer.score, 0);
    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    let readinessLevel = '';
    let rankBand = '';
    let recommendations = [];

    if (percentage >= 80) {
      readinessLevel = 'Excellent - NIRF Ready';
      rankBand = 'Top 50 potential';
      recommendations = [
        'Apply for NIRF ranking immediately',
        'Focus on maintaining current standards',
        'Enhance research output for better ranking'
      ];
    } else if (percentage >= 60) {
      readinessLevel = 'Good - Nearly Ready';
      rankBand = 'Top 100-200 potential';
      recommendations = [
        'Improve student-faculty ratio',
        'Increase research publications',
        'Enhance placement activities'
      ];
    } else if (percentage >= 40) {
      readinessLevel = 'Average - Needs Improvement';
      rankBand = 'Top 200+ potential';
      recommendations = [
        'Significant improvements needed in all areas',
        'Focus on faculty development',
        'Establish industry partnerships'
      ];
    } else {
      readinessLevel = 'Poor - Major Improvements Required';
      rankBand = 'Not ready for NIRF';
      recommendations = [
        'Complete overhaul of academic processes needed',
        'Invest in faculty recruitment and training',
        'Develop research infrastructure'
      ];
    }

    return {
      totalScore,
      maxScore,
      percentage: Math.round(percentage),
      readinessLevel,
      rankBand,
      recommendations
    };
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate contact form
    if (!contactData.name || !contactData.email || !contactData.college_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const results = calculateResults();
      
      // Prepare data for backend
      const assessmentData = {
        institution_name: contactData.college_name,
        contact_email: contactData.email,
        contact_name: contactData.name,
        contact_number: contactData.contact_number,
        total_score: results.totalScore,
        readiness_level: results.readinessLevel,
        rank_band: results.rankBand,
        answers: answers
      };

      // Submit to backend API
      const response = await fetch('http://localhost:5000/api/nirf/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData)
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Assessment submitted successfully!');
        setShowContactForm(false);
        setShowResults(true);
      } else {
        toast.error(result.message || 'Failed to submit assessment');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Network error. Please try again.');
      // Still show results even if backend fails
      setShowContactForm(false);
      setShowResults(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactInputChange = (field: string, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id];
  const results = showResults ? calculateResults() : null;

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-3xl">
                  <Award className="mr-3 h-8 w-8 text-yellow-600" />
                  NIRF Readiness Assessment Results
                </CardTitle>
                <CardDescription className="text-lg">
                  Based on your responses, here's your institution's NIRF readiness analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Score Overview */}
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-4xl font-bold text-blue-600">{results.percentage}%</div>
                      <p className="text-sm text-gray-600">Overall Score</p>
                      <p className="text-xs text-gray-500">{results.totalScore}/{results.maxScore} points</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-lg font-semibold text-green-600">{results.readinessLevel}</div>
                      <p className="text-sm text-gray-600">Readiness Level</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-lg font-semibold text-purple-600">{results.rankBand}</div>
                      <p className="text-sm text-gray-600">Potential Ranking</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>NIRF Readiness Score</span>
                    <span>{results.percentage}%</span>
                  </div>
                  <Progress value={results.percentage} className="h-3" />
                </div>

                {/* Category Breakdown */}
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Category-wise Performance</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {questions.map((q, index) => {
                      const answer = answers[q.id];
                      const scorePercentage = (answer?.score / 10) * 100;
                      return (
                        <Card key={q.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{q.category}</p>
                                <p className="text-sm text-gray-600">{answer?.label}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">{answer?.score}/10</div>
                                <Progress value={scorePercentage} className="mt-1 w-20" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Recommendations for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Call to Action */}
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="mb-2 text-xl font-semibold">Ready to Improve Your NIRF Ranking?</h3>
                      <p className="mb-4 text-gray-600">
                        Our experts can help you implement these recommendations and achieve better rankings.
                      </p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button onClick={() => window.location.href = '/request-demo'} className="bg-blue-600 hover:bg-blue-700">
                          <Award className="mr-2 h-4 w-4" />
                          Get Expert Consultation
                        </Button>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                          Retake Assessment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">NIRF Readiness Assessment</h1>
            <p className="text-xl text-gray-600">
              Evaluate your institution's readiness for NIRF ranking
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Answer {questions.length} questions to get your personalized readiness report
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center text-sm text-blue-600">
                <BookOpen className="mr-2 h-4 w-4" />
                {currentQ.category}
              </div>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQ.id]?.value || ''}
                onValueChange={(value) => {
                  const option = currentQ.options.find(opt => opt.value === value);
                  if (option) {
                    handleAnswer(currentQ.id, option);
                  }
                }}
              >
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>{option.label}</span>
                        <span className="text-sm text-gray-500">{option.score} points</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Dialog */}
          <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center text-xl">
                  <Award className="mr-2 h-5 w-5 text-blue-600" />
                  To Know Your Result, Please Let Us Know
                </DialogTitle>
                <DialogDescription>
                  Please provide your contact details to receive your personalized NIRF readiness report
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={contactData.name}
                    onChange={(e) => handleContactInputChange('name', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={contactData.email}
                    onChange={(e) => handleContactInputChange('email', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Number
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="+91-9876543210"
                    value={contactData.contact_number}
                    onChange={(e) => handleContactInputChange('contact_number', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    College Name *
                  </Label>
                  <Input
                    id="college"
                    type="text"
                    placeholder="Enter your institution name"
                    value={contactData.college_name}
                    onChange={(e) => handleContactInputChange('college_name', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Award className="mr-2 h-4 w-4" />
                        Get My Results
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}