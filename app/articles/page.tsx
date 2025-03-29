import Link from "next/link"
import { getAllArticles } from "@/lib/article-service"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All writings</h1>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <PenLine className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No chapters have yet emerged.</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Craft the first of your life tales</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.slug} className="border-b pb-6">
              <Link href={`/${article.slug}`}>
                <h2 className="text-xl font-semibold transition-colors">{article.title}</h2>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <span>{article.author}</span>
                <span>•</span>
                <time dateTime={article.published_at}>{formatDate(article.published_at || "")}</time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

