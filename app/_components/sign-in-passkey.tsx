import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInPasskey() {
  const handlePasskeySignIn = async () => {
    await authClient.signIn.passkey();
  };

  return (
    <div className="mt-5">
      <Button className="w-full" onClick={handlePasskeySignIn}>
        Passkey Sign In
      </Button>
    </div>
  );
}
