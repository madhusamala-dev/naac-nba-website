import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, TrendingUp, Award, Trophy, Target, Users, BookOpen, Loader2, User, Mail, Phone, Building } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Faculty–Student Ratio & Qualification',
    question: 'What best describes your faculty profile?',
    options: [
      { value: 'A', label: 'Faculty–student ratio ≤1:10 and >80% Ph.D. holders', score: 10 },
      { value: 'B', label: 'Ratio 1:11–15 and 60–80% Ph.D. holders', score: 8 },
      { value: 'C', label: 'Ratio 1:16–20 and 40–60% Ph.D. holders', score: 5 },
      { value: 'D', label: 'Ratio >1:20 and <40% Ph.D. holders', score: 2 }
    ]
  },
  {
    id: 2,
    category: 'Research & Publications',
    question: 'How active is your research and publication output?',
    options: [
      { value: 'A', label: '>1.5 publications per faculty/year, patents filed, funded projects', score: 10 },
      { value: 'B', label: '1–1.5 publications per faculty/year, some projects/patents', score: 8 },
      { value: 'C', label: '<1 publication per faculty/year, limited research', score: 5 },
      { value: 'D', label: 'Minimal or no research output', score: 2 }
    ]
  },
  {
    id: 3,
    category: 'Placement & Higher Studies',
    question: 'How strong are your placement and higher-study outcomes?',
    options: [
      { value: 'A', label: '>85% of eligible students placed or pursuing higher studies', score: 10 },
      { value: 'B', label: '70–85% placed or higher studies', score: 8 },
      { value: 'C', label: '50–70% placed or higher studies', score: 5 },
      { value: 'D', label: '<50% placed or higher studies', score: 2 }
    ]
  },
  {
    id: 4,
    category: 'Industry Collaboration',
    question: 'How strong is your connection with industry?',
    options: [
      { value: 'A', label: '>15 active MoUs, funded consultancy, internships, startup tie-ups', score: 10 },
      { value: 'B', label: '8–15 MoUs, some internships and live projects', score: 8 },
      { value: 'C', label: '3–7 MoUs, limited collaboration', score: 5 },
      { value: 'D', label: 'Very few or no industry collaborations', score: 2 }
    ]
  },
  {
    id: 5,
    category: 'Infrastructure & Learning Resources',
    question: 'How modern and accessible are your academic facilities?',
    options: [
      { value: 'A', label: 'Smart classrooms, 100% ICT-enabled labs, digital library access', score: 10 },
      { value: 'B', label: '75–99% ICT-enabled, good maintenance', score: 8 },
      { value: 'C', label: '50–75% ICT-enabled, moderate upkeep', score: 5 },
      { value: 'D', label: 'Limited smart facilities, outdated resources', score: 2 }
    ]
  },
  {
    id: 6,
    category: 'Research & Innovation Ecosystem',
    question: 'How strong is your innovation and R&D culture?',
    options: [
      { value: 'A', label: 'Recognized research centers, incubation hub, consistent IPR', score: 10 },
      { value: 'B', label: 'Active innovation cell, startup activities, few patents/projects', score: 8 },
      { value: 'C', label: 'Basic innovation cell, limited initiatives', score: 5 },
      { value: 'D', label: 'No structured R&D or innovation ecosystem', score: 2 }
    ]
  },
  {
    id: 7,
    category: 'Inclusivity & Diversity',
    question: 'How inclusive is your campus in terms of gender, region, and support?',
    options: [
      { value: 'A', label: '>40% female students, >20% from other states, 50% scholarship coverage', score: 10 },
      { value: 'B', label: '30–40% female, 10–20% other states, 25–50% scholarships', score: 8 },
      { value: 'C', label: 'Limited diversity, <25% scholarships', score: 5 },
      { value: 'D', label: 'Very low diversity or inclusivity measures', score: 2 }
    ]
  },
  {
    id: 8,
    category: 'Teaching & Learning Practices',
    question: 'How effective are your teaching and evaluation systems?',
    options: [
      { value: 'A', label: 'Outcome-Based Education (OBE) fully implemented, regular review', score: 10 },
      { value: 'B', label: 'OBE partially implemented, moderate feedback system', score: 8 },
      { value: 'C', label: 'Traditional teaching, limited feedback', score: 5 },
      { value: 'D', label: 'No structured learning outcome system', score: 2 }
    ]
  },
  {
    id: 9,
    category: 'Alumni & Employer Perception',
    question: 'How strong is your alumni and employer reputation?',
    options: [
      { value: 'A', label: 'Active alumni network, strong employer participation', score: 10 },
      { value: 'B', label: 'Moderately active alumni & good recruiter relations', score: 8 },
      { value: 'C', label: 'Limited alumni connection, average recruiter engagement', score: 5 },
      { value: 'D', label: 'Weak alumni network, poor employer perception', score: 2 }
    ]
  },
  {
    id: 10,
    category: 'Digital Presence & Institutional Visibility',
    question: 'How visible is your institution in media and online platforms?',
    options: [
      { value: 'A', label: 'High online visibility, active website, awards/rankings covered', score: 10 },
      { value: 'B', label: 'Good website & moderate social media presence', score: 8 },
      { value: 'C', label: 'Basic online visibility, minimal outreach', score: 5 },
      { value: 'D', label: 'Outdated website, poor online presence', score: 2 }
    ]
  }
];

