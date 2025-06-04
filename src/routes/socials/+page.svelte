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
      const offset = 2; 
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
          <a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">a</a>
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
            <p class="text-sm text-[#dbdbde]">contact me through any of the platforms below</p>
          </span>
        </div>
      </div>
  
      <!-- socials box -->
      <div class="container max-w-screen-sm border border-overlay2 p-4 text-[#28282B]">
        <div class="socials-grid">
          <a href="https://linkedin.com/in/AidenRheem" target="_blank" rel="noopener noreferrer" class="social-item">
            <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>
            </div>
            <span class="social-text krypton">LinkedIn</span>
          </a>
          <a href="mailto:aidenrheem@gmail.com" class="social-item">
            <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
            </div>
            <span class="social-text krypton">Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- TODO: move everything except gtrid to tailwindcss -->
<style>
  .socials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
  }
  
  .social-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #282828;
    padding: 1rem;
    transition: all 0.3s ease;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .social-item:hover {
    transform: translateY(-3px);
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  
  .social-icon {
    width: 24px;
    height: 24px;
    color: #dbdbde;
  }
  
  .social-text {
    font-size: 0.8rem;
    color: #dbdbde;
  }
</style>