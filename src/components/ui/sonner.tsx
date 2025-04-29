"use client";

import type React from "react";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        style: {
          background: '#002066',
          color: 'white',
          border: 'none',
        },
        classNames: {
          toast: "group toast group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-white/90",
          actionButton: "group-[.toast]:bg-white group-[.toast]:text-[#022A9A]",
          cancelButton: "group-[.toast]:bg-white/20 group-[.toast]:text-white font-normal",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
