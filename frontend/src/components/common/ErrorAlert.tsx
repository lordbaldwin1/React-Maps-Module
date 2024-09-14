/**
 * A React component that displays an error message with a retry button.
 * This component provides a user-friendly way to show error information and allow
 * the user to attempt to resolve the error by retrying the failed operation.
 * @module ErrorAlert
 */

import React, { useState, useCallback } from "react";
import { RefreshCcw, Loader } from "lucide-react";
import "../../styles/ErrorAlert.css";

/**
 * Props for the ErrorAlert component.
 * @interface
 */
export interface ErrorAlertProps {
  /** The title of the error alert */
  title: string;
  /** A detailed description of the error */
  description: string;
  /** A function to be called when the retry button is clicked */
  onRetry: () => Promise<void>;
  /** The minimum duration (in milliseconds) for which the loading state should be shown */
  minLoadingDuration?: number;
}

/**
 * A component that displays an error message with a retry button.
 *
 * @param {ErrorAlertProps} props - The props for the ErrorAlert component
 * @returns {React.ReactElement} The rendered ErrorAlert component
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  description,
  onRetry,
  minLoadingDuration = 1000,
}) => {
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  /**
   * Handles the retry action when the retry button is clicked.
   * It ensures that the loading state is shown for at least the specified minimum duration.
   */
  const handleRetry = useCallback(async () => {
    setIsRetrying(true);
    const startTime = Date.now();
    try {
      await onRetry();
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingDuration - elapsedTime);
      setTimeout(() => {
        setIsRetrying(false);
      }, remainingTime);
    }
  }, [onRetry, minLoadingDuration]);

  return (
    <div className="error-alert-container">
      <h2 className="error-alert-title">
        <RefreshCcw />
        {title}
      </h2>
      <h3 className="error-alert-label">Error Details</h3>
      <p className="error-alert-description">{description}</p>
      <button
        className={`error-alert-button ${isRetrying ? "retrying" : ""}`}
        onClick={handleRetry}
        disabled={isRetrying}
      >
        {isRetrying ? (
          <>
            <Loader className="spinner" />
            <span>Retrying...</span>
          </>
        ) : (
          "Retry"
        )}
      </button>
    </div>
  );
};

export default ErrorAlert;
