import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface AuthCardProps {
  cardTitle: string;
  children: ReactNode;
  icon?: LucideIcon;
  footer?: ReactNode;
}

export default function AuthCard({
  cardTitle,
  children,
  icon: Icon,
  footer,
}: AuthCardProps) {
  return (
    <Card className="p-8 w-96">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-3xl font-bold">{cardTitle}</CardTitle>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
