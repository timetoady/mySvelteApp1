<script>
  import tryCatch from "./api";
  export let name;

  //tryCatch("https://opentdb.com/api.php?amount=10", "&category=10")
</script>

<main>
  <h1>Trivia Time</h1>
  <div class="wrapper">
    <h2>Care for a round of trivia?</h2>
    <input
      class="nameInput"
      name="playerName"
      type="text"
      placeholder="Your name here"
      required
    />
    <button>LET'S PLAY</button>
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
  button {
    color: white;
    background-color: #0400ff;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 800px;
    }
  }
</style>
