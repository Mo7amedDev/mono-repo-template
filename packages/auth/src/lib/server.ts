import { getServerSession } from "next-auth"
import { authOptions } from "./auth.config"

export const getServerAuthSession = () => {
  return getServerSession(authOptions)
}
