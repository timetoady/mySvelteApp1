<script>
  import Options from "./options.svelte"
  import "bootstrap/dist/css/bootstrap.min.css";
  import { setOptions } from "./setLocal"

  //export let name;

  let name = "";
  const defaulSettings = () => {
    const defaults = {"numQuestions":"10","categorySelect":"any","difficulty":"any","questionType":"any"}
    setOptions("Settings", defaults)
    
  }
</script>

<main>
  <h1 on:load={defaulSettings}>Trivia Time</h1>
  <div class="wrapper">
    <h2>Care for a round of trivia?</h2>
    <input bind:value={name}
      class="nameInput"
      name="playerName"
      type="text"
      placeholder="Your name here"
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
  }
</style>
