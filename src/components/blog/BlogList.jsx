import BlogPost from "./BlogPost";

function BlogList({ posts }) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </section>
  );
}

export default BlogList;
