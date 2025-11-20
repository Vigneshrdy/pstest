'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAuth, withGuest } from '@/hooks/useAuth';
import { RegisterFormData } from '@/types';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const validatePasswordStrength = (password: string) => {
    if (!password) return true;
    
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const getPasswordStrengthIndicator = (password: string) => {
    if (!password) return { strength: 0, text: '' };
    
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    
    const strength = checks.filter(Boolean).length;
    
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength - 1] || '';
    const strengthColor = ['red', 'red', 'yellow', 'blue', 'green'][strength - 1] || 'gray';
    
    return { strength, text: strengthText, color: strengthColor };
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth
      });
    } catch (error: any) {
      console.error('Registration error:', error);
    }
  };

  const passwordStrength = getPasswordStrengthIndicator(password || '');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
                  type="text"
                  className={`input-field ${errors.firstName ? 'border-red-300' : ''}`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
                  type="text"
                  className={`input-field ${errors.lastName ? 'border-red-300' : ''}`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                autoComplete="email"
                className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                {...register('phoneNumber', {
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: 'Invalid phone number'
                  }
                })}
                type="tel"
                className={`input-field ${errors.phoneNumber ? 'border-red-300' : ''}`}
                placeholder="+1234567890"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
              <input
                {...register('dateOfBirth', {
                  required: 'Date of birth is required',
                  validate: (value) => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    return age >= 18 || 'You must be at least 18 years old';
                  }
                })}
                type="date"
                className={`input-field ${errors.dateOfBirth ? 'border-red-300' : ''}`}
                max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    validate: validatePasswordStrength,
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field pr-12 ${errors.password ? 'border-red-300' : ''}`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 bg-${passwordStrength.color}-500`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm text-${passwordStrength.color}-600 font-medium`}>
                      {passwordStrength.text}
                    </span>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="grid grid-cols-2 gap-1">
                      <div className={`flex items-center ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckIcon className="h-3 w-3 mr-1" />
                        8+ characters
                      </div>
                      <div className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckIcon className="h-3 w-3 mr-1" />
                        Uppercase
                      </div>
                      <div className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckIcon className="h-3 w-3 mr-1" />
                        Lowercase
                      </div>
                      <div className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckIcon className="h-3 w-3 mr-1" />
                        Number
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  Password must contain at least 8 characters with uppercase, lowercase, number and special character
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="relative">
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`input-field pr-12 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                {...register('acceptTerms', {
                  required: 'You must accept the terms and conditions'
                })}
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {(isSubmitting || isLoading) && (
                <div className="loading-spinner mr-2"></div>
              )}
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withGuest(RegisterPage);