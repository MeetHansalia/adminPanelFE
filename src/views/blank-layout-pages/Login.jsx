"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

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
  const handleClickShowPassword = () => setShowPassword(!showPassword);
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

    <div className='flex min-h-screen bg-gray-100'>
      {/* Left Section (50% Width) */}
      <div
        className='relative h-screen min-w-[50vw] bg-red-200' // Added min-w and bg-red-200 for debugging
        style={{ width: "50vw" }}>
        <div className='absolute bottom-0 w-full h-[50vh]'>
          <Image
            src='/Rectangle.png'
            alt='Background'
            layout='fill'
            objectFit='cover'
            className='bottom-0 absolute'
          />
        </div>

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg'>
          <Image
            src='/bus.png'
            alt='Bus'
            layout='responsive'
            width={1000}
            height={600}
            objectFit='contain'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='absolute top-8 left-8'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={150}
            height={50}
            objectFit='contain'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>
      {/* </div> */}

      {/* Right Section */}
      <div className='flex items-center justify-center w-1/2 '>
        <div className='p-10 w-full max-w-sm'>
          <h2 className='text-3xl font-semibold text-center text-gray-800'>
            Welcome Back
          </h2>
          <p className='text-sm text-center text-gray-600 mb-8'>
            Login to your Account
          </p>

          {/* Form */}
          <form>
            <TextField
              label='Email Address'
              variant='outlined'
              fullWidth
              margin='normal'
            />
            <TextField
              label='Password'
              type='password'
              variant='outlined'
              fullWidth
              margin='normal'
            />
            <div className='flex justify-between items-center'>
              <Button variant='text' color='primary' className='text-sm'>
                Forgot Password?
              </Button>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                type='submit'
                className='mt-4'>
                Log In
              </Button>
            </div>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm'>
              Don't have an account?{" "}
              <a href='/register' className='text-blue-500'>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
