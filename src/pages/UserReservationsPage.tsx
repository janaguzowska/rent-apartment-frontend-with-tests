import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {api} from '../services/api.ts';
import {Dispatch, useEffect} from 'react';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {Reservation} from '../types/Reservation.ts';
import {Link} from 'react-router-dom';
import {dateToString, stringToDate} from '../util/dateUtil.ts';

interface UserReservationsPageProps {
  setUserReservations: (reservations: Reservation[]) => void;
  reservations: Reservation[];
}

const UserReservationsPageComponent = (props: UserReservationsPageProps) => {

  const {reservations, setUserReservations} = props;

  useEffect(() => {
    api.post<Reservation[]>('/reservation/search', undefined, {})
      .then((reservationResponse) => setUserReservations(reservationResponse))
      .catch((error) => console.error('Error:', error));
  }, [setUserReservations]);


  const columns: GridColDef<(Reservation[])[number]>[] = [
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
        pageSizeOptions={[20, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        columnVisibilityModel={{
          offerId: false
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
