import { GridCellProps } from '@progress/kendo-react-grid';
import { Review } from '../types/Review.ts';
import { AVATAR_URL } from '../const.ts';

export const UserInfoCell = (props: GridCellProps) => {
  const review = props.dataItem as Review;
  const user = review.user;

  if (!user) {
    return <td>Brak danych użytkownika</td>;
  }

  const userAvatar = `${AVATAR_URL}/${review.user.login}.svg`;
  const userName = review.userName || `${user.firstName} ${user.lastName}`;

  return (
    <td>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
        }}
      >
        <img
          src={userAvatar}
          alt={userName}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #0066cc',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: '1em',
              fontWeight: 'bold',
              color: '#0066cc',
            }}
          >
            @{user.login}
          </div>
          <div
            style={{
              fontSize: '0.85em',
              color: '#555',
              lineHeight: '1.4',
            }}
          >
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              ✉️ {user.email}
            </div>
            <div>
              👤 {user.firstName} {user.lastName}
            </div>
          </div>
        </div>
      </div>
    </td>
  );
};
