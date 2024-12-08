import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export function PageError({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Alert variant="destructive" className="max-w-md w-full mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
      </div>
    </div>
  );
}
