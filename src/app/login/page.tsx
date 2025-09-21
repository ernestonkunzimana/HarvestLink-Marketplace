'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authService } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await authService.login(phone, otp);
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
      setError(err instanceof Error ? err.message : 'Login failed');
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
          <CardTitle className="text-2xl">Welcome to HarvestLink</CardTitle>
          <p className="text-gray-600">
            {step === 'phone' ? 'Enter your phone number to continue' : 'Enter the OTP sent to your phone'}
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250788123456"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use <strong>123456</strong> for demo
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Login'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep('phone')}
              >
                Back
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-green-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Demo Accounts:</p>
            <div className="text-xs text-blue-700 mt-1 space-y-1">
              <p>Cooperative: +250788123456</p>
              <p>Buyer: +250788654321</p>
              <p>Government: +250788999888</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}