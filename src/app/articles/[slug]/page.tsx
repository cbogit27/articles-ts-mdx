import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getArticleMetadata } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const { articles } = await getArticles(1, 'newest');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getArticleMetadata(slug);
  return metadata;
}

export default async function ArticleSlug({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="">
      <article className="container mx-auto max-w-4xl p-4 md:p-16">
        <h1 className="text-2xl font-bold">{article.frontmatter.title}</h1>
        <div className="flex items-center justify-between py-8">
          <div>
            <p className="text-gray-700/40 text-sm font-semibold">{article.frontmatter.date}</p>
          </div>
          <div>
            {article.frontmatter.tags?.map((tag) => (
              <span key={tag} className="inline-block mr-3 rounded-tr-lg rounded-bl-lg rounded-br-lg border border-gray-400 px-3 py-1 text-sm font-semibold text-gray-700/40">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="py-4 prose prose-lg">
          <MDXRemote source={article.content || ""} />
        </div>
      </article>
    </main>
  );
}