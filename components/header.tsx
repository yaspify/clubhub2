import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-14 items-center">
        <Link href="/" className="font-bold text-lg">金沢サークルハブ</Link>
      </div>
    </header>
  );
}