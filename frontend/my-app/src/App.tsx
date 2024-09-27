
import './App.css';
import MainTable from './components/table/MainTable';
import SearchBar from './components/searchBar/SearchBar';
import { Box, Grid2, List, ListItem } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Grid2 size={12}>
        <Box>
          <SearchBar></SearchBar>
        </Box>
         </Grid2>
      <Grid2 container spacing={2}>
      <Grid2 size={4}>
        <Box sx={{ flexGrow: 1 }} padding={'50px'}>
        </Box>
      </Grid2>
      <Grid2 size={8}>
        <Box sx={{ flexGrow: 1 }} padding={'50px'}>
          <MainTable></MainTable>
        </Box>
      </Grid2>
      </Grid2>
    </div>
  );
}

export default App;
