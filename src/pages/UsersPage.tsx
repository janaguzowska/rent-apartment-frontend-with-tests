import Box from '@mui/material/Box';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {api} from '../services/api.ts';
import {User} from '../types/User.ts';
import {Dispatch, useEffect} from 'react';
import {AppState} from '../types/AppState.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {Checkbox} from '@mui/material';

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


  const renderCheckbox = (params: GridRenderCellParams<User, boolean>) => (
    <Checkbox
      checked={params.value || false}
      onChange={(e) => {
        const updatedUsers = users.map((user) =>
          user.id === params.row.id
            ? {...user, [params.field]: e.target.checked}
            : user
        );
        setUsers(updatedUsers);
      }}
    />
  );

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
      type: 'boolean',
      width: 150,
      editable: true,
      renderCell: renderCheckbox,
    },
    {
      field: 'isHost',
      headerName: 'Is Host',
      type: 'boolean',
      width: 150,
      editable: true,
      renderCell: renderCheckbox,
    },
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      type: 'boolean',
      width: 150,
      editable: true,
      renderCell: renderCheckbox,
    },
  ];

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
