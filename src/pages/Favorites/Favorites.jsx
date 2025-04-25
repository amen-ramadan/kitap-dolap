import React from "react";
import BookCard from "../../components/BookCard/BookCard";

export default function Favorites() {
  return <h1>Favorite Books</h1>;
}

// import React from "react";
// import BookCard from "../../components/BookCard/BookCard";
// import { useBooksStore } from "../../store/modules/books/store";
// import { Container, Grid, Typography } from "@mui/material";

// export default function Favorites() {
//   const { favorites, isLoading } = useBooksStore();
//   console.log(favorites);
//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Favorites
//       </Typography>
//       {isLoading && <Typography variant="body1">Loading...</Typography>}
//       {favorites.length === 0 && (
//         <Typography variant="body1">No favorites found</Typography>
//       )}
//       <Grid container spacing={2}>
//         {favorites.map((book) => (
//           <BookCard key={book.id} book={book} />
//         ))}
//       </Grid>
//     </Container>
//   );
// }
