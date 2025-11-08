import type { GenericActionCtx } from "convex/server"

import { betterAuth } from "better-auth"

import {
	COLLECTION_SLUG_ACCOUNTS,
	COLLECTION_SLUG_SESSIONS,
	COLLECTION_SLUG_USERS,
	COLLECTION_SLUG_VERIFICATIONS,
	USER_ROLES,
} from "~/db/constants"

import type { DataModel } from "../_generated/dataModel"

import schema from "../schema"
import { convexAdapter } from "./adapter"
import betterAuthPlugins from "./plugins"

export const createAuth = (
	ctx: GenericActionCtx<DataModel>,
	{ optionsOnly } = { optionsOnly: false }
) => {
	return betterAuth({
		socialProviders: {},
		account: {
			modelName: COLLECTION_SLUG_ACCOUNTS
		},
		advanced: {
			generateId: false,
		},
		baseURL: process.env.NEXT_PUBLIC_SITE_URL,
		database: convexAdapter(ctx, schema),
		emailAndPassword: {
			enabled: true
		},
		logger: {
			disabled: optionsOnly
		},
		plugins: betterAuthPlugins,
		secret: process.env.BETTER_AUTH_SECRET,
		session: {
			modelName: COLLECTION_SLUG_SESSIONS
		},
		trustedOrigins: process.env.NODE_ENV === "production" ? [process.env.NEXT_PUBLIC_SITE_URL!] : [process.env.NEXT_PUBLIC_SITE_URL!, "http://localhost:3001", "http://127.0.0.1:3001"],
		user: {
			additionalFields: {
				role: {
					type: "string[]",
					defaultValue: [USER_ROLES.user],
					required: true
				}
			},
			modelName: COLLECTION_SLUG_USERS
		},
		verification: {
			modelName: COLLECTION_SLUG_VERIFICATIONS
		}
	})
}
