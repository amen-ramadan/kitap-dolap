import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useBooksStore } from "../../store/modules/books/store";

export default function AdvancedSearchDialog() {
  const { searchParams, setSearchParams, showAdvanced } = useBooksStore();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: searchParams,
  });

  const onSubmit = (values) => {
    // Update search parameters and close dialog
    setSearchParams({ ...values, pageNumber: 1 });
    useBooksStore.setState({ showAdvanced: false });
  };

  const handleClose = () => {
    // Reset form and close dialog
    reset(searchParams);
    useBooksStore.setState({ showAdvanced: false });
  };

  return (
    <Dialog open={showAdvanced} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Advanced Search</DialogTitle>
      <DialogContent>
        <Controller
          name="MinPrice"
          control={control}
          render={({ field }) => (
            <TextField
              label="Min Price"
              type="number"
              fullWidth
              sx={{ mt: 2 }}
              {...field}
            />
          )}
        />

        <Controller
          name="MaxPrice"
          control={control}
          render={({ field }) => (
            <TextField
              label="Max Price"
              type="number"
              fullWidth
              sx={{ mt: 2 }}
              {...field}
            />
          )}
        />

        <Controller
          name="Condition"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Condition</InputLabel>
              <Select label="Condition" {...field}>
                {[...Array(10)].map((_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="Author"
          control={control}
          render={({ field }) => (
            <TextField label="Author" fullWidth sx={{ mt: 2 }} {...field} />
          )}
        />

        <Controller
          name="SortBy"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Sort By</InputLabel>
              <Select label="Sort By" {...field}>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="created">Date</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="SortDescending"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox checked={field.value} onChange={field.onChange} />
              }
              label="Sort Descending"
              sx={{ mt: 2 }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}
