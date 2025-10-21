import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        setAuthorized(res.ok);

        if (!res.ok) {
          navigate("/", { replace: true });
        }
      } catch {
        setAuthorized(false);
        navigate("/", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (authorized === null) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Checking access...
      </div>
    );
  }

  if (!authorized) return <Navigate to="/" replace />;

  return <>{children}</>;
}
