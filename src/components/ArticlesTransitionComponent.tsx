"use client"
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import Link from 'next/link'

type Props = {
  articles: Article[]
}

const ArticlesFadeInVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (idx: number) => ({ 
        opacity: 1, 
        y: 0,  
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: idx * 0.08
        } 
    })
}

export default function ArticlesTransitionComp({ articles }: Props) {
    return (
        <section className="articles-grid">
            {articles.map(({ slug, frontmatter }: Article, idx: number) => (
                <motion.article
                    key={slug}
                    variants={ArticlesFadeInVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={idx}
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
                </motion.article>
            ))}
        </section>
    )
}
