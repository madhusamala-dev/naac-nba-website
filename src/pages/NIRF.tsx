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
  Zap,
  GraduationCap,
  DollarSign
} from 'lucide-react';

export default function NIRF() {
  const parameters = [
    {
      title: 'Teaching, Learning & Resources (TLR)',
      description: 'Faculty-student ratio, faculty qualifications, and financial resources',
      icon: GraduationCap,
      color: 'bg-purple-500',
      weight: '30%'
    },
    {
      title: 'Research and Professional Practice (RP)',
      description: 'Publications, patents, research projects, and professional practice',
      icon: Lightbulb,
      color: 'bg-blue-500',
      weight: '30%'
    },
    {
      title: 'Graduation Outcomes (GO)',
      description: 'Graduate employment, higher studies, and entrepreneurship metrics',
      icon: Users,
      color: 'bg-green-500',
      weight: '20%'
    },
    {
      title: 'Outreach and Inclusivity (OI)',
      description: 'Diversity, regional diversity, and economically disadvantaged students',
      icon: Heart,
      color: 'bg-orange-500',
      weight: '10%'
    },
    {
      title: 'Perception (PR)',
      description: 'Academic and employer perception through surveys and feedback',
      icon: Star,
      color: 'bg-indigo-500',
      weight: '10%'
    }
  ];

  const features = [
    {
      title: 'NIRF Data Collection Portal',
      description: 'Automated data collection system aligned with NIRF parameters and metrics',
      icon: Database
    },
    {
      title: 'Ranking Simulation Engine',
      description: 'Predict your NIRF ranking based on current data and identify improvement areas',
      icon: BarChart3
    },
    {
      title: 'Parameter-wise Analytics',
      description: 'Detailed analysis of performance across all five NIRF parameters',
      icon: Target
    },
    {
      title: 'Benchmarking Dashboard',
      description: 'Compare your performance with peer institutions and top-ranked colleges',
      icon: TrendingUp
    }
  ];

  const supportServices = [
    {
      title: 'Data Validation Workshops',
      description: 'Training sessions on accurate data collection and validation for NIRF submission',
      icon: Presentation
    },
    {
      title: 'Ranking Strategy Consultation',
      description: 'Expert consultation on strategic improvements to boost NIRF ranking',
      icon: ClipboardCheck
    },
    {
      title: 'Submission Support',
      description: 'Technical assistance during NIRF data submission and verification process',
      icon: HelpCircle
    }
  ];

  const processSteps = [
    {
      title: 'Current Ranking Analysis',
      description: 'Comprehensive analysis of current position and performance gaps',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      title: 'Strategic Planning',
      description: 'Development of targeted improvement strategies for each parameter',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'Implementation & Monitoring',
      description: 'Execution of improvement plans with continuous monitoring and optimization',
      icon: TrendingUp,
      color: 'bg-green-500'
    }
  ];

  const successMetrics = [
    {
      number: '60+',
      label: 'Institutions Ranked',
      icon: Trophy,
      color: 'bg-purple-500'
    },
    {
      number: '45',
      label: 'Average Rank Improvement',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      number: '85%',
      label: 'Ranking Success Rate',
      icon: Star,
      color: 'bg-green-500'
    },
    {
      number: '3 Months',
      label: 'Average Turnaround',
      icon: Clock,
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
              NIRF Ranking Services
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Improve Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                NIRF Ranking
              </span>{' '}
              Strategically
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Data-driven approach to enhance your National Institutional Ranking Framework position with expert guidance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-purple-600 hover:bg-purple-700">
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-purple-600 text-purple-600 hover:bg-purple-50">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NIRF Parameters Coverage */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NIRF Parameters Coverage</h2>
              <p className="text-xl text-gray-600">Comprehensive support for all five NIRF ranking parameters</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {parameters.map((parameter, index) => {
                const Icon = parameter.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${parameter.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {parameter.weight}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{parameter.title}</CardTitle>
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
              <p className="text-xl text-gray-600">Advanced tools for NIRF ranking improvement</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <Icon className="w-6 h-6 text-purple-600" />
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
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Our NIRF Process</h2>
              <p className="text-xl text-purple-100">Strategic approach to ranking improvement</p>
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
                      <p className="text-purple-100">{step.description}</p>
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
              <p className="text-xl text-gray-600">Expert guidance for NIRF ranking success</p>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">NIRF Success Metrics</h2>
              <p className="text-xl text-gray-600">Proven results in ranking improvements</p>
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
              Ready to Improve Your NIRF Ranking?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join 60+ institutions that have enhanced their NIRF rankings with our strategic approach and expert guidance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-purple-600 hover:bg-purple-700">
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