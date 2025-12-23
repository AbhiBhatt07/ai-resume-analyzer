
// ============= auth.tsx =============
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { LogIn, Loader2 } from "lucide-react";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Login into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-dark-bg min-h-screen flex justify-center items-center p-4">
      <div className="border border-zinc-800 rounded-2xl shadow-2xl bg-dark-card/50 backdrop-blur-xl">
        <section className="flex flex-col gap-8 bg-dark-card rounded-2xl p-8 md:p-12 max-w-lg">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-accent/10 rounded-full">
              <LogIn className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl">Welcome Back</h1>
            <h2 className="text-zinc-400">Sign in to continue your journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button flex items-center justify-center gap-3 animate-pulse" disabled>
                <Loader2 className="w-5 h-5 animate-spin" />
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button flex items-center justify-center gap-3" onClick={auth.signIn}>
                    <LogIn className="w-5 h-5" />
                    <p>Sign In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;

