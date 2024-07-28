"use client";

import React from "react";
import { SignIn } from "../components/signin/signin";
import useAuth from "@/lib/hooks/useAuth";
import { Navbar } from "../components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <div>
      <Navbar />
      {children}
    </div>
  ) : (
    <main className="flex justify-center items-center h-screen bg-customone">
      <SignIn />
    </main>
  );
};

export default DashboardLayout;
