/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import { z } from 'zod';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../api';
import toast from 'react-hot-toast';

// Zod schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Zod to Formik validator
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

// Reusable input with eye toggle & error display
const InputField = ({ label, name, type = 'text' }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const hasError = meta.touched && meta.error;
  const isPassword = type === 'password';

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-white">{label}</label>
      <div className="relative mt-2">
        <input
          {...field}
          id={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`block w-full rounded-md bg-white px-3 py-2 pr-12 text-base text-gray-900 placeholder:text-gray-400 
            focus:outline-2 focus:outline-blue-600 ${hasError ? 'border-2 border-red-500' : ''}`}
        />

        {/* Password toggle icon */}
        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </span>
        )}

        {/* Error icon */}
        {hasError && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
            <AiOutlineExclamationCircle size={20} />
          </span>
        )}
      </div>

      {hasError && <div className="text-bold text-red-700 mt-1">{meta.error}</div>}
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();

 const handleLogin = async (values, { setSubmitting }) => {
  try {
    console.log('Sending login data:', values);

    const res = await api.post('auth/login', values);
    const { token, username } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    toast.success('Login successful!');
    navigate('/todos');
  } catch (err) {
    console.error('Login failed:', err);
    toast.error(err.response?.data?.message || 'Login failed');
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h1 className="text-blue-200 font-bold text-6xl">TaskBite</h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validateWithZod(loginSchema)}
          onSubmit={handleLogin}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-xl" noValidate>
              <InputField name="email" label="Email" type="email" />
              <InputField name="password" label="Password" type="password" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold transition"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-white text-base">
          Not a member?{' '}
          <a href="/signup" className="font-semibold text-indigo-200 hover:text-white underline">
            Join here!
          </a>
        </p>
      </div>
    </div>
  );
}
