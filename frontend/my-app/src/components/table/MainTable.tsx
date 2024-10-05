import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IFolderContentProps } from '../../helpers/interfaces';
// import { FaFile } from 'react-icons/fa'
import { FaFile } from 'react-icons/fa';
import { Button } from '@mui/material';
import { GOV_CARPETA_URL } from '../../url';

interface Column {
  id: 'name' | 'CreatedDate' | 'type';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'center'},
  { id: 'CreatedDate', label: 'Created Date', minWidth: 100, align: 'center' },
  {
    id: 'type',
    label: 'File',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  name: string;
  CreatedDate: string;
  type: 'File';
  url: string;
}

function createData(
  name: string,
  CreatedDate: string,
  type: 'File',
  url: string

): Data {
  return { name, CreatedDate, type, url };
}

const OnClickRow = async (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, url: string) => {
  if (!(event.target instanceof HTMLButtonElement)) {
    window.open(url, '_blank');
  }
}



export default function StickyHeadTable(props: IFolderContentProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(true);

  const rows = props.folderContent?.filter((folderItem) => folderItem.type === 'File').
                map((file)=>{return createData(file.name, file.LastModified.toString(), "File", (file.url || ''))});
  const rowsNumber = rows?.length || 0;
 
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickCertificateDoc = async (data: {url: string,name: string }) => {
    // console.log(url);
    try {
      await fetch(`${GOV_CARPETA_URL}/apis/authenticateDocument`, {
        method: 'PUT',
        body: JSON.stringify({
          idCitizen: props.userid,
          UrlDocument: data.url,
          documentTitle: data.name
        })
      })
      alert('documento certificado exitosamente')
    } catch (error) {
      console.error('there was an error trying to certificate document');
    }
    
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows !== undefined ? rows  
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name} onClick={(event) => OnClickRow(event ,row.url)} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <div className='file-icon-container'>
                          {column.id === 'type' ?
                          <div style = {{display: 'flex',alignItems: 'center'}}>
                            <img src="/text.png" alt="file" width={'40px'} className='file-img'/>
                            <Button variant="contained" color = "success" size='small' onClick={()=>onClickCertificateDoc({url: row.url, name: row.name})}>Certificar</Button>
                          </div>:
                          <span>
                            {value}
                          </span>

                          }
                            </div>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              }): <p></p>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowsNumber}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}