import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href="/sign-up">Sign up</Link>
        <Link href="/sign-in">Sign in</Link>
      </div>
    </main>
  );
}
