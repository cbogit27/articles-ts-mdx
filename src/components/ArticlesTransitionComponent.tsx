"use client"
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'

type Props = {
  articles: Article[]
}

const ArticlesFadeInVariants = {
    initial: { opacity: 0, y: 100 },
    animate: (idx: number) => ({ opacity: 1, y: 0,  transition: {delay: idx*0.06, duration: 0.7 } })
}

export default function ArticlesTransitionComp({ articles }: Props) {
    return (
        <div>
            {articles.map(({ slug, frontmatter }: Article, idx: number) => (
                <motion.a
                    key={slug}
                    href={`/articles/${slug}`}
                    className="block"
                    variants={ArticlesFadeInVariants}
                    initial="initial"
                    whileInView="animate"

                    viewport={{ once: true, amount: 0.2 }}
                    custom={idx}
                >
                    <article className="mb-8 p-2 bg-gray-400/50 rounded-br-2xl rounded-bl-2xl rounded-tr-2xl transition-all duration-300 ease-in-out hover:bg-gray-100/20 p-4">
                        <h2 className="text-2xl font-bold mb-1">{frontmatter.title}</h2>
                        <p className="text-gray-600 mb-2">{frontmatter.description}</p>
                        <p className="text-sm text-gray-500 mt-2">{frontmatter.date}</p>
                    </article>
                </motion.a>
            ))}
        </div>
    )
}