<script lang="ts"> 
  import { onMount } from 'svelte';

  let germanyTimeNow = '';
  let spotifyData: {
    track_id: string;
    album_art_url: string;
    album: string;
    song: string;
    artist: string;
  } | null = null;

  const discordID = '316991053242564609'; // maybe we move this into env?

  function updateTime() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = 2; // Germany's timezone offset
    const germany = utc + 3600000 * offset;
    germanyTimeNow = new Date(germany).toLocaleTimeString(); // Only show the time
  }

  const fetchSpotify = async () => {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${discordID}`);
      const data = await response.json();
      spotifyData = data.data.spotify; // Assign the fetched data to spotifyData
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      spotifyData = null; // Reset spotifyData in case of an error
    }
  };

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
</script>

<div class="min-h-screen flex items-center justify-center">
  <!-- Reduced padding from p-24 to p-12 -->
  <div class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]">
    <div class="flex items-center justify-center pb-6">
      <!-- my logo, top left -->
      <div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]">
        <a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">r</a>
        <a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/" style="margin-left: -4.5px;">.</a>
      </div>

      <!-- hrefs, top right -->
      <div class="absolute top-4.75 right-6 flex items-center">
        <span class="krypton text-sm text-[#a6a6ad]" style="margin-left: -2px;">
          <a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">projects</a>
          <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">socials</a>
          <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">music</a>
        </span>
      </div>

      <!-- text -->
      <div class="flex flex-col items-center justify-center">
        <span class="krypton">
          <p class="text-sm text-[#dbdbde]">hi, i'm <b>rob</b> and I'm currently <b>16</b> years old. You can find my projects, music stats & some info about me here.</p>
          <p class="text-sm text-[#dbdbde]">The time in <b>Germany</b> is currently <span class="timenow"><b>{germanyTimeNow}</b></span></p>
        </span>
      </div>
    </div>

    <!-- spotify box -->
    <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]">
      <div class="flex items-center">
        {#if spotifyData}
        <a id="spotify-status" href={`https://open.spotify.com/track/${spotifyData.track_id}`} target="_blank" class="flex items-center w-full">
          <!-- Smaller image with padding -->
          <img src={spotifyData.album_art_url} alt={spotifyData.album} class="h-16 w-16 p-1">

          <!-- Compact text layout -->
          <div class="flex-1 pl-2 overflow-hidden">
            <p class="text-base font-semibold text-[#dbdbde] krypton text-clip whitespace-nowrap overflow-hidden">{spotifyData.song}</p>
            <p class="text-xs text-gray-400 krypton truncate">{spotifyData.artist}</p>
          </div>
        </a>
        {:else}
        <p id="spotify-text" class="text-sm text-[#dbdbde]">currently not listening...</p>
        {/if}
      </div>
    </div>
  </div>
</div>