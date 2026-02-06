import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {api} from '../services/api.ts';
import {Dispatch, useEffect, useState} from 'react';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {Reservation} from '../types/Reservation.ts';
import {Link} from 'react-router-dom';
import {dateToString, stringToDate} from '../util/dateUtil.ts';
import {Button, Checkbox} from '@mui/material';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface UserReservationsPageProps {
  setUserReservations: (reservations: Reservation[]) => void;
  reservations: Reservation[];
}

const UserReservationsPageComponent = (props: UserReservationsPageProps) => {

  const {reservations, setUserReservations} = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    api.post<Reservation[]>('/reservation/search', undefined, {})
      .then((reservationResponse) => setUserReservations(reservationResponse))
      .catch((error) => console.error('Error:', error));
  }, [setUserReservations]);


  const columns: GridColDef<(Reservation[])[number]>[] = [
    {
      field: 'checked',
      headerName: 'checked',
      width: 62,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Checkbox
          checked={selectedRows.includes(params.row.id)}
          onChange={(event) => {
            if (event.target.checked) {
              setSelectedRows([...selectedRows, params.row.id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== params.row.id));
            }
          }}
        />
      ),
      renderHeader: () => (
        <Checkbox
          checked={selectedRows.length === reservations.length}
          onChange={(event) => {
            if (event.target.checked) {
              setSelectedRows(reservations.map((r) => r.id));
            } else {
              setSelectedRows([]);
            }
          }}
        />
      ),
    },
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
    },
    {
      field: 'offerId',
      headerName: 'Offer Id',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Offer title',
      width: 250,
      renderCell: (params) => <Link to={`/offer/${params.row.offer.id}`}>{params.row.offer.title}</Link>,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      renderCell: (params) => params.row.offer.price,
    },
    {
      field: 'participants',
      headerName: 'Participants',
      width: 150,
      renderCell: (params) => `${params.row.participants[0].firstName} ${params.row.participants[0].lastName}`,
    },
    {
      field: 'insurance',
      headerName: 'Insurance',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      renderCell: (params) => params.row.offer.city?.title,
      editable: true,
    },
    {
      field: 'tours',
      headerName: 'Tours',
      width: 150,
      editable: true,
    },
    {
      field: 'tour_title',
      headerName: 'Tour title',
      width: 150,
    },
    {
      field: 'tour_price',
      headerName: 'Tour price',
      width: 150,
    },
    {
      field: 'checkIn',
      headerName: 'Check In',
      // type: 'number',
      type: 'date',
      width: 150,
      editable: true,
      valueGetter: stringToDate,
      valueFormatter: dateToString,
    },
    {
      field: 'checkOut',
      headerName: 'Check Out',
      type: 'date',
      width: 150,
      editable: true,
      valueGetter: stringToDate,
      valueFormatter: dateToString,
    },
  ];

  return (
    <Box sx={{height: '90%', width: '100%'}}>
      <ActionButtons>
        <Button variant="contained" startIcon={<EditIcon/>} onClick={() => alert('TODO')}
          disabled={selectedRows.length !== 1}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<LocalOfferIcon/>}
          onClick={() => alert('TODO: add/remove tags: Complaint, Note, Discount, Priority')}
          disabled={selectedRows.length === 0}
        >
          Tags
        </Button>
        <Button variant="contained" startIcon={<BackupTableIcon/>} onClick={() => alert('TODO')}>
          Export to Excel
        </Button>
        <Button variant="contained" startIcon={<PictureAsPdfIcon/>} onClick={() => alert('TODO')}>
          Export to PDF
        </Button>
        <Button variant="contained" startIcon={<AssessmentIcon/>} onClick={() => alert('TODO')}>
          Generate Report
        </Button>
      </ActionButtons>

      <DataGrid
        rows={reservations}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20, 50, 100, 200, 500, 1000]}
        checkboxSelection
        disableRowSelectionOnClick
        slotProps={{
          baseCheckbox: {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.getAttribute('name') === 'select_all_rows') {
                if (event.target.checked) {
                  setSelectedRows(reservations.map((r) => r.id));
                } else {
                  setSelectedRows([]);
                }
              } else {
                const clickedId = parseInt(event.target.closest('[data-id]')!.getAttribute('data-id')!, 10);
                if (event.target.checked) {
                  setSelectedRows([...selectedRows, clickedId]);
                } else {
                  setSelectedRows(selectedRows.filter((id) => id !== clickedId));
                }
              }
            }
          }
        }}
        rowSelectionModel={{type: 'include', ids: new Set<number>(selectedRows)}}
        columnVisibilityModel={{
          offerId: false,
          checked: false,
        }}

      />
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  reservations: state.reservationState.reservations,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUserReservations: (reservations: Reservation[]) => dispatch(actions.setUserReservations(reservations)),
});

export const UserReservationPage = connect(mapStateToProps, mapDispatchToProps)(UserReservationsPageComponent);

const ActionButtons = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;
