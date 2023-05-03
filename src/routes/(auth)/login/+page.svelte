<script lang="ts">
    import type { ActionData } from './$types'
  
    export let form: ActionData
  </script>
  
  <div class="background"/>

  <div class="textWrappper">
  
    <h1 class="legendTitle">Login</h1>
  <br>
  <div id="loginWrapper">
    <form action="?/login" method="POST">
    <div class="form">
      <label for="username">Username</label>
      <input class="textField" id="username" name="username" type="text" required />
    </div>
  
    <div class="form">
      <label for="password">Password</label>
      <input class="textField" id="password" name="password" type="password" required />
    </div>
  
    {#if form?.invalid}
      <p class="error">Username and password is required.</p>
    {/if}
  
    {#if form?.credentials}
      <p class="error">You have entered the wrong credentials.</p>
    {/if}
  
    <button class="btn" type="submit">Log in</button>
  </form>
    
  </div>

  </div>

  
  

  <style>
    #loginWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
    }
    label {
      text-align: center;
    }
    input, label, form {
      display: flex;
      flex-direction: column;
      align-items: center;
  
    }

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
        width: auto;
        padding: 20px;
    }
    </style>