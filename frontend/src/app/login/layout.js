import { AuthProvider } from "@/stores/AuthContext";

export const metadata = {
  title: "Login — Vibes",
  description: "Sign in to Vibes — AI-Powered Design Intelligence",
};

export default function LoginLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
