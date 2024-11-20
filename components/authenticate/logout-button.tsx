'use client'

import { useMenuStore } from "@/store/toggleMenuStore"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
    const { isOpen} = useMenuStore()
    
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }
    
    return (
        <div>
            <Button asChild 
                onClick={handleSignOut}
            >
                <Link href={'/'}>
                <LogOut />
                <span className={`${!isOpen && 'max-md:hidden'} ${isOpen && 'hidden'}`}>Logout</span>
                </Link>
            </Button>
        </div>
    )
}