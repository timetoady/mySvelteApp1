<script>
  //Next: trigger a modal forEach for each question, #if for type, have category in upper right
  //score in upper left next to name
  import { onMount } from 'svelte';
  import Options from "./options.svelte"
  import "bootstrap/dist/css/bootstrap.min.css";
  import { setDefaultOptions, getAllStorageInfo } from "./setLocal"
  import { yourName } from './stores.js';
  const defaultSettings = () => {
    const defaults = {"numQuestions":"10","categorySelect":"any","difficulty":"any","questionType":"any"}
    setDefaultOptions(defaults)
    getAllStorageInfo()
    
  }
  onMount(defaultSettings)
</script>

<main>
  <h1 class="title">Trivial Time</h1>
  <div class="wrapper">
    <h5 class="phrase">Care for a round of trivia?</h5>
    <input bind:value={ $yourName }
      class="nameInput"
      name="playerName"
      type="text"
      placeholder="Name"
      required
    />
    <div class="button1">
      <Options/>
    </div>
  </div>
</main>

<style>
  main {
    padding: 1rem;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    color: #0400ff;
    font-size: 4rem;
    font-weight: 100;
  }

  .wrapper {
    margin: 0 auto;
  }

  .button1{
	  margin-top: .2rem;
    
  }


  @media (min-width: 640px) {
    main {
      max-width: none;
    }
    .wrapper {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      max-width: 800px;
    }
    .phrase{
      font-size: 2rem;
    }
  }
</style>
