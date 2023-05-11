<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<!-- <div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <title></title>
</div> -->
    <slot></slot>
<!-- 
<style>
    .title {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #71a5de;
        /* border-radius: 15px; */
        /* margin: 10px; */
    } 
    .title img {
        height: 80px;
    }
    .title h1 {
        font-size: 2.5rem;
        color: white;
    }
</style> -->
