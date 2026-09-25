"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const endPoint = "/auth/verify-email";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token }),
          },
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          setStatus("error");
          setIsExpired(data.expired);
          setMessage(data.message);
          return;
        }
        setStatus("success");
        setIsExpired(data.expired);
        setMessage(data.message);
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-page px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-8 text-center animate-scale-in">
        {status === "verifying" && (
          <>
            <Loader2
              size={40}
              className="text-accent-primary animate-spin mx-auto mb-4"
            />
            <h1 className="text-lg font-semibold text-text-primary">
              Verifying your email...
            </h1>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-emerald-600" />
            </div>
            <h1 className="text-lg font-semibold text-text-primary mb-1">
              Email verified!
            </h1>
            <p className="text-sm text-text-secondary mb-5">{message}</p>
            <Link
              href="/login"
              className="inline-block bg-accent-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity no-underline"
            >
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                <XCircle size={28} className="text-rose-600" />
              </div>
              <h1 className="text-lg font-semibold text-text-primary mb-1">
                Verification failed
              </h1>
              <p className="text-sm text-text-secondary">{message}</p>
            </div>

            <Link
              href={"/resend-verification"}
              className="mt-2 bg-accent-primary text-white text-sm font-semibold py-3 px-2 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              Resend Verification Email
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-page">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
