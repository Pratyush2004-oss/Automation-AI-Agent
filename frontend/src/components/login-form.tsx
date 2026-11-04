import { cn } from "cn"
import { FcGoogle } from "react-icons/fc"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup
} from "./ui/field"

interface LoginFormProp {
  props?: React.ComponentProps<"div">
  className?: string
  handleGoogleLogin: () => Promise<void>
}
export function LoginForm({
  className,
  handleGoogleLogin,
  ...props
}: LoginFormProp) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">Welcome to Automate AI</CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Sign in to build and manage your AI agents.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
            <FieldGroup>
              <Field>
                <Button onClick={handleGoogleLogin} variant="outline" type="button" className={"h-12 w-full gap-3 rounded-xl border-white/15 bg-white/4 text-sm font-medium text-white transition hover:border-violet-400/50 hover:bg-white/8 hover:text-white"}>
                  <FcGoogle />
                  Login with Google
                </Button>
              </Field>
            </FieldGroup>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
