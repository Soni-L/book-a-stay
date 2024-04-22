import { Button, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function PseudoSearchBar({ onClick }) {
  return (
    <Button
      size="large"
      aria-label="search"
      onClick={onClick}
      elevation={4}
      color="primary"
      style={{
        backgroundColor: "white",
        padding: "8px 24px",
        textTransform: "none",
        borderRadius: "24px",
        boxShadow: "2px 2px gray",
        border: '1px solid'
      }}
      endIcon={<SearchIcon />}
    >
      Book your next vacation
    </Button>
  );
}
