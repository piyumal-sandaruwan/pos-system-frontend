
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  ShoppingBasket,
  ArrowRight,
  Store,
  Package,
  ChartNoAxesCombined,
} from "lucide-react";

import { useLogin } from "../Hooks/useLogin";
import { loginSchema } from "../validators/auth.schema";
import { getApiErrorMessage } from "../utils/apiError";

function Login() {
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, loading } = useLogin();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: 35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.12,
          ease: "power3.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;

      setEmailError(errors.email?.[0] || "");
      setPasswordError(errors.password?.[0] || "");

      return;
    }

    try {
      await login(validation.data);

      toast.success("Welcome back to SHOPZA!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Login failed"));
    }
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen w-full overflow-hidden bg-[#f5f7f6] text-slate-900"
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Brand panel */}
        <section
          ref={imageRef}
          className="relative flex min-h-[340px] w-full flex-col overflow-hidden bg-[#102b25] px-7 py-8 text-white sm:px-12 lg:min-h-screen lg:w-[52%] lg:px-16 lg:py-12"
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#8ee6a8]/10 blur-3xl"
          />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a5edb6] text-[#102b25] shadow-lg shadow-black/10">
              <ShoppingBasket size={24} strokeWidth={2.3} />
            </div>

            <div>
              <h1 className="text-[25px] font-extrabold leading-none tracking-[-1px]">
                SHOPZA<span className="text-[#a5edb6]">y</span>
              </h1>
              <p className="mt-1 text-[9px] font-semibold tracking-[2.5px] text-white/55">
                SMART RETAIL POS
              </p>
            </div>
          </div>

          {/* Main message */}
          <div className="relative z-10 my-auto py-12 lg:max-w-[520px] lg:py-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#a5edb6]" />
              <span className="text-[11px] font-medium tracking-wide text-white/80">
                YOUR BUSINESS, SIMPLIFIED
              </span>
            </div>

            <h2 className="max-w-[520px] text-4xl font-bold leading-[1.12] tracking-[-1.5px] sm:text-5xl lg:text-[58px]">
              Run your shop.
              <br />
              <span className="text-[#a5edb6]">
                Grow your business.
              </span>
            </h2>

            <p className="mt-6 max-w-[390px] text-sm leading-7 text-white/65 sm:text-base">
              Manage sales, keep track of stock, and understand
              your business — all in one simple place.
            </p>

            {/* Feature highlights */}
            <div className="mt-9 grid max-w-[460px] grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:flex-col sm:items-start sm:p-4">
                <Store
                  size={21}
                  className="shrink-0 text-[#a5edb6]"
                />
                <span className="text-xs font-medium text-white/85">
                  Easy checkout
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:flex-col sm:items-start sm:p-4">
                <Package
                  size={21}
                  className="shrink-0 text-[#a5edb6]"
                />
                <span className="text-xs font-medium text-white/85">
                  Stock control
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:flex-col sm:items-start sm:p-4">
                <ChartNoAxesCombined
                  size={21}
                  className="shrink-0 text-[#a5edb6]"
                />
                <span className="text-xs font-medium text-white/85">
                  Sales insights
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-[11px] text-white/45">
              Built for everyday retail.
            </p>
            <p className="text-[11px] font-medium text-white/55">
              SHOPZA POS
            </p>
          </div>
        </section>

        {/* Login panel */}
        <section
          ref={formRef}
          className="flex min-h-[580px] w-full flex-1 items-center justify-center bg-[#f5f7f6] px-6 py-12 sm:px-10 lg:min-h-screen lg:px-12 xl:px-20"
        >
          <div className="w-full max-w-[390px]">
            {/* Mobile brand */}
            <div className="mb-10 flex items-center justify-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#102b25] text-[#a5edb6]">
                <ShoppingBasket size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#102b25]">
                SHOPZA<span className="text-[#239653]">y</span>
              </span>
            </div>

            <div className="mb-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0f5e6] text-[#21834a]">
                <Store size={24} />
              </div>

              <h2 className="text-[32px] font-bold tracking-[-1.1px] text-[#14251e]">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#78837d]">
                Sign in to manage your shop and continue where
                you left off.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-semibold text-[#26372e]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="you@example.com"
                  required
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={
                    emailError ? "email-error" : undefined
                  }
                  className={`h-[50px] w-full rounded-xl border bg-white px-4 text-sm text-[#18271f] outline-none transition placeholder:text-[#a5ada8] focus:ring-4 ${
                    emailError
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-[#dfe6e1] focus:border-[#2a9a55] focus:ring-[#2a9a55]/10"
                  }`}
                />

                {emailError && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-2 text-xs text-red-600"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-[13px] font-semibold text-[#26372e]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter your password"
                    required
                    aria-invalid={Boolean(passwordError)}
                    aria-describedby={
                      passwordError ? "password-error" : undefined
                    }
                    className={`h-[50px] w-full rounded-xl border bg-white px-4 pr-12 text-sm text-[#18271f] outline-none transition placeholder:text-[#a5ada8] focus:ring-4 ${
                      passwordError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-[#dfe6e1] focus:border-[#2a9a55] focus:ring-[#2a9a55]/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-0 top-0 flex h-[50px] w-12 items-center justify-center rounded-r-xl text-[#7b8980] transition hover:text-[#21834a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2a9a55]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-2 text-xs text-red-600"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-[51px] w-full items-center justify-center gap-2 rounded-xl bg-[#21834a] px-4 text-sm font-semibold text-white shadow-lg shadow-[#21834a]/15 transition duration-200 hover:bg-[#196c3b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to SHOPZA
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e2e8e3]" />
              <span className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#a0aaa3]">
                New to SHOPZA?
              </span>
              <div className="h-px flex-1 bg-[#e2e8e3]" />
            </div>

            <Link
              to="/register"
              className="flex h-[49px] w-full items-center justify-center rounded-xl border border-[#dce5de] bg-white text-sm font-semibold text-[#26372e] transition hover:border-[#21834a] hover:bg-[#f0f9f2] hover:text-[#21834a]"
            >
              Create an account
            </Link>

            <p className="mt-8 text-center text-[11px] leading-5 text-[#9aa49d]">
              Simple tools for better retail management.
              <br />
              © {new Date().getFullYear()} SHOPZA
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
