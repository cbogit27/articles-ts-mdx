"use client"
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import { useTransitionRouter } from 'next-view-transitions'

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
    const router = useTransitionRouter()

    const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault()
        
        // Custom animation function to apply after transition starts
        const pageAnimation = () => {
            document.documentElement.animate(
                [
                    { opacity: 1, transform: 'translateY(0)' },
                    { opacity: 0, transform: 'translateY(-30px)' }
                ],
                {
                    duration: 400,
                    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                    fill: 'forwards',
                    pseudoElement: '::view-transition-old(root)'
                }
            )
            
            document.documentElement.animate(
                [
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ],
                {
                    duration: 400,
                    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                    fill: 'forwards',
                    pseudoElement: '::view-transition-new(root)'
                }
            )
        }

        // Add class to body for CSS transitions
        document.documentElement.classList.add('navigating-to-article')
        
        // Use router with correct transition options
        router.push(`/articles/${slug}`, {
            onTransitionReady: pageAnimation
        })
    }

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
                    <a 
                        href={`/articles/${slug}`} 
                        onClick={(e) => handleArticleClick(e, slug)}
                        className="block"
                    >
                        <h2 className="text-2xl font-bold mb-1">{frontmatter.title}</h2>
                        <p className="text-gray-600 mb-2">{frontmatter.description}</p>
                        <p className="text-sm text-gray-500 mt-2">{frontmatter.date}</p>
                    </a>
                </motion.article>
            ))}
        </section>
    )
}