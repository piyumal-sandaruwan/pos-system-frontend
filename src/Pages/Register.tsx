import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import { toast } from "react-hot-toast";

import posImage from "../assets/pos.jpg";
import { useSignup } from "../Hooks/useSignup";
import { signupSchema } from "../validators/auth.schema";
import { getApiErrorMessage } from "../utils/apiError";

function Register() {
  const navigate = useNavigate();
  const { signup, loading } = useSignup();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const validation = signupSchema.safeParse({
      fullName,
      email,
      password,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    try {
      await signup(validation.data);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f4] md:flex">
      {/* Left banner */}
      <section className="relative hidden min-h-screen w-1/2 overflow-hidden bg-[#102c24] md:flex">
        <img
          src={posImage}
          alt="Retail point of sale"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#102c24]/95 via-[#102c24]/75 to-[#102c24]/90" />

        <div className="relative z-10 flex w-full flex-col justify-between p-12 lg:p-16">
          <Link to="/" className="flex w-fit items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b7f36b] text-[#102c24]">
              <ShoppingBasket size={25} />
            </div>

            <span className="text-2xl font-black tracking-tight text-white">
              SHOPZA<span className="text-[#b7f36b]">y</span>
            </span>
          </Link>

          <div className="max-w-lg">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#b7f36b]">
              Simple retail management
            </p>

            <h1 className="text-5xl font-black leading-tight text-white lg:text-6xl">
              Start your
              <br />
              journey.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/75">
              Create your account and simplify everyday retail management
              with SHOPZA.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <span className="h-1.5 w-10 rounded-full bg-[#b7f36b]" />
              <span className="h-1.5 w-5 rounded-full bg-white/30" />
              <span className="h-1.5 w-5 rounded-full bg-white/30" />
            </div>
          </div>

          <p className="text-sm text-white/50">
            Built for your business. Designed for your growth.
          </p>
        </div>
      </section>

      {/* Right registration form */}
      <section className="flex min-h-screen w-full items-center justify-center px-6 py-10 md:w-1/2 md:px-10 lg:px-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="mb-10 flex items-center gap-3 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102c24] text-[#b7f36b]">
              <ShoppingBasket size={23} />
            </div>

            <span className="text-2xl font-black tracking-tight text-[#102c24]">
              SHOPZA<span className="text-[#6c9e35]">y</span>
            </span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#6c9e35]">
              Get started
            </p>

            <h2 className="text-3xl font-black tracking-tight text-[#102c24] sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Set up your SHOPZA account to manage your retail business.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6c9e35] focus:ring-4 focus:ring-[#6c9e35]/10 ${
                    errors.fullName ? "border-red-400" : "border-gray-200"
                  }`}
                />
              </div>

              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6c9e35] focus:ring-4 focus:ring-[#6c9e35]/10 ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full rounded-xl border bg-white px-4 py-3.5 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6c9e35] focus:ring-4 focus:ring-[#6c9e35]/10 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#102c24]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#102c24] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#1b4436] focus:outline-none focus:ring-4 focus:ring-[#102c24]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}

              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-bold text-[#426d26] transition hover:text-[#102c24]"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-10 text-center text-xs leading-5 text-gray-400">
            By creating an account, you agree to use SHOPZA responsibly and
            keep your account credentials secure.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
