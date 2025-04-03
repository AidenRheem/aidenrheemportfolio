<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Client-side only component
  let SvaderComponent;
  
  onMount(async () => {
    // Import svader dynamically only on the client side
    if (browser) {
      const module = await import('svader');
      SvaderComponent = module.default;
    }
  });
  
  // ShaderToy fragment shader
  const fragmentShader = `
    #define POST_STEPS 5.
    // https://www.shadertoy.com/view/XdGfRR
    vec2 hash22(vec2 p)
    {
      uvec2 q = uvec2(ivec2(p))*uvec2(1597334673U, 3812015801U);
      q = (q.x ^ q.y) * uvec2(1597334673U, 3812015801U);
      return vec2(q) * 2.328306437080797e-10;
    }
    
    vec3 posterize(vec3 col) { return floor(col*POST_STEPS)/POST_STEPS; }
    float luma(vec3 col) { return dot(col, vec3(.299,.584,.119)); }
    
    mat3 saturation(float s)
    {
      float s_1 = 1. - s;
      vec3 l = vec3(.299,.584,.119);
      vec3 s_r = vec3(l.x*s_1)+vec3(s,0,0);
      vec3 s_g = vec3(l.y*s_1)+vec3(0,s,0);
      vec3 s_b = vec3(l.z*s_1)+vec3(0,0,s);
      
      return mat3(s_r,s_g,s_b);
    }
    
    vec2 uv_offset(vec2 p)
    {
      vec2 pg = floor(p);
      vec2 pc = fract(p);
      
      return mix(
          mix(hash22(pg+vec2(0,0)),hash22(pg+vec2(1,0)),pc.x),
          mix(hash22(pg+vec2(0,1)),hash22(pg+vec2(1,1)),pc.x),
      pc.y)*2.-1.;
    }
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = fragCoord/iResolution.xy;
        vec2 scaler = vec2(8.);
        vec2 uv2 = uv+uv_offset((uv+floor(iTime*.45*scaler))*8.)*.01;
        
        // Since we don't have the texture, we'll generate a gradient as a placeholder
        vec3 texColor = vec3(uv.x, uv.y, (uv.x + uv.y) * 0.5);
        
        vec3 col = posterize(texColor)*saturation(2.);
        //col *= vec3(1., .7, .65);
        
        fragColor = vec4(col,1.0);
    }
  `;
</script>

<div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
  {#if browser && SvaderComponent}
    <svelte:component this={SvaderComponent} 
      {fragmentShader}
      mode="shadertoy"
      style="width: 100%; height: 100%; display: block;" 
    />
  {/if}
</div>