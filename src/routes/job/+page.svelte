<script lang='ts'>
    import { page } from '$app/stores';

</script>

<div class="background">
</div>
<div class="textWrappper">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" width="300">
    <h1>Job Webapp</h1>
    <div id="links">
        <div id="internalPages">
            <button class="btn" on:click={() => { window.location.href = '/job/dashboard' }}>Dashboard</button>
            <form action="/logout" method="POST">
                <button class="btn" type="submit">Logout</button>
            </form>
        </div>
    </div>
</div>


<style>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        background-image: url('https://dataforsyningen.dk/asset/Images/SDFE_Hero_V3.jpg');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        z-index: -10;
    }
    .textWrappper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: large;
        border-radius: 15px;
        width: 60%;
    }
    button, .btn {
        background-color: #71a5de;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        font-size: large;
        width: 80%;
    }
    #links {
        display: flex;
        justify-content: space-around;
    }
    #internalPages {
        width: 50%;
    }
    #externalPages {
        width: 50%;
    }
    
</style>