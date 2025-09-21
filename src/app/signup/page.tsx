'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '' as UserRole,
    organization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await authService.signup(formData);
      if (user) {
        // Redirect based on role
        switch (user.role) {
          case 'cooperative':
            router.push('/cooperative/dashboard');
            break;
          case 'buyer':
            router.push('/buyer/marketplace');
            break;
          case 'government':
            router.push('/gov/dashboard');
            break;
          default:
            router.push('/');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">HL</span>
          </div>
          <CardTitle className="text-2xl">Join HarvestLink</CardTitle>
          <p className="text-gray-600">Create your account to get started</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="role">Account Type</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value: UserRole) => setFormData({...formData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cooperative">Cooperative</SelectItem>
                  <SelectItem value="buyer">Buyer/Vendor</SelectItem>
                  <SelectItem value="government">Government Official</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Full Name / Organization</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name or organization"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+250788123456"
                required
              />
            </div>

            {formData.role && (
              <div>
                <Label htmlFor="organization">
                  {formData.role === 'cooperative' ? 'Cooperative Name' :
                   formData.role === 'buyer' ? 'Company Name' :
                   'Department/Ministry'}
                </Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  placeholder={
                    formData.role === 'cooperative' ? 'e.g., Kigali Farmers Cooperative' :
                    formData.role === 'buyer' ? 'e.g., AgriTrade Rwanda Ltd' :
                    'e.g., Ministry of Agriculture'
                  }
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || !formData.role}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}