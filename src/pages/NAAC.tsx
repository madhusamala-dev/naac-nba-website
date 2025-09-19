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
  GraduationCap,
  Trophy,
  Clock
} from 'lucide-react';

export default function NAAC() {
  const criteria = [
    {
      title: 'Curricular Aspects',
      description: 'Curriculum design, academic flexibility, and feedback mechanisms',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Teaching-Learning & Evaluation',
      description: 'Student enrollment, faculty profile, learning outcomes, and evaluation process',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Research, Innovation & Extension',
      description: 'Research promotion, resource mobilization, and community engagement',
      icon: Lightbulb,
      color: 'bg-purple-500'
    },
    {
      title: 'Infrastructure & Learning Resources',
      description: 'Physical facilities, library resources, and IT infrastructure',
      icon: Building,
      color: 'bg-orange-500'
    },
    {
      title: 'Student Support & Progression',
      description: 'Student support services, guidance, and progression tracking',
      icon: TrendingUp,
      color: 'bg-indigo-500'
    },
    {
      title: 'Governance, Leadership & Management',
      description: 'Institutional vision, leadership, strategy development, and faculty empowerment',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      title: 'Institutional Values & Best Practices',
      description: 'Gender equity, environmental consciousness, and institutional distinctiveness',
      icon: Heart,
      color: 'bg-pink-500'
    }
  ];

  const features = [
    {
      title: 'SSR Builder with Metric-wise Templates',
      description: 'Pre-built templates for all NAAC metrics with automated data population',
      icon: FileText
    },
    {
      title: 'Data Validation & Evidence Upload',
      description: 'Built-in validation rules and centralized evidence management system',
      icon: Database
    },
    {
      title: 'Automated Score Simulation',
      description: 'Real-time score calculation and grade prediction based on your data',
      icon: BarChart3
    },
    {
      title: 'Mock Peer Team Audits',
      description: 'Simulated peer team visits with expert evaluators and feedback',
      icon: UserCheck
    }
  ];

  const supportServices = [
    {
      title: 'Faculty Workshops',
      description: 'Comprehensive training sessions for faculty on NAAC processes and documentation',
      icon: Presentation
    },
    {
      title: 'Mock Assessments',
      description: 'Practice assessments with detailed feedback to identify improvement areas',
      icon: ClipboardCheck
    },
    {
      title: 'Documentation Help',
      description: 'Expert assistance in organizing and presenting institutional data effectively',
      icon: HelpCircle
    }
  ];

  const processSteps = [
    {
      title: 'Assessment & Planning',
      description: 'Initial readiness assessment and customized preparation roadmap',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'Implementation',
      description: 'Data collection, SSR preparation, and evidence organization',
      icon: Settings,
      color: 'bg-green-500'
    },
    {
      title: 'Submission & Support',
      description: 'Final review, submission assistance, and peer team visit preparation',
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  const successMetrics = [
    {
      number: '85+',
      label: 'Colleges Accredited',
      icon: GraduationCap,
      color: 'bg-blue-500'
    },
    {
      number: '92%',
      label: 'A Grade Achievement',
      icon: Trophy,
      color: 'bg-green-500'
    },
    {
      number: '3.2',
      label: 'Average CGPA Score',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      number: '45%',
      label: 'Time Reduction',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              NAAC Accreditation Services
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Achieve{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NAAC Accreditation
              </span>{' '}
              with Ease
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Automated SSR prep, metric-wise data mapping, and gap identification for successful accreditation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/contact">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NAAC Criteria Coverage */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NAAC Criteria Coverage</h2>
              <p className="text-xl text-gray-600">Comprehensive support for all seven NAAC criteria</p>
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
              <p className="text-xl text-gray-600">Advanced tools to streamline your NAAC preparation</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Icon className="w-6 h-6 text-blue-600" />
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
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Our NAAC Process</h2>
              <p className="text-xl text-blue-100">Step-by-step guidance for successful accreditation</p>
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
                      <p className="text-blue-100">{step.description}</p>
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
              <p className="text-xl text-gray-600">Comprehensive support throughout your NAAC journey</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {supportServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
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

      {/* Success Metrics - Updated with Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NAAC Success Metrics</h2>
              <p className="text-xl text-gray-600">Our track record speaks for itself</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {successMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
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
              Ready to Start Your NAAC Journey?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join 85+ colleges that have achieved NAAC accreditation with our expert guidance and automated tools.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700">
                <Link to="/contact">Request Demo</Link>
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