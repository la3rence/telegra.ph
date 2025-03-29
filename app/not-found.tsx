import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold"></h2>
        <p className="text-muted-foreground text-balance">A story yet to be found.</p>
        <div className="mt-4">
        <Link href="/">
          <Button variant="outline"><PenLine />Lift your pen</Button>
        </Link>
        </div>
      
      </div>
    </div>
  )
}

