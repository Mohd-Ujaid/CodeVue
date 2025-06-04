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
  UserPlus,
  User,
} from "lucide-react";
import {useAuthStore} from "../../stores/useAuthStore";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const SignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {signup, isSigninUp} = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = async data => {
    try {
      await signup(data);
      console.log("SignUp Data:", data);
    } catch (error) {
      console.error("SignUp failed:", error);
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
          <Card.Body className="px-8">
            {/* Logo */}
            <div className="text-center mb-5">
              <div className="flex flex-col items-center gap-1 group">
                <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  Join CodeVue
                </h1>
                <p className="text-[var(--muted-foreground)]">
                  Create your account to get started
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-m font-medium text-[var(--foreground)]">
                  Full Name
                </label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full pl-10 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]${
                      errors.name ? "border-[var(--destructive)] " : ""
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-[var(--destructive)] text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-m font-medium text-[var(--foreground)]">
                  Email
                </label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full pl-10 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] ${
                      errors.email ? "border-[var(--destructive)]" : ""
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
                <label className="text-m font-medium text-[var(--foreground)]">
                  Password
                </label>
                <div className="relative mt-2">
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
                <div className="text-xs text-[var(--muted-foreground)]">
                  Password must be at least 6 characters, include an uppercase
                  letter and a number
                </div>
              </div>

              {/* Terms and Conditions */}
              {/*<div className="space-y-2">*/}
              {/*  <div className="flex items-start">*/}
              {/*    <div className="flex items-center h-5">*/}
              {/*      <input*/}
              {/*        id="terms"*/}
              {/*        type="checkbox"*/}
              {/*        {...register("terms")}*/}
              {/*        className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*    <div className="ml-3 text-sm">*/}
              {/*      <label*/}
              {/*        htmlFor="terms"*/}
              {/*        className="text-[var(--muted-foreground)]"*/}
              {/*      >*/}
              {/*        I agree to the{" "}*/}
              {/*        <a*/}
              {/*          href="#"*/}
              {/*          className="text-[var(--primary)] hover:underline"*/}
              {/*        >*/}
              {/*          Terms of Service*/}
              {/*        </a>{" "}*/}
              {/*        and{" "}*/}
              {/*        <a*/}
              {/*          href="#"*/}
              {/*          className="text-[var(--primary)] hover:underline"*/}
              {/*        >*/}
              {/*          Privacy Policy*/}
              {/*        </a>*/}
              {/*      </label>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  {errors.terms && (*/}
              {/*    <p className="text-[var(--destructive)] text-sm">*/}
              {/*      {errors.terms.message}*/}
              {/*    </p>*/}
              {/*  )}*/}
              {/*</div>*/}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full text-[var(--foreground)] shadow-lg shadow-[var(--primary)] shadow-opacity-20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--accent)] focus:ring-4 focus:ring-[var(--primary)]/40 focus:outline-none group"
                disabled={isSigninUp}
                icon={
                  isSigninUp ? (
                    <Loader2 className="h-5 w-5 animate-spin-slow text-[var(--primary)]" />
                  ) : (
                    <UserPlus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  )
                }
              >
                {isSigninUp ? "Creating account..." : "Create account"}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-[var(--muted-foreground)]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[var(--primary)] hover:underline font-medium"
                >
                  Sign in <ArrowRight className="inline h-4 w-4" />
                </Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Join the CodeVue community!"}
        subtitle={
          "Create an account to start solving coding challenges, track your progress, and compete with other developers."
        }
      />
    </div>
  );
};

export default SignUpPage;
