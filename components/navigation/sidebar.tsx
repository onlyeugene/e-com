"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import MenuLinks from "./menu-links";
import LogoutButton from "../authenticate/logout-button";
import useRouteCheck from "@/hooks/useRouteCheck";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { isOpen } = useMenuStore();

  const [loading, setLoading] = useState(true);

  // const loginRoute = useRouteCheck(['login', 'register', 'onboarding']);
  const loginRoute = useRouteCheck(['login'])
  const registerRoute = useRouteCheck(['register'])
  const onboardingRoute = useRouteCheck(['onboarding'])


  useEffect(() => {
    if (!loginRoute && !registerRoute && !onboardingRoute) {
     setLoading(false)
    }
  }, [loginRoute, registerRoute, onboardingRoute]);

  if (loading || loginRoute || registerRoute || onboardingRoute) return null;

  return (
    <motion.div
      initial={{ width: isOpen ? 80 : 250 }}
      animate={{ width: isOpen ? 80 : 250 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky z-10 top-0 flex flex-col h-screen overflow-hidden py-10 items-center border-r max-md:max-w-[80px] ${
        isOpen ? "max-md:hidden gap-10" :"block justify-between"
      }`}
    >
      <h2 className={`text-sm max-md:hidden ${isOpen && "hidden"}`}>
        Main Menu
      </h2>
      <MenuLinks isOpen={isOpen} />
      <LogoutButton />
    </motion.div>
  );
}
