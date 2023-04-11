<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>



<slot/>
<style>
    :global(html) {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    :global(button) {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    
    }
    
</style>