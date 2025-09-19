import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';

export default function Index() {
  const services = [
    {
      title: 'NAAC Accreditation',
      description: 'Comprehensive support for National Assessment and Accreditation Council processes',
      features: ['SSR Preparation', 'Peer Team Support', 'Grade Improvement'],
      color: 'bg-blue-500',
      link: '/naac'
    },
    {
      title: 'NBA Accreditation',
      description: 'Complete assistance for National Board of Accreditation requirements',
      features: ['SAR Generation', 'Outcome Assessment', 'Compliance Tracking'],
      color: 'bg-green-500',
      link: '/nba'
    },
    {
      title: 'NIRF Rankings',
      description: 'Strategic guidance to improve National Institutional Ranking Framework scores',
      features: ['Data Analysis', 'Score Simulation', 'Ranking Strategy'],
      color: 'bg-purple-500',
      link: '/nirf'
    }
  ];

  const features = [
    {
      title: 'Automated Documentation',
      description: 'Generate reports and documentation with 90% time savings',
      icon: CheckCircle
    },
    {
      title: 'Expert Mentorship',
      description: 'Get guidance from certified accreditation professionals',
      icon: Users
    },
    {
      title: 'Real-time Analytics',
      description: 'Track progress with live dashboards and score predictions',
      icon: TrendingUp
    },
    {
      title: 'Proven Success',
      description: 'Join 200+ institutions that achieved accreditation with us',
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Principal, ABC Engineering College',
      content: 'The platform reduced our NAAC preparation time by 60%. Excellent support throughout the process.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Prof. Meera Sharma',
      position: 'NAAC Coordinator, XYZ University',
      content: 'Automated SSR generation and expert guidance helped us achieve A+ grade in first attempt.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Dr. Anil Patel',
      position: 'Dean, PQR Institute',
      content: 'Outstanding platform for NBA accreditation. The SAR builder saved us months of work.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Trusted by 200+ Institutions
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Accelerate Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accreditation Journey
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
              Streamline NAAC, NBA, and NIRF processes with automated tools, expert guidance, and proven methodologies.
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
              <p className="text-xl text-gray-600">Comprehensive accreditation solutions tailored to your needs</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full group-hover:bg-gray-50">
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Us?</h2>
              <p className="text-xl text-gray-600">Advanced features that make accreditation simple and efficient</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Profile Pictures */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Success stories from institutions across India</p>
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
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Accreditation Process?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Join hundreds of institutions that have streamlined their accreditation journey with our platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/request-demo">Request A Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-white text-blue-600 bg-white hover:bg-blue-50">
                <Link to="/precheck">Start Free Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}