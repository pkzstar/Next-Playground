import { GET_TOP_PLAYERS } from '../graphql/queries'; // Ensure this path is correct

export async function getServerSideProps() {
  const tournamentSlug = "tournament/baseline-2024/event/project-singles"; // Correct slug
  const limit = 3; // Fetch top 3 players

  // Fetch the data from the API
  const response = await fetch("https://www.start.gg/api/-/gql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: GET_TOP_PLAYERS,
      variables: {
        tournamentSlug,
        limit
      }
    })
  });

  const result = await response.json();
  console.log(result); // Log the entire result for debugging

  // Check if tournament data exists
  if (!result.data || !result.data.tournament) {
    console.error('Tournament data not found', result);
    return {
      props: {
        players: [] // Return an empty array or handle it as you wish
      }
    };
  }

  return {
    props: {
      players: result.data.tournament.standings.nodes || []
    }
  };
}

export default function TournamentPage({ players }) {
  // Filter players by standing
  const playerStanding1 = players.find(player => player.placement === 1);
  const playerStanding2 = players.find(player => player.placement === 2);
  const playerStanding3 = players.find(player => player.placement === 3);

  return (
    <div>
      <h1>Top Players</h1>

      <h2>Standing 1</h2>
      {playerStanding1 ? (
        <p>Standing: {playerStanding1.placement}, Name: {playerStanding1.entrant.name}</p>
      ) : (
        <p>No player found for standing 1</p>
      )}
      
      <h2>Standing 2</h2>
      {playerStanding2 ? (
        <p>Standing: {playerStanding2.placement}, Name: {playerStanding2.entrant.name}</p>
      ) : (
        <p>No player found for standing 2</p>
      )}
      
      <h2>Standing 3</h2>
      {playerStanding3 ? (
        <p>Standing: {playerStanding3.placement}, Name: {playerStanding3.entrant.name}</p>
      ) : (
        <p>No player found for standing 3</p>
      )}
    </div>
  );
}
