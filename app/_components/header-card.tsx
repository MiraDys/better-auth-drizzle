import { headers } from "next/headers";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function HeaderCard() {
  const headersList = await headers();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reading your header</CardTitle>
        <CardDescription>
          <p>
            This is what website knows about you from reading your request
            header.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Array.from(headersList.entries()).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
