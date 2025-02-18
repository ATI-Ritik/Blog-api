import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { basicAuth } from "hono/basic-auth";
import { type Blog, type User, users, blogs } from "./data";
import { getBlogById, getAllBlogs, createBlog, deleteBlogById } from "./blog";

type Variables = {
  user: User;
};

const app = new Hono<{ Variables: Variables }>();

app.use("/auth/*", async (c, next) => {
  const extendedBasicAuth = basicAuth({
    verifyUser: (username, password) => {
      if (!username || !password) {
        return false;
      }

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      console.log("user", JSON.stringify(user, null, 2));

      if (!user) {
        return false;
      }

      c.set("user", user);
      return true;
    },
    invalidUserMessage: "Invalid username or password",
  });
  return extendedBasicAuth(c, next);
});

app.get("/", (c) => {
  const blogs: Blog[] = getAllBlogs();
  return c.json(blogs);
});

app.get("/blog/:id", (c) => {
  const id = c.req.param("id");

  const blog = getBlogById(parseInt(id));

  if (!blog) {
    throw new HTTPException(404, { message: "Blog not found" });
  }
  return c.json(blog);
});

app.post("/auth/new", async (c) => {
  const user: User = c.get("user");
  const blog = await c.req.json();

  if (!blog.title || !blog.content) {
    throw new HTTPException(400, {
      message: "Title and content are required",
    });
  }

  const newBlog: Blog = createBlog(blog.title, blog.content, user.id);

  blogs.push(newBlog);

  console.log(newBlog);

  return c.json(newBlog);
});

app.delete("/auth/delete/:id", (c) => {
  const id = c.req.param("id");
  const blog = deleteBlogById(parseInt(id));
  return c.json(blog);
});

export default app;
