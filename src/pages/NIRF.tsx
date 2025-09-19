import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  BookOpen, 
  FlaskConical, 
  GraduationCap, 
  Users, 
  Eye,
  BarChart3,
  Calendar,
  FileText,
  Target,
  Presentation,
  ClipboardCheck,
  HelpCircle,
  Trophy,
  Star,
  Zap,
  Award
} from 'lucide-react';

export default function NIRF() {
  const nirfParameters = [
    {
      title: 'Teaching, Learning & Resources',
      description: 'Faculty-student ratio, faculty qualifications, and financial resources',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Research and Professional Practice',
      description: 'Publications, patents, research projects, and professional practice',
      icon: FlaskConical,
      color: 'bg-blue-500'
    },
    {
      title: 'Graduation Outcomes',
      description: 'Graduate employment, higher studies, and entrepreneurship outcomes',
      icon: GraduationCap,
      color: 'bg-green-500'
    },
    {
      title: 'Outreach and Inclusivity',
      description: 'Regional diversity, women participation, and economically disadvantaged students',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: 'Perception',
      description: 'Academic peer review and employer perception scores',
      icon: Eye,
      color: 'bg-teal-500'
    }
  ];

  const keyFeatures = [
    {
      title: 'Ranking Simulation Dashboard',
      description: 'Real-time NIRF score calculation and ranking prediction based on your data',
      icon: BarChart3,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Year-on-Year Comparison',
      description: 'Track your performance trends and identify improvement areas over multiple years',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Parameter-wise Data Templates',
      description: 'Structured templates for all NIRF parameters with automated calculations',
      icon: FileText,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Improvement Strategy Planner',
      description: 'AI-powered recommendations to boost your NIRF ranking systematically',
      icon: Target,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const supportServices = [
    {
      title: 'Data Preparation Workshops',
      description: 'Comprehensive training on NIRF data collection and validation processes',
      icon: Presentation
    },
    {
      title: 'Mock Ranking Evaluation',
      description: 'Simulated NIRF evaluation with expert feedback and improvement suggestions',
      icon: ClipboardCheck
    },
    {
      title: 'Strategic Consultation',
      description: 'Expert guidance on long-term strategies to improve NIRF ranking',
      icon: HelpCircle
    }
  ];

  const successMetrics = [
    {
      number: '30+',
      label: 'Institutions Ranked',
      icon: Trophy,
      color: 'bg-purple-500'
    },
    {
      number: '75%',
      label: 'Ranking Improvement',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      number: '50+',
      label: 'Average Position Jump',
      icon: Zap,
      color: 'bg-green-500'
    },
    {
      number: '95%',
      label: 'Data Accuracy Rate',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
              NIRF Ranking Excellence
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Boost Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                NIRF Ranking
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Data-driven insights to improve performance year over year with strategic planning and expert guidance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-purple-600 hover:bg-purple-700">
                <Link to="/contact">Request Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-purple-600 text-purple-600 hover:bg-purple-50">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NIRF Parameters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NIRF Parameters</h2>
              <p className="text-xl text-gray-600">Comprehensive coverage of all five NIRF ranking parameters</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {nirfParameters.map((parameter, index) => {
                const Icon = parameter.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader>
                      <div className={`w-12 h-12 ${parameter.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{parameter.title}</CardTitle>
                      <CardDescription className="text-sm">{parameter.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Key Features</h2>
              <p className="text-xl text-gray-600">Advanced tools to boost your NIRF ranking systematically</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {keyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${feature.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Our NIRF Process</h2>
              <p className="text-xl text-gray-600">Strategic approach to improve your NIRF ranking</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Current Ranking Analysis</h3>
                <p className="text-gray-600 text-sm">Comprehensive assessment of your current NIRF performance and position</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Collection & Validation</h3>
                <p className="text-gray-600 text-sm">Systematic data gathering with accuracy verification for all parameters</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Strategy Development</h3>
                <p className="text-gray-600 text-sm">Customized improvement strategy with actionable recommendations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Implementation & Monitoring</h3>
                <p className="text-gray-600 text-sm">Continuous support for strategy implementation and progress tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Support Services</h2>
              <p className="text-xl text-gray-600">Expert guidance throughout your NIRF improvement journey</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {supportServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">NIRF Success Metrics</h2>
              <p className="text-xl text-purple-100">Our proven track record in NIRF ranking improvement</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {successMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${metric.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{metric.number}</div>
                      <div className="text-purple-100 font-medium">{metric.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-800 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Boost Your NIRF Ranking?
            </h2>
            <p className="mb-8 text-xl text-indigo-200">
              Join 30+ institutions that have significantly improved their NIRF rankings with our data-driven approach.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-purple-600 hover:bg-purple-700">
                <Link to="/contact">Request Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-white text-purple-800 bg-white hover:bg-gray-100">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}