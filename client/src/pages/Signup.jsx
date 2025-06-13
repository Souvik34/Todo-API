/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import { z } from 'zod';
import api from '../api';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

// Zod schema
const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Convert Zod errors to Formik-compatible format
function validateWithZod(schema) {
  return (values) => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors = {};
    result.error.errors.forEach((err) => {
      const path = err.path[0];
      errors[path] = err.message;
    });
    return errors;
  };
}

// Custom input component
const InputField = ({ label, name, type = 'text', showPasswordToggle, showPassword, setShowPassword }) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-white">{label}</label>
      <div className="relative mt-2">
        <input
          {...field}
          id={name}
          type={type === 'password' && showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          className={`block w-full rounded-md bg-white px-3 py-2 pr-10 text-base text-gray-900 placeholder:text-gray-400 
            focus:outline-2 focus:outline-blue-600 ${hasError ? 'border-2 border-red-500' : ''}`}
        />
        {hasError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AiOutlineExclamationCircle size={20} />
          </span>
        )}
        {showPasswordToggle && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </span>
        )}
      </div>
      {hasError && name === 'email' && (
        <div className="text-sm font-bold text-red-700 mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

const handleSignup = async (values, { setSubmitting, setErrors }) => {
  try {
    console.log('Sending signup data:', values);
    await api.post('auth/register', values);
    toast.success('Signup successful! Please log in.');
    navigate('/login');
  } catch (err) {
    console.error('Signup error:', err);

    // Handle string or object error messages
    const rawData = err.response?.data;
    const message =
      typeof rawData === 'string'
        ? rawData
        : rawData?.message || 'Signup failed';

    // Show toast with message from backend
    toast.error(message);

    // Set field-specific errors if possible
    if (message.toLowerCase().includes('email')) {
      setErrors({ email: message });
    } else if (message.toLowerCase().includes('user')) {
      setErrors({ username: message });
    }
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h1 className="text-blue-200 font-bold text-6xl">TaskBite</h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={validateWithZod(signupSchema)}
          onSubmit={handleSignup}
          validateOnChange
          validateOnBlur
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-xl" noValidate>
              <InputField name="username" label="Username" />
              <InputField name="email" label="Email" type="email" />
              <InputField
                name="password"
                label="Password"
                type="password"
                showPasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                showPasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white font-semibold transition"
              >
                {isSubmitting ? 'Signing up...' : 'Sign up'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center font-bold text-white text-lg">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-indigo-200 hover:text-white underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
