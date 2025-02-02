import { LoginForm } from "@/components/login-form";

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-muted p-6 md:p-10 min-h-svh">
      <LoginForm />
    </div>
  );
}
