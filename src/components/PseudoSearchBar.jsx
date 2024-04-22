import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function PseudoSearchBar({ onClick }) {
  return (
    <Button
      aria-label="search"
      onClick={onClick}
      variant="outlined"
      elevation={4}
      style={{
        backgroundColor: "white",
        outline: "gray",
        color: "gray",
        padding: "8px",
        textTransform: "none",
        borderRadius: "12px",
      }}
      endIcon={<SearchIcon />}
    >
      Book your next vacation
    </Button>
  );
}
