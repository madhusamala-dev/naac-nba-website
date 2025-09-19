import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';

export default function Index() {
  const services = [
    {
      title: 'NAAC Accreditation',
      description: 'Comprehensive support for National Assessment and Accreditation Council processes',
      features: ['SSR Preparation', 'Peer Team Visit Support', 'Grade Improvement'],
      color: 'bg-blue-50 border-blue-200',
      link: '/naac'
    },
    {
      title: 'NBA Accreditation',
      description: 'Expert guidance for National Board of Accreditation for engineering programs',
      features: ['SAR Generation', 'Outcome Assessment', 'Compliance Tracking'],
      color: 'bg-green-50 border-green-200',
      link: '/nba'
    },
    {
      title: 'NIRF Ranking',
      description: 'Strategic support to improve National Institutional Ranking Framework position',
      features: ['Data Analysis', 'Score Simulation', 'Ranking Strategy'],
      color: 'bg-purple-50 border-purple-200',
      link: '/nirf'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      designation: 'Principal',
      college: 'ABC Engineering College',
      content: 'The platform helped us achieve A+ grade in NAAC with 90% less effort. Highly recommended!',
      rating: 5
    },
    {
      name: 'Prof. Priya Sharma',
      designation: 'NAAC Coordinator',
      college: 'XYZ Institute of Technology',
      content: 'Excellent support throughout the NBA accreditation process. Our success rate improved significantly.',
      rating: 5
    },
    {
      name: 'Dr. Anil Verma',
      designation: 'Dean Academic Affairs',
      college: 'PQR University',
      content: 'NIRF ranking improved by 50 positions with their data-driven approach and expert guidance.',
      rating: 5
    }
  ];

  const stats = [
    { number: '200+', label: 'Institutions Served', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '50%', label: 'Time Saved', icon: TrendingUp },
    { number: '24/7', label: 'Expert Support', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Trusted by 200+ Educational Institutions
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Streamline Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accreditation Journey
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Expert guidance and automated tools for NAAC, NBA, and NIRF success. 
              Achieve higher grades and rankings with our proven methodology.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/request-demo">Request A Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link to="/precheck">Start Pre-Check</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive accreditation and ranking solutions</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <Card key={index} className={`${service.color} hover:shadow-lg transition-all duration-300 group`}>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full group-hover:bg-white">
                      <Link to={service.link}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Us</h2>
              <p className="text-xl text-gray-600">Proven results that speak for themselves</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Success stories from leading educational institutions</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.designation}</div>
                      <div className="text-sm text-gray-500">{testimonial.college}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Institution?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Join 200+ institutions that have achieved accreditation success with our platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/request-demo">Request A Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/precheck">Start Free Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}