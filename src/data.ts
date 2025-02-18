export type Blog = {
  id: number;
  title: string;
  content: string;
  date: string;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

export type GetBlogWithUser = Omit<Blog, "userId"> & { user: User };

export let users: User[] = [
  {
    id: 0,
    name: "Hono",
    username: "hono",
    password: "acoolproject",
  },
  {
    id: 1,
    name: "John Doe",
    username: "john",
    password: "doe",
  },
];

export let blogs: Blog[] = [
  {
    id: 0,
    title: "Hello world",
    content: "This is the first blog",
    date: new Date().toISOString().split("T")[0],
    userId: 0,
  },
  {
    id: 1,
    title: "First blog",
    content: "This is the first blog",
    date: new Date().toISOString().split("T")[0],
    userId: 0,
  },
  {
    id: 2,
    title: "Second blog",
    content: "This is the second blog",
    date: new Date().toISOString().split("T")[0],
    userId: 1,
  },
  {
    id: 3,
    title: "Third blog",
    content: "This is the third blog",
    date: new Date().toISOString().split("T")[0],
    userId: 1,
  },
];
