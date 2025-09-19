import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  Users, 
  BarChart3, 
  Shield, 
  Clock, 
  Award,
  ArrowRight,
  Star,
  TrendingUp,
  FileText,
  Target,
  AlertTriangle,
  Database,
  UserCheck,
  Activity,
  Zap
} from 'lucide-react';

export default function Index() {
  const solutions = [
    {
      title: 'NAAC Accreditation',
      description: 'End-to-end preparation, data management, SSR generation, mock peer team audits.',
      icon: Award,
      link: '/naac',
      color: 'bg-blue-500'
    },
    {
      title: 'NBA Accreditation',
      description: 'Criteria-wise data capture, SAR preparation, gap analysis, and compliance mapping.',
      icon: Shield,
      link: '/nba',
      color: 'bg-green-500'
    },
    {
      title: 'NIRF Ranking',
      description: 'Data analytics, ranking simulation, and improvement roadmap.',
      icon: TrendingUp,
      link: '/nirf',
      color: 'bg-purple-500'
    }
  ];

  const challenges = [
    {
      icon: Database,
      title: 'Manual Data Management',
      description: 'Struggling with large volumes of unorganized data across multiple departments',
      color: 'text-red-500 bg-red-50'
    },
    {
      icon: Users,
      title: 'Role Confusion',
      description: 'Unclear responsibilities leading to missed deadlines and accountability issues',
      color: 'text-orange-500 bg-orange-50'
    },
    {
      icon: Clock,
      title: 'Progress Tracking',
      description: 'Difficulty monitoring progress and meeting critical accreditation deadlines',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: BarChart3,
      title: 'Limited Analytics',
      description: 'Lack of insights and data-driven strategies to improve accreditation scores',
      color: 'text-purple-500 bg-purple-50'
    }
  ];

  const solutionFeatures = [
    {
      icon: Database,
      title: 'Centralized Data Platform',
      description: 'Unified system for all accreditation data with smart organization and easy access',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: UserCheck,
      title: 'Role-Based Collaboration',
      description: 'Clear role assignments with automated workflows and accountability tracking',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Activity,
      title: 'Real-Time Dashboards',
      description: 'Live progress monitoring with milestone tracking and deadline alerts',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      icon: Zap,
      title: 'Automated Gap Analysis',
      description: 'AI-powered insights to identify improvement areas and boost your scores',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const features = [
    {
      title: 'Pre-Check Readiness Score',
      description: 'Estimate your expected score/band before actual submission',
      icon: Target
    },
    {
      title: 'Role-Based Access Control',
      description: 'Streamlined collaboration with proper role mapping',
      icon: Users
    },
    {
      title: 'Criterion-Wise Data Templates',
      description: 'Structured data collection for all accreditation criteria',
      icon: FileText
    },
    {
      title: 'Progress Dashboards & Analytics',
      description: 'Real-time tracking and detailed analytics for improvement',
      icon: BarChart3
    },
    {
      title: 'Document Repository',
      description: 'Centralized storage with intelligent mapping',
      icon: CheckCircle
    },
    {
      title: 'Expert Advisory & Mentorship',
      description: 'Guidance from experienced domain experts',
      icon: Star
    }
  ];

  const testimonials = [
    {
      quote: "The platform reduced our NAAC preparation time by 60%. The role-based system made collaboration seamless.",
      author: "Dr. Priya Sharma",
      position: "IQAC Coordinator",
      college: "ABC Engineering College",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Their pre-check tool helped us identify gaps early. We improved our NIRF ranking by 50 positions!",
      author: "Prof. Rajesh Kumar",
      position: "Vice Principal",
      college: "XYZ University",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Outstanding support throughout our NBA accreditation. The team's expertise is unmatched.",
      author: "Dr. Meena Patel",
      position: "HOD Computer Science",
      college: "PQR Institute of Technology",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Trusted by 100+ Colleges Across 12 States
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Simplify Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NAAC, NBA, and NIRF
              </span>{' '}
              Accreditation Journey
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Reduce workload, improve efficiency, and accelerate your accreditation success with our all-in-one platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link to="/precheck">Check Your Readiness</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Problem-Solution Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Transform Your Accreditation Challenges
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From overwhelming manual processes to streamlined digital excellence
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Challenges Side */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Challenges</h3>
                  <p className="text-gray-600">Issues that slow down your accreditation process</p>
                </div>
                
                <div className="space-y-6">
                  {challenges.map((challenge, index) => {
                    const Icon = challenge.icon;
                    return (
                      <Card key={index} className="border-l-4 border-l-red-400 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${challenge.color}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                              <p className="text-gray-600 text-sm">{challenge.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Solution Side */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
                  <p className="text-gray-600">Comprehensive tools that address every challenge</p>
                </div>
                
                <div className="space-y-6">
                  {solutionFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={index} className="border-l-4 border-l-green-400 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${feature.color}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                              <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Transformation Arrow */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white rounded-full p-4 shadow-lg border-4 border-blue-100">
                <ArrowRight className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Our Solutions</h2>
              <p className="text-xl text-gray-600">Comprehensive support for all your accreditation needs</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 ${solution.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                      <CardDescription className="text-base">{solution.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" asChild className="group-hover:text-blue-600">
                        <Link to={solution.link}>
                          Learn More <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Key Features of Our Platform</h2>
              <p className="text-xl text-gray-600">Everything you need for successful accreditation</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Why Choose Us</h2>
            <p className="mb-12 text-xl text-blue-100">Proven expertise and results</p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-white">100+</div>
                <div className="text-blue-100">Colleges Served</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-white">12</div>
                <div className="text-blue-100">States Covered</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-white">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-white">24/7</div>
                <div className="text-blue-100">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Success Stories</h2>
              <p className="text-xl text-gray-600">What our clients say about us</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col">
                    <div className="mb-4 flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mb-6 text-gray-700 italic text-center flex-1 flex items-center">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-4 mt-auto">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.position}</div>
                        <div className="text-sm text-blue-600">{testimonial.college}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Boost Your Accreditation Scores?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Join 100+ colleges that have transformed their accreditation process with our platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-white text-blue-600 bg-white hover:bg-gray-100">
                <Link to="/precheck">Try Pre-Check Tool</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}