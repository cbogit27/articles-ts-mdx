import { Metadata } from "next"
import Link from 'next/link'
import { getArticles, type SortOrder } from '@/lib/articles'
import Pagination from '@/components/Pagination'
import ArticlesTransitionComp from "@/components/ArticlesTransitionComponent"
import PageWrapper from "@/components/PageWrapper"

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
        <PageWrapper className="view-transition-container">
            <main className="container mx-auto max-w-4xl p-4 md:p-16">
                <header className="py-8 animate-fade-in">
                    <h3 className="text-2xl font-light">Articles relating to web development and technology insights</h3>
                    <div className="mt-4 flex gap-4">
                        <Link 
                            href={`/articles?page=${currentPage}&sort=newest`}
                            className={`text-gray-600/50 hover:text-gray-900 transition-colors duration-300 ${
                                sortOrder === 'newest' ? 'underline underline-offset-4' : ''
                            }`}
                        >
                            newest
                        </Link>
                        <Link 
                            href={`/articles?page=${currentPage}&sort=oldest`}
                            className={`text-gray-600/40 hover:text-gray-900 transition-colors duration-300 ${
                                sortOrder === 'oldest' ? 'underline underline-offset-4' : ''
                            }`}
                        >
                            oldest
                        </Link>
                    </div>
                </header>
                <ArticlesTransitionComp articles={articles}/>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/articles"
                    sortOrder={sortOrder}
                />
            </main>
        </PageWrapper>
    )
}