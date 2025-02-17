export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex flex-col h-screen items-center pt-10">
        {children}
      </div>
    </main>
  );
}
