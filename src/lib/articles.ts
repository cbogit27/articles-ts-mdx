import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from 'next'

export type Article = {
  slug: string
  frontmatter: {
    title: string
    date: string
    description: string
    tags?: string[]
  }
  content?: string
}

export type SortOrder = 'newest' | 'oldest'

function getArticleFiles() {
  const contentDir = path.join(process.cwd(), 'src/content')
  const files = fs.readdirSync(contentDir)
  return {
    contentDir,
    mdxFiles: files.filter(file => file.endsWith('.mdx'))
  }
}

export function getArticleSlugs(): string[] {
  const { mdxFiles } = getArticleFiles()
  return mdxFiles.map(file => file.replace('.mdx', ''))
}

export async function getArticles(page: number = 1, sortOrder: SortOrder = 'newest', limit?: number): Promise<{ articles: Article[], totalPages: number }> {
  const { contentDir, mdxFiles } = getArticleFiles()

  const allArticles = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter } = matter(fileContent)
      return {
        slug: file.replace('.mdx', ''),
        frontmatter: {
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || 'No date',
          description: frontmatter.description || 'No description',
          tags: frontmatter.tags || []
        }
      }
    })
  )

  // Sort articles
  const sortedArticles = allArticles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
  })

  // Apply limit if specified
  const limitedArticles = limit ? sortedArticles.slice(0, limit) : sortedArticles

  // Paginate if no limit is specified
  if (!limit) {
    const ITEMS_PER_PAGE = 5
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedArticles = limitedArticles.slice(startIndex, endIndex)
    const totalPages = Math.ceil(limitedArticles.length / ITEMS_PER_PAGE)
    return {
      articles: paginatedArticles,
      totalPages
    }
  }

  return {
    articles: limitedArticles,
    totalPages: 1
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(process.cwd(), "src/content", `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data: frontmatter, content } = matter(fileContent)
  
  return {
    slug,
    content,
    frontmatter: {
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || "No date",
      tags: frontmatter.tags || [],
      description: frontmatter.description || "",
    },
  }
}

export async function getArticleMetadata(slug: string): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "src/content", `${slug}.mdx`)
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data: frontmatter } = matter(fileContent)
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    }
  } catch {
    return {
      title: "Article not found",
      description: "The requested article could not be found",
    }
  }
}
