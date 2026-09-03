export const QUERY_PAGE_FIXTURE_CURRENT_ROWS = 120;

function row(ordinal, metrics) {
  return {
    keys: [
      `fixture-query-${String(ordinal).padStart(3, '0')}`,
      'https://bebergames.com/juegos/la-ruleta',
    ],
    ...metrics,
  };
}

export function createQueryPageFixture() {
  const current = Array.from({ length: QUERY_PAGE_FIXTURE_CURRENT_ROWS }, (_, index) => {
    const ordinal = index + 1;
    const clicks = QUERY_PAGE_FIXTURE_CURRENT_ROWS + 1 - ordinal;
    const impressions = clicks * 10;
    return row(ordinal, {
      clicks,
      impressions,
      ctr: clicks / impressions,
      position: 3 + (ordinal / 100),
    });
  });

  const previous = [
    row(1, { clicks: 100, impressions: 1_100, ctr: 100 / 1_100, position: 3.5 }),
    row(51, { clicks: 60, impressions: 650, ctr: 60 / 650, position: 5 }),
    row(100, { clicks: 10, impressions: 150, ctr: 10 / 150, position: 9 }),
    {
      keys: ['fixture-query-lost', 'https://bebergames.com/juegos/la-ruleta'],
      clicks: 9,
      impressions: 90,
      ctr: 0.1,
      position: 7,
    },
  ];

  return { current, previous };
}
