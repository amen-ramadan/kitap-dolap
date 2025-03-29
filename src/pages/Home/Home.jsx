import React from "react";
import { useBooksStore } from "../../store";
import BookCard from "../../components/BookCard/BookCard";

export default function Home() {
  const { useBooksQuery } = useBooksStore();

  const { data: books, isLoading, error } = useBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    // <div>
    //   <h1 style={{ margin: "16px auto", textAlign: "center" }}>Posts</h1>
    //   <ul
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     {books?.map((book) => (
    //       <div
    //         key={book.id}
    //         style={{
    //           margin: "16px",
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           gap: "16px",
    //           border: "1px solid #ccc",
    //           borderRadius: "5px",
    //           padding: "16px",
    //           width: "40%",
    //         }}
    //       >
    //         <li
    //           style={{
    //             fontSize: "1.5rem",
    //             padding: "8px",
    //             listStyle: "outside",
    //             listStyleType: "decimal",
    //           }}
    //         >
    //           {book.title}
    //         </li>
    //         <img
    //           src={book.image}
    //           alt={book.title}
    //           width={200}
    //           height={200}
    //           loading="lazy"
    //         />
    //         <p
    //           style={{
    //             fontSize: "12px",
    //             marginTop: "8px",
    //             color: "rgb(176 176 177)",
    //           }}
    //         >
    //           {book.description}
    //         </p>
    //       </div>
    //     ))}
    //   </ul>
    // </div>

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
