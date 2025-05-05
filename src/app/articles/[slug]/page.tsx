import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticle, getArticles, getArticleMetadata } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageWrapper from "@/components/PageWrapper";
import { MdArrowBackIosNew } from "react-icons/md";

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { articles } = await getArticles(1, 'newest');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Params ): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getArticleMetadata(slug);
  return metadata;
}

export default async function ArticleSlug({ params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageWrapper>
      <article className="container mx-auto max-w-4xl p-4 md:p-16">
        <div className="mb-8">
          <Link 
            href="/articles" 
            className="inline-flex items-center text-gray-800/40 hover:text-gray-900 transition-colors duration-300"
            scroll={false}
          >
            <MdArrowBackIosNew size={40}/>
      
          </Link>
        </div>
        
        <header className="mb-10 article-header">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.frontmatter.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-gray-200/30">
            <p className="text-gray-700/40 text-sm font-semibold mb-4 md:mb-0">{article.frontmatter.date}</p>
            <div className="flex flex-wrap gap-2">
              {article.frontmatter.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-block rounded-tr-lg rounded-bl-lg rounded-br-lg border border-gray-400 px-3 py-1 text-sm font-semibold text-gray-700/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        
        <div className="py-4 prose prose-lg max-w-none article-content">
          <MDXRemote source={article.content || ""} />
        </div>
      </article>
    </PageWrapper>
  );
}