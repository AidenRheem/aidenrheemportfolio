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

	let dotColor = '#a6a6ad';

	$: {
		if (statusData === 'offline') {
			dotColor = '#a6a6ad';
		} else if (statusData === 'dnd') {
			dotColor = '#812e25';
		} else if (statusData === 'idle') {
			dotColor = '#f79c18';
		} else if (statusData === 'online') {
			dotColor = '#4f8832';
		}
	}

	interface TopTrack {
		name: string;
		artist: string;
		position: number;
		imageUrl: string;
		url: string;
		albumName: string;
	}

	interface Artist {
		externalIds: {
			spotify?: string[];
			appleMusic?: string[];
		};
		id: number;
		image: string;
		name: string;
	}

	interface TopArtist {
		artist: Artist;
		url: string;
	}

	interface StatsFmTrackItem {
		position: number;
		track: {
			name: string;
			artists: {
				name: string;
			}[];
			albums: {
				image: string;
				name: string;
			}[];
			externalIds: {
				spotify?: string[];
			};
		};
	}

	interface StatsFmArtistItem {
		position: number;
		streams: number | null;
		indicator: string;
		artist: Artist;
	}

	let topTracks: TopTrack[] = [];
	let topArtists: TopArtist[] = [];

	const statsFmUsername = 'robdot';

	// thanks to YungBricoCoop on Github for the API usage info!!!

	async function fetchTopTracks() {
		try {

			const response = await fetch(
				`https://beta-api.stats.fm/api/v1/users/${statsFmUsername}/top/tracks?limit=1&range=weeks`
			);

			if (!response.ok) {
				throw new Error('Faild to fetch top tracks');
			}

			const data = await response.json();

			topTracks = data.items.map((item: StatsFmTrackItem) => ({
				name: item.track.name,
				artist: item.track.artists.map((artist: { name: string }) => artist.name).join(', '),
				position: item.position,
				imageUrl: item.track.albums[0].image,
				albumName: item.track.albums[0].name,
				url:
					item.track.externalIds.spotify && item.track.externalIds.spotify.length > 0
						? `https://open.spotify.com/track/${item.track.externalIds.spotify[0]}`
						: '#'
			}));
		} catch (error) {
			console.error('Error fetching top tracks, see ', error);
		}
	}

	async function fetchTopArtists() {
		try {
			const response = await fetch(
				`https://beta-api.stats.fm/api/v1/users/${statsFmUsername}/top/artists?limit=50&range=weeks`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch top artists');
			}

			const data = await response.json();

			topArtists = data.items.map((item: StatsFmArtistItem) => ({
				artist: item.artist,
				url: item.artist.externalIds.spotify?.[0]
					? `https://open.spotify.com/artist/${item.artist.externalIds.spotify[0]}`
					: '#'
			}));
		} catch (error) {
			console.error('Error fetching top artists:', error);
		}
	}

	onMount(() => {
		updateTime();
		const timeInterval = setInterval(updateTime, 1000);

		fetchSpotify();
		const spotifyInterval = setInterval(fetchSpotify, 10000);

		fetchTopTracks();
		fetchTopArtists();

		return () => {
			clearInterval(timeInterval);
			clearInterval(spotifyInterval);
		};
	});

	console.log(dotColor, statusData, spotifyData);

	onMount(() => {
		const sliders = document.querySelectorAll('.tracks-slider');

		sliders.forEach((slider) => {
			let isDown = false;
			let startX = 0;
			let scrollLeft = 0;
			const htmlSlider = slider as HTMLElement;

			const startDrag = ((e: MouseEvent) => {
				isDown = true;
				slider.classList.add('active');
				startX = e.pageX - htmlSlider.offsetLeft;
				scrollLeft = htmlSlider.scrollLeft;
			}) as EventListener;

			const stopDrag = (() => {
				isDown = false;
				slider.classList.remove('active');
			}) as EventListener;

			const drag = ((e: MouseEvent) => {
				if (!isDown) return;
				e.preventDefault();
				const x = e.pageX - htmlSlider.offsetLeft;
				const walk = (x - startX) * 2; // Adjust scroll speed
				htmlSlider.scrollLeft = scrollLeft - walk;
			}) as EventListener;

			const handleWheel = ((e: WheelEvent) => {
				e.preventDefault();
				htmlSlider.scrollLeft += e.deltaY;
			}) as EventListener;

			slider.addEventListener('mousedown', startDrag);
			slider.addEventListener('mouseleave', stopDrag);
			slider.addEventListener('mouseup', stopDrag);
			slider.addEventListener('mousemove', drag);
			slider.addEventListener('wheel', handleWheel);

			const trackCards = slider.querySelectorAll('.track-card');
			trackCards.forEach((card) => {
				card.addEventListener('mousedown', startDrag);
				card.addEventListener('mousemove', drag);
				card.addEventListener('mouseup', stopDrag);
				card.addEventListener('mouseleave', stopDrag);
			});
		});
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<div
		class="container max-w-screen-sm border border-overlay2 p-18 relative bg-black/50 backdrop-blur-sm text-[#28282B]"
	>
		<div class="flex items-center justify-center pb-6">
			<!-- my logo, top left -->
			<div class="absolute top-2 left-6 flex items-center text-3xl group hover:text-[#dbdbde]">
				<a class="moonhouse text-[#a6a6ad] group-hover:text-[#dbdbde]" href="/">a</a>
				<a
					class="moonhouse group-hover:text-[#dbdbde]"
					href="/"
					style="margin-left: -4.5px; color: {dotColor};">.</a
				>
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
		</div>

		<div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]">
		  <!-- stats.fm songs stuff -->
		  <div class="container max-w-screen-sm border border-overlay2 p-2 text-[#28282B]">
			<div class="flex items-center justify-between mb-2">
				<div class="flex items-end gap-2">
					<span class="text-lg font-medium text-[#dbdbde] krypton">Top tracks</span>
					<span class="text-sm mb-2 font-medium text-[#54545c] krypton">(4 weeks)</span>
				</div>
			</div>
				<div class="tracks-slider">
					{#each topTracks as track}
						<a href={track.url} target="_blank" rel="noopener noreferrer" class="track-card">
							<div class="track-overlay-text">
								<p class="track-name krypton">{track.position}. {track.name}</p>
							</div>
							<div class="track-overlay"></div>
							<img src={track.imageUrl} alt={track.name} class="track-image" />
						</a>
					{/each}
				</div>
		  </div>

		  <!-- stats.fm artist stuff -->
		  <div class="container max-w-screen-sm border border-overlay2 p-2 mt-4 text-[#28282B]">
			<div class="flex items-center justify-between mb-2">
				<div class="flex items-end gap-2">
					<span class="text-lg font-medium text-[#dbdbde] krypton">Top artists</span>
					<span class="text-sm mb-2 font-medium text-[#54545c] krypton">(4 weeks)</span>
				</div>
			</div>
				<div class="tracks-slider">
					{#each topArtists as artistItem}
						<a href={artistItem.url} target="_blank" rel="noopener noreferrer" class="track-card">
							<div class="track-overlay-text">
								<p class="track-name krypton">{artistItem.artist.name}</p>
							</div>
							<div class="track-overlay"></div>
							<img src={artistItem.artist.image} alt={artistItem.artist.name} class="track-image" />
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.tracks-slider {
		display: flex;
		width: 100%;
		overflow-x: auto;
		gap: 1rem;
		padding: 0.5rem 0;
		scroll-behavior: smooth;
		scrollbar-width: none;
		-ms-overflow-style: none;
		cursor: grab;
	}

	.tracks-slider::-webkit-scrollbar {
		display: none;
	}

	.track-card {
		position: relative;
		display: flex;
		align-items: flex-end;
		min-width: 8rem;
		height: 8rem;
		overflow: hidden;
		padding: 0.5rem;
		transition: transform 0.3s;
		user-select: none;
	}

	.track-card:hover {
		transform: scale(1.05);
	}

	.track-overlay-text {
		position: relative;
		z-index: 20;
		width: 100%;
		transition: color 0.3s ease;
	}

	.track-card:hover .track-name {
		text-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
	}

	.track-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 10;
		transition: background-color 0.3s;
	}

	.track-card:hover .track-overlay {
		background-color: rgba(0, 0, 0, 0);
	}

	.track-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.track-name {
		width: 100%;
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(219, 219, 222, 0.8);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 1.2;
		transition: color 0.3s ease;
	}

	.tracks-slider {
		user-select: none;
		cursor: grab;
	}

	:global(.tracks-slider.active) {
		cursor: grabbing;
	}
</style>
