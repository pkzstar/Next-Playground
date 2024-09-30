export const GET_TOP_PLAYERS = `
  query GetTopPlayers($tournamentSlug: String!, $limit: Int!) {
    tournament(slug: $tournamentSlug) {
      standings(query: { perPage: $limit }) {
        nodes {
          placement
          entrant {
            name
          }
        }
      }
    }
  }
`;
