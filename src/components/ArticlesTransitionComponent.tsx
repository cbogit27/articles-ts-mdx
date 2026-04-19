"use client"
import type { Article } from '@/lib/articles'
import Link from 'next/link'

type Props = {
  articles: Article[]
}

export default function ArticlesTransitionComp({ articles }: Props) {
    return (
        <section className="articles-grid">
            {articles.map(({ slug, frontmatter }: Article, idx: number) => (
                <article
                    key={slug}
                    className="article-card article-card-motion group mb-8 rounded-br-2xl rounded-bl-2xl rounded-tr-2xl border border-gray-500/10 bg-gray-400/40 p-5 transition-all duration-300 ease-in-out hover:border-gray-600/20 hover:bg-gray-100/20 hover:shadow-sm"
                    style={{ animationDelay: `${idx * 90}ms` }}
                >
                    <Link 
                        href={`/articles/${slug}`} 
                        className="block"
                    >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-700/80 transition-colors duration-300 group-hover:text-gray-800">
                                    {frontmatter.title}
                                </h2>
                                <p className="max-w-2xl leading-relaxed text-gray-600">{frontmatter.description}</p>
                            </div>
                            <p className="shrink-0 text-sm font-medium text-gray-500/80 md:pt-1">{frontmatter.date}</p>
                        </div>

                        <div className="mt-5 h-px w-full bg-gradient-to-r from-gray-700/20 via-gray-700/5 to-transparent" />
                    </Link>
                </article>
            ))}
        </section>
    )
}
