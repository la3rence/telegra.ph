import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="mt-4">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}

