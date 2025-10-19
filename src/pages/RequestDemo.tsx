import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, CheckCircle, Mail, Phone, Building, User } from 'lucide-react';

export default function RequestDemo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution_name: '',
    designation: '',
    service_type: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.institution_name.trim()) errors.push('Institution name is required');
    if (!formData.service_type) errors.push('Service type is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (optional but if provided should be valid)
    if (formData.phone && formData.phone.length < 10) {
      errors.push('Please enter a valid phone number');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/demo/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast.success('Demo request submitted successfully!');
        
        // Show additional info about email status
        if (result.emails?.confirmation_sent) {
          toast.success('Confirmation email sent to your inbox');
        }
        if (result.emails?.notification_sent) {
          toast.success('Our team has been notified');
        }
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          institution_name: '',
          designation: '',
          service_type: '',
          message: ''
        });
      } else {
        toast.error(result.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution_name: '',
      designation: '',
      service_type: '',
      message: ''
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Request Submitted Successfully!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your interest in our accreditation services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-green-50 p-6">
                  <h3 className="mb-3 font-semibold text-green-800">What happens next?</h3>
                  <ul className="space-y-2 text-left text-green-700">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                      Our team will review your request within 24 hours
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                      You'll receive a confirmation email shortly
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                      We'll schedule a personalized consultation call
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                      Receive a customized service proposal
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button onClick={resetForm} variant="outline" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Submit Another Request
                  </Button>
                  <Button onClick={() => window.location.href = '/'} className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Need immediate assistance? Contact us at:</p>
                  <p className="font-medium">madhusamala.trainer@gmail.com</p>
                </div>
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
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Request a Demo</h1>
            <p className="text-xl text-gray-600">
              Get personalized guidance for your accreditation journey
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Our experts will contact you within 24 hours
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Mail className="mr-3 h-6 w-6 text-blue-600" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Fill out the form below and our team will reach out to schedule your personalized demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                      placeholder="your.email@institution.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91-9876543210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      type="text"
                      placeholder="e.g., Director, Principal, Dean"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    Institution Name *
                  </Label>
                  <Input
                    id="institution"
                    type="text"
                    placeholder="Enter your institution name"
                    value={formData.institution_name}
                    onChange={(e) => handleInputChange('institution_name', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Type *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => handleInputChange('service_type', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the service you're interested in" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NAAC">NAAC Accreditation</SelectItem>
                      <SelectItem value="NBA">NBA Accreditation</SelectItem>
                      <SelectItem value="NIRF">NIRF Ranking</SelectItem>
                      <SelectItem value="All Services">All Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your specific requirements, timeline, or any questions you have..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-medium text-blue-900">What to expect:</h3>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Personalized consultation within 24 hours</li>
                    <li>• Customized service recommendations</li>
                    <li>• Timeline and cost estimation</li>
                    <li>• Free initial assessment</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Submit Demo Request
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to be contacted by our team regarding your accreditation needs.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}