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
const Register = ({ dictionary }) => {
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
    <div>
      <h1>Register</h1>
    </div>

  );
};

export default Register;
