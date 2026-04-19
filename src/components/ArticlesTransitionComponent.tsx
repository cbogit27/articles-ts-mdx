"use client"
import type { Article } from '@/lib/articles'
import Link from 'next/link'

type Props = {
  articles: Article[]
}

export default function ArticlesTransitionComp({ articles }: Props) {
    return (
        <section className="articles-grid">
            {articles.map(({ slug, frontmatter }: Article) => (
                <article
                    key={slug}
                    className="article-card mb-8 p-4 bg-gray-400/50 rounded-br-2xl rounded-bl-2xl rounded-tr-2xl transition-all duration-300 ease-in-out hover:bg-gray-100/20 hover:scale-[1.01] hover:shadow-md"
                >
                    <Link 
                        href={`/articles/${slug}`} 
                        className="block"
                    >
                        <h2 className="text-2xl font-bold mb-1">{frontmatter.title}</h2>
                        <p className="text-gray-600 mb-2">{frontmatter.description}</p>
                        <p className="text-sm text-gray-500 mt-2">{frontmatter.date}</p>
                    </Link>
                </article>
            ))}
        </section>
    )
}
