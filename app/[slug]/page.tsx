import { notFound } from "next/navigation"
import { getArticle } from "@/lib/article-service"
import { formatDate } from "@/lib/utils"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params?.slug)
  if (!article) {
    notFound()
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <article className="prose prose-stone dark:prose-invert mx-auto">
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <span>{article.author}</span>
          <span>•</span>
          <time dateTime={article.published_at}>{formatDate(article.published_at || "")}</time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  )
}