import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {api} from '../services/api.ts';
import {User} from '../types/User.ts';
import {Dispatch, useEffect} from 'react';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';

const columns: GridColDef<(User[])[number]>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'login',
    headerName: 'Login',
    width: 150,
  },
  {
    field: 'password',
    headerName: 'Password',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'isClient',
    headerName: 'Is Client',
    width: 150,
    editable: true,
  },
  {
    field: 'isHost',
    headerName: 'Is Host',
    width: 150,
    editable: true,
  },
  {
    field: 'isAdmin',
    headerName: 'Is Admin',
    width: 150,
    editable: true,
  },
];

interface OfferDetailsPageProps {
  setUsers: (users: User[]) => void;
  users: User[];
}

const UsersPageComponent = (props: OfferDetailsPageProps) => {

  const {users, setUsers} = props;

  useEffect(() => {
    api.post<User[]>('/user/search', undefined, {})
      .then((usersResponse) => setUsers(usersResponse))
      .catch((error) => console.error('Error:', error));
  }, [setUsers]);

  return (
    <Box sx={{height: '90%', width: '100%'}}>
      <DataGrid
        rows={users}
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
      />
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: state.usersState.users,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUsers: (users: User[]) => dispatch(actions.setUsers(users)),
});

export const UsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersPageComponent);
