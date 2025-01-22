const API_KEY = "304737FE084545CEBB718C5DD1A54053"; 
const STEAM_ID = "76561198858318960"; 

const profileIcon = document.getElementById("profile-icon");
const gameListDiv = document.getElementById("game-list");

async function fetchProfileData() {
  try {
    // Fetch profile summary (like profile avatar)
    const profileResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${STEAM_ID}`
    );
    const profileData = await profileResponse.json();
    const player = profileData.response.players[0];

    if (player) {
      profileIcon.src = player.avatarfull; // Use the full-size Steam avatar.
      profileIcon.alt = player.personaname; // Set the alt to the player's Steam name.
    } else {
      profileIcon.alt = "Profile not found.";
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    profileIcon.alt = "Error loading profile.";
  }
}

async function fetchRecentGames() {
  try {
    // Fetch recent games
    const gameResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${API_KEY}&steamid=${STEAM_ID}`
    );
    const data = await gameResponse.json();
    const games = data.response.games || [];

    if (games.length === 0) {
      gameListDiv.innerHTML = "<p>No recent games found or profile is private.</p>";
      return;
    }

    const recentGames = games.slice(0, 5); // Get the last 5 games.
    const gameListHtml = recentGames
      .map(
        (game) => `
        <div class="game">
          <img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg" alt="${game.name}" />
          <p>${game.name}</p>
          <p>Playtime: ${(game.playtime_forever / 60).toFixed(2)} hours</p>
        </div>
      `
      )
      .join("");

    gameListDiv.innerHTML = gameListHtml;
  } catch (error) {
    console.error("Error fetching recent games:", error);
    gameListDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
}

// Fetch both profile and games when the page loads
fetchProfileData();
fetchRecentGames();
