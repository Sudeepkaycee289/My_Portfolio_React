interface BlogFrontmatter {
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  excerpt: string;
  coverImage: string;
}

export async function getBlogPost(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  try {
    const response = await fetch(`blogs/${slug}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load blog post: ${slug}`);
    }
  
    const text = await response.text();
    const parts = text.split('---');
    if (parts.length < 3) {
      throw new Error(`Invalid markdown format for blog post: ${slug}`);
    }
    
    const frontmatterStr = parts[1];
    const content = parts.slice(2).join('---');
    const frontmatter = parseFrontmatter(frontmatterStr);
    return { frontmatter, content: content.trim() };
  } catch (error) {
    console.error(`Error loading blog post (${slug}):`, error);
    throw error;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const response = await fetch('blogs/index.json'); // Assuming you have an index.json file listing all blog slugs
    if (!response.ok) {
      throw new Error('Failed to load blog slugs');
    }
    const slugs = await response.json();
    return slugs;
  } catch (error) {
    console.error('Error loading blog slugs:', error);
    throw error;
  }
}

function parseFrontmatter(frontmatterStr: string): BlogFrontmatter {
  const lines = frontmatterStr.trim().split('\n');
  const frontmatter: Record<string, string> = {};
  
  lines.forEach(line => {
    const [key, ...values] = line.split(':');
    if (key && values.length) {
      frontmatter[key.trim()] = values.join(':').trim();
    }
  });
  
  // Validate required fields
  const requiredFields: (keyof BlogFrontmatter)[] = [
    'title', 'date', 'author', 'readTime', 'category', 'excerpt', 'coverImage'
  ];
  
  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });
  
  return {
    title: frontmatter.title,
    date: frontmatter.date,
    author: frontmatter.author,
    readTime: frontmatter.readTime,
    category: frontmatter.category,
    excerpt: frontmatter.excerpt,
    coverImage: frontmatter.coverImage
  };
}