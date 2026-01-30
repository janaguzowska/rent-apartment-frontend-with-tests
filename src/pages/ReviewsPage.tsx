import {useCallback, useEffect, useState} from 'react';
import {Grid, GridCellProps, GridColumn, GridDataStateChangeEvent, GridToolbar} from '@progress/kendo-react-grid';
import {process, State} from '@progress/kendo-data-query';
import {Review} from '../types/Review';
import {api} from '../services/api';
import {UserInfoCell} from '../components/UserInfoCell.tsx';
import {DateRangeFilterCell} from '../components/DateRangeFilterCell.tsx';
import {getReviewsWithDateType} from '../util/dateUtil.ts';

export const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [dataState, setDataState] = useState<State>({
    skip: 0,
    take: 10,
    sort: [{ field: 'date', dir: 'desc' }],
    filter: {
      logic: 'and',
      filters: []
    }
  });

  const loadReviews = useCallback(() => {
    setShowLoader(true);
    api.post<Review[]>('/review/search', {}, {})
      .then((reviewResponse) => setReviews(reviewResponse))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error loading reviews:', error);
        setReviews([]);
      })
      .finally(() => setShowLoader(false));
  }, [setShowLoader]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // const dataStateChange = (event: GridPageChangeEvent | GridSortChangeEvent | GridFilterChangeEvent) => {
  //   setDataState({
  //     ...dataState,
  //     ...event.dataState
  //   } as State);
  // };

  const processedData = process(getReviewsWithDateType(reviews), dataState);

  const RatingCell = (props: GridCellProps) => {
    const rating = (props.dataItem as Review).rating;
    let color = '#f44336';
    if (rating >= 4) {
      color = '#4caf50';
    } else if (rating >= 3) {
      color = '#ff9800';
    }

    return (
      <td style={{ textAlign: 'center' }}>
        <span style={{color}}>
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} ({rating})
        </span>
      </td>
    );
  };


  const DescriptionCell = (props: GridCellProps) => {
    const description = (props.dataItem as Review).description;
    const [expanded, setExpanded] = useState(false);
    const maxLength = 100;

    return (
      <td>
        <div>
          {description.length > maxLength && !expanded
            ? `${description.substring(0, maxLength)}...`
            : description}
          {description.length > maxLength && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginLeft: '8px',
                color: '#0066cc',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {expanded ? 'Zwiń' : 'Rozwiń'}
            </button>
          )}
        </div>
      </td>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Recenzje</h1>

      <Grid
        filter={dataState.filter}
        data={processedData}
        onDataStateChange={(event: GridDataStateChangeEvent) => setDataState(event.dataState)}
        sortable={{
          allowUnsort: true,
          mode: 'multiple'
        }}
        showLoader={showLoader}
        filterable
        pageable={{
          buttonCount: 5,
          info: true,
          type: 'numeric',
          pageSizes: [5, 10, 20, 50],
          previousNext: true
        }}
        resizable
        reorderable
        // loading={loading}
        style={{
          height: '700px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '4px'
        }}
      >
        <GridToolbar>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div>
              <strong>Total reviews: {reviews.length}</strong>
              {dataState.filter && (dataState.filter).filters.length > 0 && (
                <span style={{ marginLeft: '15px', color: '#666' }}>
                  (Wyfiltrowano: {processedData.total})
                </span>
              )}
            </div>
            <button
              onClick={loadReviews}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Odśwież dane
            </button>
          </div>
        </GridToolbar>

        <GridColumn
          field="id"
          title="ID"
          width="80px"
          filterable
          sortable
          filter="numeric"
        />

        <GridColumn
          field="offerId"
          title="Offer ID"
          width="100px"
          filterable
          sortable
          filter="numeric"
        />

        <GridColumn
          field="user"
          title="User"
          width="350px"
          cells={{data: UserInfoCell}}
          filterable
          sortable
        />

        <GridColumn
          field="rating"
          title="Rating"
          width="200px"
          cells={{data: RatingCell}}
          filterable
          sortable
          filter="numeric"
        />

        <GridColumn
          field="description"
          title="Description"
          width="400px"
          cells={{data: DescriptionCell}}
          filterable
          sortable
        />

        <GridColumn
          field="creationDateAsDate"
          title="Creation date"
          width="220px"
          filterable
          sortable
          filter="date"
          format={'{0:dd.MM.yyyy HH:mm}'}
          cells={{filterCell: () => <DateRangeFilterCell setDataState={setDataState} dataState={dataState} field="creationDateAsDate" /> }}
        />
      </Grid>
    </div>
  );
};
