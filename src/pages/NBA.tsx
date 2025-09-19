import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  BookOpen, 
  Users, 
  Building, 
  TrendingUp, 
  Award, 
  DollarSign,
  FileText,
  Settings,
  BarChart3,
  Database,
  UserCheck,
  Presentation,
  HelpCircle,
  ClipboardCheck,
  Eye,
  Lightbulb,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

export default function NBA() {
  const nbaCriteria = [
    {
      title: 'Vision, Mission, PEOs',
      description: 'Program Educational Objectives aligned with institutional vision and mission',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      title: 'Program Curriculum',
      description: 'Curriculum design, delivery, and assessment methodologies',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Faculty Contributions',
      description: 'Faculty qualifications, development, and research contributions',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Facilities and Technical Support',
      description: 'Infrastructure, laboratories, library, and computing facilities',
      icon: Building,
      color: 'bg-orange-500'
    },
    {
      title: 'Continuous Improvement',
      description: 'Quality assurance processes and outcome-based education implementation',
      icon: TrendingUp,
      color: 'bg-teal-500'
    },
    {
      title: 'Student Performance',
      description: 'Student progression, achievement, and placement outcomes',
      icon: Award,
      color: 'bg-indigo-500'
    },
    {
      title: 'Governance and Financial Resources',
      description: 'Administrative processes, financial management, and resource allocation',
      icon: DollarSign,
      color: 'bg-red-500'
    }
  ];

  const keyFeatures = [
    {
      title: 'SAR Generator Module',
      description: 'Automated Self-Assessment Report generation with criterion-wise templates',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'PO/PSO/CO Attainment Automation',
      description: 'Automated calculation of Program Outcomes, Program Specific Outcomes, and Course Outcomes',
      icon: Target,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Gap Analysis with Improvement Suggestions',
      description: 'Comprehensive gap identification and actionable improvement recommendations',
      icon: BarChart3,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Data Evidence Management',
      description: 'Centralized repository for all supporting documents and evidence tracking',
      icon: Database,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const supportServices = [
    {
      title: 'Department-level Mentoring',
      description: 'Dedicated support for each department with NBA-certified mentors and experts',
      icon: UserCheck
    },
    {
      title: 'Pre-audit Support',
      description: 'Mock audits and comprehensive preparation for NBA evaluation visits',
      icon: ClipboardCheck
    },
    {
      title: 'Documentation Assistance',
      description: 'Expert help in organizing SAR documents and evidence compilation',
      icon: HelpCircle
    }
  ];

  const successMetrics = [
    {
      number: '65+',
      label: 'Programs Accredited',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      number: '88%',
      label: 'First-time Success Rate',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      number: '40%',
      label: 'Time Reduction',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      number: '25+',
      label: 'Engineering Disciplines',
      icon: Zap,
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              NBA Accreditation Excellence
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Streamline{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                NBA Accreditation
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              SAR preparation and compliance tracking made simple with automated tools and expert guidance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700">
                <Link to="/contact">Request Demo</Link>
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
              <p className="text-xl text-gray-600">Comprehensive support for all NBA accreditation criteria</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {nbaCriteria.map((criteria, index) => {
                const Icon = criteria.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader>
                      <div className={`w-12 h-12 ${criteria.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{criteria.title}</CardTitle>
                      <CardDescription className="text-sm">{criteria.description}</CardDescription>
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
              <p className="text-xl text-gray-600">Advanced tools to streamline your NBA accreditation process</p>
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
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Our NBA Process</h2>
              <p className="text-xl text-gray-600">Step-by-step guidance from preparation to accreditation</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Readiness Assessment</h3>
                <p className="text-gray-600 text-sm">Comprehensive evaluation of current status against NBA criteria</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">SAR Preparation & Data Collection</h3>
                <p className="text-gray-600 text-sm">Systematic data gathering and Self-Assessment Report compilation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Mock Evaluation</h3>
                <p className="text-gray-600 text-sm">Simulated NBA evaluation with expert feedback and recommendations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Final Submission & Support</h3>
                <p className="text-gray-600 text-sm">Complete assistance for NBA submission and evaluation visit</p>
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
              <p className="text-xl text-gray-600">Expert guidance throughout your NBA accreditation journey</p>
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
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">NBA Success Metrics</h2>
              <p className="text-xl text-green-100">Our proven track record in NBA accreditation</p>
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
                      <div className="text-green-100 font-medium">{metric.label}</div>
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
              Ready to Start Your NBA Journey?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join 65+ engineering programs that have achieved NBA accreditation with our comprehensive platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700">
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