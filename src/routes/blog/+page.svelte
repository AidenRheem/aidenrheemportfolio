<script lang="ts"> 
    import { onMount } from 'svelte';

    const discordID = '883816535033020416'; // maybe we move this into env?
    let statusData = '';

    import type { Post } from '$lib/types';

    interface BlogData {
        posts: {
            metadata: {
                title: string;
                date: string;
            };
            slug: string;
            preview: string;
        }
    }

    export let data: BlogData;

    function fixDate(dateString: string) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (error) {
            console.error('Error parsing date:', error);
            return dateString; 
        }
    }


    const fetchSpotify = async () => { // too lazy to rename this lol
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/883816535033020416`);
        const data = await response.json();
        statusData = data.data.discord_status;
  
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
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
      fetchSpotify();
      const spotifyInterval = setInterval(fetchSpotify, 10000);
  
      return () => {
        clearInterval(spotifyInterval);
      };
    });
  
    console.log(dotColor, statusData);
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
            <p class="text-sm text-[#dbdbde]">down below are all of my current blog posts. i usually write about <b>random shit</b>.</p>
          </span>
        </div>
      </div>
  
      <!-- post box -->
      <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]">
            <div class="flex flex-col space-y-4">
                {#if data.posts.length === 0}
                <p class="text-center text-[#a6a6ad] krypton py-4">You're too early. There are no blog posts yet!</p>
                {:else}
                    {#each data.posts as post}
                    <a href={`/blog/${post.slug}`} class="block border border-overlay2 p-4 hover:bg-black/30 transition-colors duration-200">
                        <div class="flex flex-col">
                            <h2 class="text-lg font-medium text-[#dbdbde] krypton">{post.metadata.title}</h2>
                            <p class="text-sm text-[#a6a6ad] krypton">{fixDate(post.metadata.date)}</p>
                            <p class="text-sm text-[#a6a6ad] krypton">{post.preview}</p>
                            <div class="mt-2">
                                <span class="text-[#4e79a7] krypton">Read more...</span>
                            </div>
                        </div>
                    </a>
                    {/each}
                {/if}
            </div>
      </div>
    </div>
  </div>