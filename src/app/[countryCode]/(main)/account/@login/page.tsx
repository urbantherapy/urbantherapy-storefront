import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Urban Therapy | Sign in",
  description: "Sign in to your Urban Therapy B2B account.",
}

export default function Login() {
  return <LoginTemplate />
}
