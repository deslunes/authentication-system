import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorAuthComponent() {
  return (
    <Card className="mx-auto max-w-sm">
      <form method="POST" action="/api/logout">
        <CardHeader>
          <CardTitle className="text-2xl">Error</CardTitle>
          <CardDescription>Already logged-in users can't sign up or login.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button type="submit" className="w-full">
              Log out
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
