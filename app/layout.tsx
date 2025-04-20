"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import { StepperProvider, useStepper } from "./context/StepperContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentStep, goToNextStep, goToPreviousStep, goToStep, steps, totalSteps, isStepValid } = useStepper();
  const currentStepInfo = steps.find(step => step.number === currentStep);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-screen">
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentStepInfo?.title || 'Create Your Account'}
              </h1>
              <p className="text-gray-600">
                {currentStepInfo?.subtitle || 'Follow the steps below to complete your registration'}
              </p>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex items-center justify-center">
              {children}
            </div>

            {/* Footer with Steps and Actions */}
            <div className="mt-4 flex items-center justify-between pt-4">
              {/* Steps */}
              <div className="flex items-center gap-2">
                {steps.map((step) => (
                  <a
                    key={step.number}
                    href={step.link}
                    onClick={(e) => {
                      e.preventDefault();
                      goToStep(step.number);
                    }}
                    className={`w-12 h-4 rounded-sm hover:bg-gray-400 cursor-pointer transition-colors ${currentStep === step.number ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentStep === totalSteps) {
                      alert('Congratulations! You have completed all steps.');
                    } else {
                      goToNextStep();
                    }
                  }}
                  disabled={!isStepValid(currentStep)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === totalSteps ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StepperProvider>
      <LayoutContent>{children}</LayoutContent>
    </StepperProvider>
  );
}
