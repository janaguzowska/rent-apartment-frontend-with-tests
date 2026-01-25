import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
  ChartTooltip,
  ChartValueAxis,
  ChartValueAxisItem,
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';
import './ReportsPage.css';
import {useEffect, useState} from 'react';
import {ReservationCount} from '../types/ReservationCount.ts';
import {api} from '../services/api.ts';

interface PieLabelArgs {
  percentage?: number;
}

interface DonutLabelArgs {
  value?: number;
}

// Mockowe dane statystyk
// const reservationsByMonth = [
//   { month: 'Sty', count: 45 },
//   { month: 'Lut', count: 52 },
//   { month: 'Mar', count: 68 },
//   { month: 'Kwi', count: 78 },
//   { month: 'Maj', count: 92 },
//   { month: 'Cze', count: 105 },
// ];

const offersByCategory = [
  { category: 'Apartamenty', count: 45, percentage: 35 },
  { category: 'Hotele', count: 32, percentage: 25 },
  { category: 'Domy', count: 28, percentage: 22 },
  { category: 'Pokoje', count: 23, percentage: 18 },
];

const userRegistrations = [
  { month: 'Sty', users: 12 },
  { month: 'Lut', users: 18 },
  { month: 'Mar', users: 25 },
  { month: 'Kwi', users: 32 },
  { month: 'Maj', users: 28 },
  { month: 'Cze', users: 35 },
];

const reviewsRatings = [
  { rating: '5★', count: 120 },
  { rating: '4★', count: 85 },
  { rating: '3★', count: 45 },
  { rating: '2★', count: 15 },
  { rating: '1★', count: 8 },
];

const revenueData = [
  { month: 'Sty', revenue: 15000, expenses: 8000 },
  { month: 'Lut', revenue: 18000, expenses: 9000 },
  { month: 'Mar', revenue: 22000, expenses: 10000 },
  { month: 'Kwi', revenue: 28000, expenses: 12000 },
  { month: 'Maj', revenue: 32000, expenses: 13000 },
  { month: 'Cze', revenue: 38000, expenses: 14000 },
];

const occupancyRate = [
  { week: 'Tydz 1', rate: 65 },
  { week: 'Tydz 2', rate: 72 },
  { week: 'Tydz 3', rate: 78 },
  { week: 'Tydz 4', rate: 85 },
  { week: 'Tydz 5', rate: 90 },
  { week: 'Tydz 6', rate: 88 },
];

const offerTypesDistribution = [
  { type: 'Premium', value: 35 },
  { type: 'Standard', value: 45 },
  { type: 'Budget', value: 20 },
];

export const ReportsPage = () => {
  const [reservationCount, setReservationCount] = useState<ReservationCount[]>([]);

  useEffect(() => {
    api.post<ReservationCount[]>('/report/search/reservation-count', undefined, {})
      .then((reservationCountResponse) => setReservationCount(reservationCountResponse))
      .catch((error) => console.error('Error:', error));
  }, [setReservationCount]);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Dashboard Statystyk</h1>
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Rezerwacje</h3>
          <p className="stat-value">440</p>
          <span className="stat-trend positive">↑ 12%</span>
        </div>
        <div className="stat-card">
          <h3>Oferty</h3>
          <p className="stat-value">128</p>
          <span className="stat-trend positive">↑ 8%</span>
        </div>
        <div className="stat-card">
          <h3>Użytkownicy</h3>
          <p className="stat-value">150</p>
          <span className="stat-trend positive">↑ 15%</span>
        </div>
        <div className="stat-card">
          <h3>Recenzje</h3>
          <p className="stat-value">273</p>
          <span className="stat-trend neutral">→ 3%</span>
        </div>
      </div>

      <div className="charts-grid">
        {/* Wykres kolumnowy - Rezerwacje */}
        <div className="chart-card">
          <Chart>
            <ChartTitle text="Rezerwacje wg miesięcy" />
            <ChartLegend visible={false} />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={reservationCount.map((r) => r.month)} />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="column"
                data={reservationCount.map((r) => r.count)}
                color="#3f51b5"
                tooltip={{ visible: true }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>

        {/* Wykres kołowy - Kategorie ofert */}
        <div className="chart-card">
          <Chart>
            <ChartTitle text="Oferty według kategorii" />
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem
                type="pie"
                data={offersByCategory}
                field="count"
                categoryField="category"
                labels={{
                  visible: true,
                  content: (e: PieLabelArgs) => `${e.percentage}%`,
                }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>

        {/* Wykres liniowy - Rejestracje użytkowników */}
        <div className="chart-card">
          <Chart>
            <ChartTitle text="Rejestracje użytkowników" />
            <ChartLegend visible={false} />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={userRegistrations.map((u) => u.month)} />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="line"
                data={userRegistrations.map((u) => u.users)}
                color="#4caf50"
                markers={{ visible: true }}
                tooltip={{ visible: true }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>

        {/* Wykres słupkowy poziomy - Oceny */}
        <div className="chart-card">
          <Chart>
            <ChartTitle text="Rozkład ocen w recenzjach" />
            <ChartLegend visible={false} />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={reviewsRatings.map((r) => r.rating)} />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="bar"
                data={reviewsRatings.map((r) => r.count)}
                color="#ff9800"
                tooltip={{ visible: true }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>

        {/* Wykres wieloseryjny - Przychody i wydatki */}
        <div className="chart-card chart-card-wide">
          <Chart>
            <ChartTitle text="Przychody vs Wydatki" />
            <ChartLegend position="bottom" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={revenueData.map((r) => r.month)} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem labels={{ format: '{0:N0} PLN' }} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="column"
                data={revenueData.map((r) => r.revenue)}
                name="Przychody"
                color="#2196f3"
                tooltip={{ visible: true }}
              />
              <ChartSeriesItem
                type="column"
                data={revenueData.map((r) => r.expenses)}
                name="Wydatki"
                color="#f44336"
                tooltip={{ visible: true }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>

        {/* Wykres obszarowy - Obłożenie */}
        <div className="chart-card">
          <Chart>
            <ChartTitle text="Wskaźnik obłożenia (%)" />
            <ChartLegend visible={false} />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={occupancyRate.map((o) => o.week)} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem min={0} max={100} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="area"
                data={occupancyRate.map((o) => o.rate)}
                color="#9c27b0"
                opacity={0.7}
                tooltip={{ visible: true }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>

        {/* Wykres donut - Typy ofert */}
        <div className="chart-card">
          <Chart>
            <ChartTitle text="Dystrybucja typów ofert" />
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem
                type="donut"
                data={offerTypesDistribution}
                field="value"
                categoryField="type"
                labels={{
                  visible: true,
                  content: (e: DonutLabelArgs) => `${e.value}%`,
                }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </div>
      </div>
    </div>
  );
};


