import React from "react";
import { usePostsStore } from "../../store";

export default function Home() {
  const { usePostsQuery } = usePostsStore();

  const { data: posts, isLoading, error } = usePostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 style={{ margin: "16px auto", textAlign: "center" }}>Posts</h1>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              margin: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "16px",
              width: "40%",
            }}
          >
            <li
              style={{
                fontSize: "1.5rem",
                padding: "8px",
                listStyle: "outside",
                listStyleType: "decimal",
              }}
            >
              {post.title}
            </li>
            <img
              src={post.image}
              alt={post.title}
              width={200}
              height={200}
              loading="lazy"
            />
            <p
              style={{
                fontSize: "12px",
                marginTop: "8px",
                color: "rgb(176 176 177)",
              }}
            >
              {post.description}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}