export default function PreCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { value: string; label: string; score: number }>>({});
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    contact_number: '',
    college_name: ''
  });

  const handleAnswer = (questionId: number, option: { value: string; label: string; score: number }) => {
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
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    let readinessLevel = '';
    let rankBand = '';
    let recommendations = [];
    let icon = Trophy;
    let color = 'bg-green-500';

    if (totalScore >= 85) {
      readinessLevel = 'Excellent – NIRF Ready';
      rankBand = 'Top 100';
      color = 'bg-green-500';
      icon = Trophy;
      recommendations = [
        'Apply for NIRF ranking immediately',
        'Focus on maintaining current excellence standards',
        'Enhance research output for better ranking position',
        'Strengthen industry partnerships for continued growth'
      ];
    } else if (totalScore >= 70) {
      readinessLevel = 'Strong – Focus on Research & Outreach';
      rankBand = '100–200';
      color = 'bg-blue-500';
      icon = TrendingUp;
      recommendations = [
        'Improve research publications and patent filings',
        'Enhance industry collaboration and MoUs',
        'Strengthen alumni network and employer perception',
        'Upgrade digital presence and institutional visibility'
      ];
    } else if (totalScore >= 50) {
      readinessLevel = 'Average – Improve Outcomes & Perception';
      rankBand = '200–300';
      color = 'bg-yellow-500';
      icon = Target;
      recommendations = [
        'Focus on improving placement rates and higher study outcomes',
        'Invest in faculty development and Ph.D. qualifications',
        'Enhance infrastructure and ICT-enabled learning resources',
        'Develop structured teaching and evaluation systems'
      ];
    } else if (totalScore >= 30) {
      readinessLevel = 'Developing – Needs Major Improvement';
      rankBand = '300+';
      color = 'bg-orange-500';
      icon = AlertCircle;
      recommendations = [
        'Comprehensive faculty recruitment and training program',
        'Establish research culture and innovation ecosystem',
        'Improve student-faculty ratio and academic infrastructure',
        'Develop industry partnerships and placement initiatives'
      ];
    } else {
      readinessLevel = 'Foundational Stage';
      rankBand = 'Unranked';
      color = 'bg-red-500';
      icon = AlertCircle;
      recommendations = [
        'Complete overhaul of academic and administrative systems',
        'Massive investment in faculty and infrastructure development',
        'Establish basic research and innovation capabilities',
        'Focus on fundamental quality improvement across all parameters'
      ];
    }

    return {
      totalScore,
      maxScore,
      percentage: Math.round(percentage),
      readinessLevel,
      rankBand,
      recommendations,
      icon,
      color
    };
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate contact form
    if (!contactData.name || !contactData.email || !contactData.college_name) {
      toast.error('Please fill in all required fields (Name, Email, and College Name)');
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
        if (result.emails?.results_sent) {
          toast.success('Results sent to your email');
        }
        if (result.emails?.notification_sent) {
          toast.success('Admin has been notified');
        }
        setShowContactForm(false);
        setShowResults(true);
      } else {
        toast.error(result.message || 'Failed to submit assessment');
        // Still show results even if backend fails
        setShowContactForm(false);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Network error. Showing results offline.');
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
    const ResultIcon = results.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${results.color}`}>
                  <ResultIcon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">
                  NIRF Readiness Assessment Results
                </CardTitle>
                <CardDescription className="text-lg">
                  Your institution's comprehensive readiness analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Score Overview */}
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-4xl font-bold text-blue-600">{results.totalScore}/100</div>
                      <p className="text-sm text-gray-600">Total Score</p>
                      <p className="text-xs text-gray-500">{results.percentage}% Overall</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Badge className={`${results.color} text-white text-sm px-3 py-1`}>
                        {results.readinessLevel}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-2">Readiness Level</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-lg font-semibold text-purple-600">{results.rankBand}</div>
                      <p className="text-sm text-gray-600">Indicative NIRF Rank Band</p>
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
                  <h3 className="mb-4 text-xl font-semibold">Parameter-wise Performance</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {questions.map((q) => {
                      const answer = answers[q.id];
                      const scorePercentage = answer ? (answer.score / 10) * 100 : 0;
                      return (
                        <Card key={q.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{q.category}</p>
                                <p className="text-xs text-gray-600 mt-1">{answer?.label || 'Not answered'}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">{answer?.score || 0}/10</div>
                                <Progress value={scorePercentage} className="mt-1 w-16 h-2" />
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
                    <ul className="space-y-3">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Call to Action */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
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
                          <Users className="mr-2 h-4 w-4" />
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
              Evaluate your institution's readiness for NIRF ranking across 10 key parameters
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Complete all {questions.length} questions to get your comprehensive readiness report
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
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {currentQuestion + 1}️⃣ Parameter {currentQ.id}
                </Badge>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <CardTitle className="text-xl font-bold">{currentQ.category}</CardTitle>
              <CardDescription className="text-base">{currentQ.question}</CardDescription>
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
                  <div key={option.value} className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <span className="text-sm pr-4">
                          <strong>{option.value}.</strong> {option.label}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {option.score} pts
                        </Badge>
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
                  {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Dialog */}
          <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center text-xl text-center">
                  <Trophy className="mr-2 h-5 w-5 text-blue-600" />
                  To Know Your Score, Let us Know You !
                </DialogTitle>
                <DialogDescription className="text-center">
                  Please provide your details to receive your personalized NIRF readiness report and recommendations
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
                        <Trophy className="mr-2 h-4 w-4" />
                        Get My Score
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