import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import AuthImagePattern from "../../components/AuthImagePattern";
import {Link} from "react-router-dom";
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ArrowRight,
  Github,
  LogIn,
} from "lucide-react";
import {useAuthStore} from "../../stores/useAuthStore";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {login, isLoggingIn} = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async data => {
    try {
      await login(data);
      console.log("Login Data:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--background)]">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Background gradient */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[var(--accent)] opacity-10 rounded-full blur-3xl animate-pulse delay-200"></div>

        <Card className="w-full max-w-md shadow-xl border border-[var(--border)] bg-[var(--card)] relative z-10">
          <Card.Body className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                {/*<div className="w-16 h-16 rounded-2xl bg-[var(--primary)] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-colors">*/}
                {/*  <Code className="w-8 h-8 text-[var(--primary)]" />*/}
                {/*</div>*/}
                <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-[var(--muted-foreground)]">
                  Sign in to your CodeVue account
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full pl-10 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] ${
                      errors.email
                        ? "border-[var(--destructive)] text-[var(--muted-foreground)]"
                        : ""
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-[var(--destructive)] text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[var(--foreground)]">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full pl-10 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] ${
                      errors.password ? "border-[var(--destructive)]" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[var(--destructive)] text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me */}
              {/*<div className="flex items-center">*/}
              {/*  <input*/}
              {/*    type="checkbox"*/}
              {/*    id="remember"*/}
              {/*    className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"*/}
              {/*  />*/}
              {/*  <label*/}
              {/*    htmlFor="remember"*/}
              {/*    className="ml-2 block text-sm text-[var(--muted-foreground)]"*/}
              {/*  >*/}
              {/*    Remember me for 30 days*/}
              {/*  </label>*/}
              {/*</div>*/}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full text-[var(--foreground)] shadow-lg shadow-[var(--primary)] shadow-opacity-20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--accent)] focus:ring-4 focus:ring-[var(--primary)]/40 focus:outline-none"
                disabled={isLoggingIn}
                icon={
                  isLoggingIn ? (
                    <Loader2 className="h-5 w-5 animate-spin-slow text-[var(--primary)]" />
                  ) : (
                    <LogIn className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  )
                }
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-[var(--muted-foreground)]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[var(--primary)] hover:underline font-medium"
                >
                  Create account <ArrowRight className="inline h-4 w-4" />
                </Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back to CodeVue!"}
        subtitle={
          "Sign in to continue your coding journey with us. Solve challenges, improve your skills, and track your progress."
        }
      />
    </div>
  );
};

export default LoginPage;
