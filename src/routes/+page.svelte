<script lang="ts"> 
  import { onMount } from 'svelte';

  let LATimeNow = '';
  let spotifyData: {
    track_id: string;
    album_art_url: string;
    album: string;
    song: string;
    artist: string;
  } | null = null;

  const discordID = '883816535033020416'; // maybe we move this into env?
  let statusData = '';

  function updateTime() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = -7; 
    const LA = utc + 3600000 * offset;
    LATimeNow = new Date(LA).toLocaleTimeString();
  }

  const fetchSpotify = async () => {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/883816535033020416`);
      const data = await response.json();
      spotifyData = data.data.spotify;
      statusData = data.data.discord_status;

    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      spotifyData = null; 
    }
  };

  let dotColor = "#a6a6ad";

  $: {
  if (statusData === "offline") {
    dotColor = "#a6a6ad";
  } else if (statusData === "dnd") {
    dotColor = "#812e25";
  } else if (statusData === "idle") {
    dotColor = "#f79c18";
  } else if (statusData === "online") {
    dotColor = "#4f8832";
  }
}

  onMount(() => {
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    fetchSpotify();
    const spotifyInterval = setInterval(fetchSpotify, 10000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(spotifyInterval);
    };
  });

  console.log(dotColor, statusData, spotifyData);
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]">
    <div class="flex items-center justify-center pb-6">
      <!-- my logo, top left -->
      <div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]">
        <a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">r</a>
        <a class="moonhouse group-hover:text-[#dbdbde]" href="/" style="margin-left: -4.5px; color: {dotColor};">.</a>
      </div>

      <!-- hrefs, top right -->
      <div class="absolute top-4.75 right-6 flex items-center">
        <span class="krypton text-sm text-[#a6a6ad]" style="margin-left: -2px;">
          <a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">1.</a>
          <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">2.</a>
          <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">3.</a>
          <a href="/blog" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">4.</a>
        </span>
      </div>

      <!-- text -->
      <div class="flex flex-col items-center justify-center">
        <span class="krypton">
          <p class="text-sm text-[#dbdbde]">hi, i'm <b>aiden rheem</b> and I'm <b>17</b> years old. You can find my work & some info about me here.</p>
          <p class="text-sm text-[#dbdbde]">The time in <b>Los Angeles, CA</b> is currently <span class="timenow"><b>{LATimeNow}</b></span></p>
        </span>
      </div>
    </div>

    <!-- spotify box -->
    <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]">
      <div class="flex items-center">
        {#if spotifyData}
        <a id="spotify-status" href={`https://open.spotify.com/track/${spotifyData.track_id}`} target="_blank" class="flex items-center w-full">
          <img src={spotifyData.album_art_url} alt={spotifyData.album} class="h-16 w-16 p-1">
          <div class="flex-1 pl-2 overflow-hidden">
            <p class="text-base font-semibold text-[#dbdbde] krypton text-clip whitespace-nowrap overflow-hidden">{spotifyData.song}</p>
            <p class="text-xs text-gray-400 krypton truncate">{spotifyData.artist}</p>
          </div>
        </a>
        {:else}
        <p id="spotify-text" class="text-sm text-[#dbdbde] krypton">currently not listening...</p>
        {/if}
      </div>
    </div>
  </div>
</div>