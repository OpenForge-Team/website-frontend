import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
async function getPost(slug: string) {
  try {
    const fileName = fs.readFileSync(`public/posts/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return { frontmatter, content };
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function generateStaticParams() {
  try {
    const files = fs.readdirSync("public/posts");
    return files.map((fileName) => ({
      slug: fileName.replace(".md", ""),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
type Params = Promise<{ slug: string }>;

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const { frontmatter, content } = post;
  return (
    <div className="prose mx-auto mt-8">
      <h1 className="text-white">{frontmatter.title}</h1>
      <ReactMarkdown
        className="prose prose-a:text-blue-500 prose-headings:text-white text-white"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
