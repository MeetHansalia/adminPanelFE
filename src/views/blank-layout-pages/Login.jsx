"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import backgroundImage from "@/../public/AdminBackground2.jpg";

// MUI Imports
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

// React Hook Form and Yup Imports
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
// import NourishubsLogo from "@core/components/nourishubs/NourishubsLogo";

// Util Imports
import axiosApiCall from "@utils/axiosApiCall";
import { toastError, toastSuccess } from "@/utils/globalFunctions";
import { API_ROUTER } from "@/utils/apiRoutes";
import Image from "next/image";
import Link from "next/link";
import BusImage from "@/components/BusImage";

/**
 * Page
 */
const Login = ({ dictionary }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang: locale } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation schema using Yup
  const formValidationSchema = yup.object({
    email: yup
      .string()
      .required(dictionary?.form?.validation?.required)
      .email(dictionary?.form?.validation?.email_address),
    password: yup.string().when("login_type", {
      is: "password",
      then: yup.string().required(dictionary?.form?.validation?.required),
    }),
    isAgreePrivacyAndTerms: yup
      .boolean()
      .oneOf([true], dictionary?.form?.validation?.agree_privacy_policy),
    login_type: yup.string().required().oneOf(["password", "otp"]),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      isAgreePrivacyAndTerms: false,
      login_type: "password", // otp|password
    },
  });

  const [isFormSubmitLoading, setIsFormSubmitLoading] = useState(false);
  const pageFormRef = useRef(null);

  // Handle form submission
  const onSubmit = async (values) => {
    if (values.login_type === "otp") {
      // Handle OTP submission logic here
    } else {
      onSubmitLoginWithPassword(values);
    }
  };

  const onSubmitLoginWithPassword = async (values) => {
    setIsFormSubmitLoading(true);

    const res = await signIn("credentials", {
      email: values?.email,
      password: values?.password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace("/");
    } else {
      setIsFormSubmitLoading(false);
      toastError(res?.error || "An error occurred");
    }
  };

  const loginType = watch("login_type");

  // Toggle between login types (OTP or password)
  const toggleLoginType = () => {
    setValue("login_type", loginType === "password" ? "otp" : "password");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-sm rounded-3xl shadow-2xl bg-opacity-90 backdrop-blur-md bg-gradient-to-b from-[#2C3E50] to-[#34495E] border border-gray-700 p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo-3.svg" alt="Vogue Nest Logo" className="h-24 w-36 drop-shadow-lg" />
        </div>
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-3xl font-extrabold tracking-wide mb-1 drop-shadow-lg">
          VOGUE NEST
        </h2>
        <p className="text-center text-sm text-gray-300 italic tracking-wide mb-6">
          Elegance Within Reach
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-200 mb-1 text-sm">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1 text-sm">Password</label>
            <div className="relative flex items-center">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  />
                )}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-white focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.166.202-2.286.575-3.325M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2.5 px-5 text-sm rounded-lg text-center transition duration-300 border-none"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">© 2025 Vogue Nest. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
