<script lang="ts">
  import { onMount } from 'svelte';
  import type { LedMatrixConfig } from '@fabwaseem/easy-led-matrix';
  import "../app.css";

  let { children } = $props();
  let container: HTMLDivElement;
  let matrix;
  let LedMatrix;
  let config: LedMatrixConfig = {
    size: 12,
    color: '#161819',
    amount: 1000,
    gap: 2,
    litColor: '#28282B',
    fps: 24,
    noise: 0.005,
    background: '#000000',
  };

  onMount(async () => {
    const mod = await import('@fabwaseem/easy-led-matrix');
    LedMatrix = mod.LedMatrix;
    matrix = new LedMatrix(container, config);
    matrix.init();
  });
</script>

<div class="relative min-h-screen">
  <div bind:this={container} class="absolute inset-0 w-full h-full z-0"></div>
  
  <div class="min-h-screen relative z-10">
    {@render children()}
  </div>
</div>