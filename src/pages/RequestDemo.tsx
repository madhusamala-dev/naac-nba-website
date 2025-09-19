import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Send } from 'lucide-react';

interface FormData {
  name: string;
  designation: string;
  email: string;
  contactNo: string;
  college: string;
}

interface FormErrors {
  name?: string;
  designation?: string;
  email?: string;
  contactNo?: string;
  college?: string;
}

export default function RequestDemo() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    designation: '',
    email: '',
    contactNo: '',
    college: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Designation validation
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Contact number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contactNo.replace(/\s+/g, ''))) {
      newErrors.contactNo = 'Please enter a valid 10-digit mobile number';
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    } else if (formData.college.trim().length < 3) {
      newErrors.college = 'College name must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast.success('Request submitted successfully! Our team will be in touch very soon!', {
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        designation: '',
        email: '',
        contactNo: '',
        college: ''
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Form Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">Request Demo</CardTitle>
              <p className="text-gray-600 mt-2">
                Fill out the form below and our team will get in touch with you to schedule a personalized demo.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Designation Field */}
                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-sm font-medium text-gray-700">
                    Designation *
                  </Label>
                  <Input
                    id="designation"
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="e.g., Principal, Dean, HOD, Faculty"
                    className={errors.designation ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.designation && (
                    <p className="text-sm text-red-600">{errors.designation}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Contact Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="contactNo" className="text-sm font-medium text-gray-700">
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNo"
                    type="tel"
                    value={formData.contactNo}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                    placeholder="Enter your 10-digit mobile number"
                    className={errors.contactNo ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.contactNo && (
                    <p className="text-sm text-red-600">{errors.contactNo}</p>
                  )}
                </div>

                {/* College Field */}
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-sm font-medium text-gray-700">
                    College/Institution Name *
                  </Label>
                  <Input
                    id="college"
                    type="text"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="Enter your college or institution name"
                    className={errors.college ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.college && (
                    <p className="text-sm text-red-600">{errors.college}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What to expect:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Our team will contact you within 24 hours</li>
                  <li>• Personalized demo based on your institution's needs</li>
                  <li>• Discussion of NAAC, NBA, and NIRF requirements</li>
                  <li>• Custom pricing and implementation timeline</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}