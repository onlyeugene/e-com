import React from "react";

interface AnalyticsCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AnalyticsCard({
  children,
  title,
  subtitle,
}: AnalyticsCardProps) {
  return (
    <div className="dark:bg-tertiary border bg-slate-100 rounded-md p-6 h-full">
      <div className="mb-3 ">
        <p>{title}</p>
        <span className="text-sm text-primary">{subtitle}</span>
      </div>
        {children}
    </div>
  );
}
