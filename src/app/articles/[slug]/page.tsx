import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticle, getArticleMetadata, getArticleSlugs } from "@/lib/articles";
import PageWrapper from "@/components/PageWrapper";
import { MdArrowBackIosNew } from "react-icons/md";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({
    slug,
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

  const { default: MDXContent } = await evaluate(article.content || "", {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  });

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
          <MDXContent />
        </div>
      </article>
    </PageWrapper>
  );
}
