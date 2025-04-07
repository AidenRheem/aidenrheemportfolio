<script lang="ts"> 
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
    import { onMount } from 'svelte';

    const discordID = '316991053242564609'; // maybe we move this into env?
    let statusData = '';

    export let data;

    const hasValidData = () => {
      return data && data.content && data.metadata && data.metadata.title;
    };

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
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordID}`);
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
            <a href="/projects" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">projects</a>
            <a href="/socials" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">socials</a>
            <a href="/music" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">music</a>
            <a href="/blog" class="underline text-[#a6a6ad] hover:text-[#dbdbde]">blog</a>
          </span>
        </div>

        <!-- blog title, date -->
        <div class="flex flex-col items-center justify-center pt-6">
            {#if hasValidData()}
              <h1 class="krypton text-2xl text-[#dbdbde] font-bold">{data.metadata.title}</h1>
              <p class="krypton text-sm text-[#a6a6ad]">{fixDate(data.metadata.date)}</p>
            {:else}
              <h1 class="krypton text-3xl text-[#dbdbde] font-bold">Loading :^)</h1>
            {/if}
        </div>
    </div>
        
  
      <!-- blog content -->
      <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]">
            {#if hasValidData()}
              <div class="prose prose-invert prose-sm wax-w-none krypton">
                {#key data.content}
                <div class="markdown-content text-[#a6a6ad]">
                    <SvelteMarkdown source={data.content} options={{ breaks: true }}/>
                </div>    
                {/key}
            </div>
            {:else}
              <div class="prose prose-invert prose-sm wax-w-none krypton">
                <h1 class="krypton text-3xl text-[#dbdbde] font-bold">Loading :^)</h1>
              </div>
            {/if}

            <!-- go back to home -->
             <div class="flex justify-center mt-8">
                <a href="/blog" class="krypton text-sm text-[#a6a6ad] hover:text-[#dbdbde]">go back home</a>
             </div>
        </div>
      </div>
    </div>

    <style>
        :global(.prose h1) {
            color: #dbdbde;
            font-size: 1.5rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        :global(.prose h2) {
            color: #dbdbde;
            font-size: 1.25rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        :global(.prose h3) {
            color: #dbdbde;
            font-size: 1.125rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        :global(.prose h4) {
            color: #dbdbde;
            font-size: 1rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        :global(.prose h5) {
            color: #dbdbde;
            font-size: 0.875rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        :global(.prose h6) {
            color: #dbdbde;
            font-size: 0.75rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        :global(.prose p) {
            color: #a6a6ad;
            font-size: 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        :global(.prose a) {
            color: #4e79a7;
            text-decoration: underline;
        }
        :global(.prose code) {
            color: #4e79a7;
            background-color: #28282B;
            padding: 0.2rem 0.4rem;
        }
        :global(.prose blockquote) {
            color: #a6a6ad;
            border-left: 4px solid #4e79a7;
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
        }
        :global(.prose img) {
            max-width: 100%;
            height: auto;
        }
        :global(.prose pre) {
            background-color: #28282B;
            padding: 1rem;
            overflow-x: auto;
        }
        :global(.prose ul) {
            list-style-type: disc;
            padding-left: 1.5rem;
        }
        :global(.prose ol) {
            color: #a6a6ad;
            list-style-type: decimal;
            padding-left: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        :global(.prose li) {
            color: #a6a6ad;
            font-size: 1rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
        :global(.prose strong) {
            color: #dbdbde;
            font-weight: bold;
        }
        :global(.prose del) {
            color: #a6a6ad;
            text-decoration: line-through;
        }
        :global(.prose table) {
            color: #a6a6ad;
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        :global(.prose th, .prose td) {
            border: 1px solid #4e79a7;
            padding: 0.5rem;
            text-align: left;
        }
        :global(.prose hr) {
            border: 0;
            border-top: 1px solid #4e79a7;
            margin: 1.5rem 0;
        }
    </style>
