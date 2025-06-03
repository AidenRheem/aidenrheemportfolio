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
            <p class="text-sm text-[#dbdbde]">some things that I'm currently involved in</p>
          </span>
        </div>
      </div>
      
      <div class="projects-grid">
        <!-- Project 1 -->
        <div class="project-item group">
          <a href="https://google.com" rel="noopener noreferrer" target="_blank">
            <div class="project-container">
              <div class="image-container">
                <img
                  width="246"
                  height="64"
                  class="project-image"
                  src="aorta.png"
                  alt="Project Preview"
                />
                <span class="hover-overlay">
                  <span class="font-mono underline krypton text-[#dbdbde]">
                    learn more
                  </span>
                </span>
              </div>
              <div class="info-cont">
                <div class="project-title krypton">
                  <b>biomedical engineering</b> 
                </div>
                <div class="project-desc krypton">
                    3D printed aortas
                </div>
              </div>
            </div>
          </a>
        </div>

        <!-- Project 2 
        <div class="project-item group">
            <a href="https://example.com" rel="noopener noreferrer" target="_blank">
              <div class="project-container">
                <div class="image-container">
                  <img
                    width="246"
                    height="64"
                    class="project-image"
                    src="https://placehold.co/246x64"
                    alt="Project Preview"
                  />
                  <span class="hover-overlay">
                    <span class="font-mono underline krypton text-[#dbdbde]">
                      learn more
                    </span>
                  </span>
                </div>
                <div class="info-cont">
                  <div class="project-title krypton">
                    <b>Lorem Ipsum</b>  
                  </div>
                  <div class="project-desc krypton">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at.
                  </div>
                </div>
              </div>
            </a>
          </div> -->
      </div>
    </div>
</div>

<!-- somehow, tailwind styles get overwritten. so here is the correct styling -->
<style> 
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 32rem;
    margin-left: auto;
    margin-right: auto;
    width: 520px;
    min-height: 50px;
  }
  
  .project-item {
    width: 246px;
    height: 130px;
    position: relative;
  }
  
  .project-container {
    border: 1px solid #28282B;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
  }
  
  .image-container {
    position: relative;
    display: flex;
    overflow: hidden;
    height: 64px;
    width: 100%;
  }
  
  .project-image {
    width: 246px;
    height: 64px;
    object-fit: cover;
    object-position: center;
    transition: filter 0.3s ease-in-out;
  }
  
  .group:hover .project-image {
    filter: blur(3.5px);
  }
  
  .hover-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.55);
    opacity: 0;
    transition: opacity 0.35s ease-in-out;
  }
  
  .group:hover .hover-overlay {
    opacity: 1;
  }
  
  .info-cont {
    border: 1px solid #28282B;
    padding: 0.475rem;
  }
  
  .project-title, .project-desc {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  
  .project-title {
    color: #dbdbde;
  }
  
  .project-desc {
    color: #4e79a7;
  }
</style>