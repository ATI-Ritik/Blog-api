import {
  type Blog,
  type User,
  type GetBlogWithUser,
  blogs,
  users,
} from "./data";
import { getUserById } from "./user";

export function getAllBlogs(): Blog[] {
  return blogs;
}

export function getBlogById(id: number): GetBlogWithUser | undefined {
  const { userId, ...blog } = blogs.find((blog) => blog.id === id) as
    | Blog
    | { userId: undefined };
  if (!blog || !userId) {
    return undefined;
  }

  const blogUser = getUserById(userId);

  if (!blogUser) {
    return undefined;
  }

  return { ...blog, user: blogUser } as GetBlogWithUser;
}

export function createBlog(
  title: string,
  content: string,
  userId: number
): Blog {
  const blog: Blog = {
    id: blogs.length ?? 1,
    date: new Date().toISOString().split("T")[0],
    title,
    content,
    userId,
  };
  return blog;
}

export function deleteBlogById(id: number): Blog {
  const index = blogs.findIndex((blog) => blog.id === id);
  const removedBlog = { ...blogs[index] };
  blogs.splice(index, 1);
  return removedBlog;
}
