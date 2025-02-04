import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrelaunchPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Thank you for your interest! We will email you within 24 business hours with details about prelaunch access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
