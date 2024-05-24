import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { navigate } from "astro/virtual-modules/transitions-router.js"

export default function AuthForm({variants}) {
  const { toast } = useToast();
  let auth = false;

  if(variants == "login") {
    auth = true;
  }


  async function handleSubmit(event) {
    event.preventDefault(); // Empêche la soumission traditionnelle du formulaire

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const formData = { username, password };

    try {
        const response = await fetch(auth ? "/api/login" : "/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        toast({
          title: "Error message",
          description: result.message
        });

        if(response.status === 200) {
          console.log("STFU")
          navigate("/")
        }

    } catch (error) {
      console.log(error)
    }
};


  return (
      <Card className="mx-auto max-w-sm">
        <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-2xl">{auth ? "Login" : "Register"}</CardTitle>
        <CardDescription>{auth ?
          "Enter your email below to login to your account"
          :
          "Enter your email below to register a new account"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="username"
              name="username"
              type="username"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline" tabIndex="-1">
                Forgot your password?
              </a>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            {auth ? "Login" : "Register"} with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {auth ? "Don't" : "Already"} have an account?{" "}
          <a href="/register" className="underline">
            {auth ? "Register" : "Login"}
          </a>
        </div>
      </CardContent>
      </form>
    </Card>
  )
}
