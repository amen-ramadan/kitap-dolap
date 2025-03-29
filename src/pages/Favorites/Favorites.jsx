import React from "react";
import BookCard from "../../components/BookCard/BookCard";

export default function Favorites() {
  return (
    <BookCard
      book={{
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: "15.99",
        description:
          "A novel set in the Jazz Age that explores themes of wealth and excess...",
        image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      }}
    />
  );
}
