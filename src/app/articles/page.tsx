import { Metadata } from "next"
import Link from 'next/link'
import { getArticles, type SortOrder } from '@/lib/articles'
import Pagination from '@/components/Pagination'

export const metadata: Metadata = {
    title: "Articles"
}

type Props = {
    searchParams: Promise<{ page?: string; sort?: SortOrder }>
}

export default async function Articles({ searchParams }: Props) {
    const params = await searchParams
    const currentPage = Number(params?.page) || 1
    const sortOrder = (params?.sort as SortOrder) || 'newest'
    const { articles, totalPages } = await getArticles(currentPage, sortOrder)
    
    return (
        <main className="container mx-auto max-w-4xl p-4 md:p-16">
            <div className="mb-8">
                <h3 className="text-2xl font-light">Articles relating to web development and technology insights</h3>
                <div className="mt-4 flex gap-4">
                    <Link 
                        href={`/articles?page=${currentPage}&sort=newest`}
                        className={`text-gray-600/50 hover:text-gray-900 ${
                            sortOrder === 'newest' ? 'underline underline-offset-4' : ''
                        }`}
                    >
                        newest
                    </Link>
                    <Link 
                        href={`/articles?page=${currentPage}&sort=oldest`}
                        className={`text-gray-600/40 hover:text-gray-900 ${
                            sortOrder === 'oldest' ? 'underline underline-offset-4' : ''
                        }`}
                    >
                        oldest
                    </Link>
                </div>
            </div>
            {articles.map(({ slug, frontmatter }) => (
                <Link 
                    key={slug} 
                    href={`/articles/${slug}`}
                    className="block"
                >
                    <article className="mb-8 p-2 bg-gray-400/50 rounded-br-2xl rounded-bl-2xl rounded-tr-2xl transition-all duration-300 ease-in-out hover:bg-gray-100/20 p-4">
                        <h2 className="text-2xl font-bold mb-1">{frontmatter.title}</h2>
                        <p className="text-gray-600 mb-2">{frontmatter.description}</p>
                        <p className="text-sm text-gray-500 mt-2">{frontmatter.date}</p>
                    </article>
                </Link>
            ))}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/articles"
                sortOrder={sortOrder}
            />
        </main>
    )
}