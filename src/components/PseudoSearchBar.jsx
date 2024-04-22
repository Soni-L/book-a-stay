import { Button, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function PseudoSearchBar({ onClick }) {
  return (
    <Paper elevation={8} sx={{ borderRadius: "16px" }}>
      <Button
        size="large"
        aria-label="search"
        onClick={onClick}
        elevation={4}
        color="primary"
        style={{
          backgroundColor: "white",
          padding: "8px",
          textTransform: "none",
          borderRadius: "12px",
        }}
        endIcon={<SearchIcon />}
      >
        Book your next vacation
      </Button>
    </Paper>
  );
}
