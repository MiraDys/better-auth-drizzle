import SignInForm from "./_components/sign-in-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center  mt-10">
      <h1 className="text-center font-bold tracking-tight">
        <span className="bg-gradient-to-r from-[#49b2fd] via-[#2993fd] to-[#13b718] bg-clip-text text-6xl text-transparent">
          Better Auth demo
        </span>
      </h1>
      <div className="flex flex-col gap-10 items-center justify-center">
        <h2>
          <span>Ehmm...</span> It seems you are{" "}
          <span className="font-bold text-xl">not signed in!</span>{" "}
        </h2>
        <SignInForm />
      </div>
    </div>
  );
}
