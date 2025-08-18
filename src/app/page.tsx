import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center space-y-3">
        <Link href="/sign-up">Sign up</Link>
        <Link href="/sign-in">Sign in</Link>
    </main>
  );
}
