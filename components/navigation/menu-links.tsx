import { House, Users, Package, Shirt, Component} from "lucide-react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { TooltipTrigger, Tooltip, TooltipProvider, TooltipContent } from "../ui/tooltip";
import Link from "next/link";

const menuItems = [
  { href: "/", label: "Dashboard", icon: House },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/products", label: "Products", icon: Shirt },
  {
    href: "/team",
    label: "Team",
    icon: Component,
  },
];

export default function MenuLinks({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  const linkVariants = {
    active: {
      backgroundColor: "#2463EB",
      color: "#ffff",
      scale: 1.05,
    },
    inactive: {
      backgroundColor: "transparent",
      color: "inherit",
      scale: 1,
    },
  };


  return (
    <TooltipProvider>
      <ul className="flex flex-col gap-10">
        {menuItems.map(({href, label, icon: Icon}) => {
          const isActive = (pathname.includes(href) && href.length > 1 || pathname === href)
          return (
            <li key={href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={href}>
                    <motion.div
                     variants={linkVariants}
                     animate={
                       isActive ? "active" : "inactive"
                     }
                     transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 py-1 rounded-md px-4">
                      <Icon className="mb-1" size={23} />
                      <span className={`max-md:hidden ${isOpen && 'hidden'}`}>{label}</span>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {isOpen && (
                  <TooltipContent>
                   <p>{label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </li>
          )
        })}
      </ul>
    </TooltipProvider>
  );
}
