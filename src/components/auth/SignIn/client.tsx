"use client"

import { LogIn, LogOut } from "lucide-react"
import Link from "next/link"

import { authClient } from "~/auth/client"
import { Button } from '~/ui/button'

export default function SignInClient() {
	const { data: auth } = authClient.useSession()
	const isSignedIn = auth?.session && auth?.user

	return (
		<Link href={isSignedIn ? "/auth/sign-out" : "/auth/sign-in"}>
			<Button className="justify-between cursor-pointer gap-2" variant="default">
				{!isSignedIn ? (
					<LogOut size={20} />
				) : (
					<LogIn size={20} />
				)}
				<span>{isSignedIn ? 'Sign Out' : 'Sign In'}</span>
			</Button>
		</Link>
	)
}


