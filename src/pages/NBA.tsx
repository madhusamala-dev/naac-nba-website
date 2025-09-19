import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Building, 
  TrendingUp, 
  Shield, 
  Heart,
  FileText,
  Database,
  BarChart3,
  UserCheck,
  ArrowRight,
  Award,
  Target,
  Settings,
  Presentation,
  HelpCircle,
  ClipboardCheck,
  Trophy,
  Star,
  Clock,
  Zap
} from 'lucide-react';

export default function NBA() {
  const criteria = [
    {
      title: 'Vision, Mission & Program Educational Objectives',
      description: 'Clear articulation of institutional vision, mission, and program-specific objectives',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      title: 'Program Curriculum & Teaching-Learning Process',
      description: 'Curriculum design, delivery methods, and continuous improvement processes',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Course Outcomes & Program Outcomes Attainment',
      description: 'Assessment and measurement of learning outcomes at course and program levels',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      title: 'Students Performance',
      description: 'Academic performance, progression rates, and graduate employment statistics',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: 'Faculty Information & Contributions',
      description: 'Faculty qualifications, research contributions, and professional development',
      icon: UserCheck,
      color: 'bg-indigo-500'
    },
    {
      title: 'Facilities & Technical Support',
      description: 'Infrastructure, laboratories, library resources, and technical facilities',
      icon: Building,
      color: 'bg-red-500'
    },
    {
      title: 'Continuous Improvement',
      description: 'Quality assurance mechanisms and systematic improvement processes',
      icon: TrendingUp,
      color: 'bg-pink-500'
    }
  ];

  const features = [
    {
      title: 'SAR Builder with Automated Templates',
      description: 'Pre-configured Self Assessment Report templates for all NBA criteria',
      icon: FileText
    },
    {
      title: 'Outcome Assessment Tools',
      description: 'Comprehensive tools for measuring and documenting program and course outcomes',
      icon: BarChart3
    },
    {
      title: 'Faculty Portfolio Management',
      description: 'Centralized system for managing faculty credentials and contributions',
      icon: Users
    },
    {
      title: 'Compliance Tracking Dashboard',
      description: 'Real-time monitoring of NBA compliance requirements and deadlines',
      icon: Shield
    }
  ];

  const supportServices = [
    {
      title: 'Faculty Training Programs',
      description: 'Specialized workshops on NBA processes and outcome-based education',
      icon: Presentation
    },
    {
      title: 'Mock Evaluation Sessions',
      description: 'Practice evaluations with expert feedback to prepare for actual assessment',
      icon: ClipboardCheck
    },
    {
      title: 'Documentation Support',
      description: 'Expert assistance in organizing and presenting NBA documentation',
      icon: HelpCircle
    }
  ];

  const processSteps = [
    {
      title: 'Gap Analysis & Planning',
      description: 'Comprehensive assessment of current status and accreditation roadmap',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      title: 'SAR Preparation',
      description: 'Systematic preparation of Self Assessment Report with evidence collection',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Evaluation & Certification',
      description: 'Expert panel evaluation support and final certification assistance',
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  const successMetrics = [
    {
      number: '75+',
      label: 'Programs Accredited',
      icon: Trophy,
      color: 'bg-green-500'
    },
    {
      number: '88%',
      label: 'First-time Success',
      icon: Star,
      color: 'bg-blue-500'
    },
    {
      number: '6 Years',
      label: 'Average Validity',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      number: '40%',
      label: 'Time Savings',
      icon: Zap,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              NBA Accreditation Services
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Secure{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                NBA Accreditation
              </span>{' '}
              for Your Programs
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Comprehensive SAR preparation, outcome assessment, and expert guidance for successful NBA accreditation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700">
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-green-600 text-green-600 hover:bg-green-50">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NBA Criteria Coverage */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NBA Criteria Coverage</h2>
              <p className="text-xl text-gray-600">Complete support for all seven NBA criteria</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {criteria.map((criterion, index) => {
                const Icon = criterion.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 ${criterion.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{criterion.title}</CardTitle>
                      <CardDescription className="text-sm">{criterion.description}</CardDescription>
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
              <p className="text-xl text-gray-600">Advanced tools for NBA accreditation success</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Icon className="w-6 h-6 text-green-600" />
                          </div>
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

      {/* Process Overview */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Our NBA Process</h2>
              <p className="text-xl text-green-100">Systematic approach to NBA accreditation</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                      <p className="text-green-100">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
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
              <p className="text-xl text-gray-600">Expert guidance throughout your NBA journey</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {supportServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-green-600" />
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NBA Success Metrics</h2>
              <p className="text-xl text-gray-600">Proven track record of successful accreditations</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {successMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${metric.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">{metric.number}</div>
                      <div className="text-gray-600 font-medium">{metric.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Begin Your NBA Journey?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join 75+ programs that have achieved NBA accreditation with our comprehensive support system.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700">
                <Link to="/request-demo">Request Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-white text-slate-800 bg-white hover:bg-gray-100">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}