import React from "react";
import { useBooksStore } from "../../store";
import BookCard from "../../components/BookCard/BookCard";

export default function Home() {
  const { useBooksQuery } = useBooksStore();

  const { data: books, isLoading, error } = useBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "22px",
      }}
    >
      {books?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
