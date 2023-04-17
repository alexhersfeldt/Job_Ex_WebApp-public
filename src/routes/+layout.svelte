<script lang="ts">
    import type { LayoutData } from './$types';
    
    // export let data: LayoutData;
</script>



<slot/>
<style>
    :global(html) {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        margin: 0px;
        padding: 0px;
        border: 0px;
    }
    :global(body) {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        margin: 0px;
        padding: 0px;
        border: 0px;
    }
    :global(button) {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    :global( #map) {
        position: absolute;
        border-radius: 20px;
        margin: 0px;
        border: 0px;
        width: 100%;
        height: 100%;
        left: 0px;
    }
    :global(.mapCon) {
        position: absolute;
        height: calc(100vh - 50px);
        box-sizing: border-box;
        width: 100%;
        top: 50px;
        left: 0px;
        border: #71a5de 5px solid;
    }
    :global(.mapOverlay) {
        z-index: 1000;
        position: absolute;
        border: solid #71a5de 3px;
        border-radius: 20px;
        width:fit-content;
        height: auto;
        top: 20px;
        background-color: rgba(218, 218, 218, 0.836) ;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    :global(.rightOverlay) {   
        right: 20px;   
    }
    :global(.leftOverlay) {   
        left: 20px;   
    }
    :global(.legendTitle) {
        margin: 0px;
        padding: 10px;
        height: 30px;
    }
    
</style>