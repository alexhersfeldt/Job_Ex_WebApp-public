

declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			user: {
				username: string
				role: string
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}