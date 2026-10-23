"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineError } from "react-icons/md";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { singIn, singUp, signInSocial } from "@/lib/actions/auth-actions";


export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get callback URL from search params (set by middleware)

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");

    try {
      // console.log("Logged in with", provider);

      // const result = await signInSocial(provider)
      const url = await signInSocial(provider);

      window.location.assign(url);

      // if (!result.user) {
      //   setError("Invalid email or password");
      // }

    } catch (err) {
      setError(
        `Error authenticating with ${provider}: ${err instanceof Error ? err.message : "Unknown error"
        }`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignIn) {
        // console.log("Signed in");
        const result = await singIn({ email, password });

        if (!result.user) {
          setError("Invalid email or password");
        }

      } else {
        // console.log("Signed up");
        const result = await singUp({ name, email, password });

        if (!result.user) {
          setError("Failed to create account");
        }
      }

      router.replace("/dashboard");
      router.refresh();


    } catch (err) {
      setError(
        `Authentication error: ${err instanceof Error ? err.message : "Unknown error" }`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {isSignIn
                ? "Sign in to your account to continue"
                : "Sign up to get started with better-auth"}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="shrink-0">
                  <MdOutlineError />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Social Authentication */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FcGoogle className="w-11 h-6" />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth("github")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaGithub className="w-11 h-6" /> Continue with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-linear-to-br from-blue-50 to-indigo-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email/Password Form */}


          <Form onSubmit={handleEmailAuth} className="w-full space-y-4">
            {!isSignIn && (
              <TextField
                name="name"
                type="text"
                isRequired
                autoComplete="name"
                value={name}
                onChange={setName}
                validate={(value) => {
                  if (!value.trim()) {
                    return "Full name is required";
                  }

                  if (value.trim().length < 3) {
                    return "Name must be at least 3 characters";
                  }

                  return null;
                }}
              >
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FieldError className="text-rose-600 text-xs ml-3" />
              </TextField>
            )}

            <TextField
              name="email"
              type="email"
              isRequired
              autoComplete="email"
              value={email}
              onChange={setEmail}
              validate={(value) => {
                if (!value.trim()) {
                  return "Email address is required";
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FieldError className="text-rose-600 text-xs ml-3" />
            </TextField>

            <TextField
              name="password"
              type="password"
              isRequired
              autoComplete={isSignIn ? "current-password" : "new-password"}
              value={password}
              onChange={setPassword}
              validate={(value) => {
                if (!value) {
                  return "Password is required";
                }

                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FieldError className="text-rose-600 text-xs ml-3" />
            </TextField>

            <Button
              type="submit"
              isDisabled={isLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-md" />
                  {isSignIn ? "Signing in..." : "Creating account..."}
                </span>
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </Form>



          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError(""); // Clear any previous errors
                setName(""); // Clear name when switching modes
              }}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors"
            >
              {isSignIn
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
