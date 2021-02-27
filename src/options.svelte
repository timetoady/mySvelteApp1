<script>
  //add option to set color? Or change to dark mode?
  //use bind:group on inputs?
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
  } from "sveltestrap";
  import tryCatch, { giveCategories } from "./api";
  import { getAllStorageInfo, setOptions } from "./setLocal";
  import formatQuestions from "./utilities";
  //import ErrorModal, {toggleError} from "./error.svelte"
  let open = false;
  let openGame = false;
  let errorOpen = false;
  let size;
  let questions;
  const toggleError = () => (errorOpen = !errorOpen);
  const toggle = () => (open = !open);
  const toggleGame = () => {
    size = 'lg';
    openGame = !openGame;
  }
  const confirmOptions = () => {
    let form = document.querySelector("#optionForm");
    setOptions(form);
    getQuestions()
    toggle();
  };

  export const getQuestions = async () => {
    const currentStorage = getAllStorageInfo();
    console.log(currentStorage);
    let {
      numQuestions,
      categorySelect,
      difficulty,
      questionType,
    } = currentStorage[0];
    categorySelect = `&category=${categorySelect}`;
    if (categorySelect === "&category=any") categorySelect = "";
    if (difficulty === "any") difficulty = "";
    if (questionType === "any") questionType = "";
    numQuestions = parseInt(numQuestions);
    let requestURL = `https://opentdb.com/api.php?amount=${numQuestions}${categorySelect}${difficulty}${questionType}&encode=url3986`;
    console.log("RequestURL", requestURL);
    let questions = await tryCatch(requestURL);
    if (questions.response_code === 1 || !questions.results.length) {
      console.log("Options too narrow, please broaden.");
      toggleError();
    } else {
      let formattedQuestions = formatQuestions(questions);
      console.log("Formated questions:", formattedQuestions);
      questions = formattedQuestions
      //here assign game objects?
      return formattedQuestions;
    }
  };

  
</script>

<div>
  <Button on:click={toggleGame} class="text-uppercase" color="primary">LET'S PLAY</Button>

  <Button
    class="text-uppercase"
    id="optionButton"
    color="secondary"
    on:click={toggle}>Options</Button
  >
  <div>
    <!-- ERROR MODAL HERE -->
    <Modal isOpen={errorOpen} {toggleError}>
      <ModalHeader style="color: red" {toggleError}>Error</ModalHeader>
      <ModalBody>
        Error: Options too narrow, not enough results returned. Please broaden
        your selections.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" on:click={toggleError}>OKAY</Button>
      </ModalFooter>
    </Modal>
  </div>
  <!-- <ErrorModal theError="Options too narrow, not enough results. Please broaden your selections."/> -->

  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Options</ModalHeader>
    <ModalBody>Select your game options below.</ModalBody>
    {#await giveCategories()}
      <div id="spinnerDiv">
        <Spinner color="primary" />
      </div>
    {:then category}
      <form
        on:submit|preventDefault
        data-toggle="tab"
        id="optionForm"
        action=""
      >
        <div>
          <label for="numQuestions"># Questions (max 50):</label>
          <input
            type="number"
            name="numQuestions"
            id="numQuestions"
            min="1"
            max="50"
            value="10"
          />
        </div>

        <label for="categorySelect">Category:</label>
        <select name="categorySelect" id="categorySelect">
          <option value="any">All Categories</option>
          {#each category as aCategory}
            <option value={aCategory[1]}>{aCategory[0]}</option>
          {/each}
        </select>
        <label for="difficulty">Difficulty</label>
        <select name="difficulty" id="difficulty">
          <option value="any">Any</option>
          <option value="&difficulty=easy">Easy</option>
          <option value="&difficulty=medium">Medium</option>
          <option value="&difficulty=hard">Hard</option>
        </select>
        <label for="questionType">Question types:</label>
        <select name="questionType" id="questionType">
          <option value="any">Any</option>
          <option value="&type=multiple">Multiple Choice</option>
          <option value="&type=boolean">True/False</option>
        </select>
      </form>
    {/await}

    <ModalFooter>
      <Button color="primary" on:click={confirmOptions}>Confirm</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>

<div>
  <!-- Game modal, maybe <Button color="danger" on:click={toggleGame}>Open Modal</Button> -->
  <Modal id="gameModal" isOpen={openGame} {toggleGame} {size}>
    {#if getAllStorageInfo()[0].difficulty === '&difficulty=medium' }
    <ModalHeader {toggleGame}>Quiz: Medium </ModalHeader>
    {:else if getAllStorageInfo()[0].difficulty === '&difficulty=hard'}
    <ModalHeader {toggleGame}>Quiz: Hard </ModalHeader>
    {:else if getAllStorageInfo()[0].difficulty === '&difficulty=easy'}
    <ModalHeader {toggleGame}>Quiz: Hard </ModalHeader>
    {:else}
    <ModalHeader {toggleGame}>Quiz: Any </ModalHeader>
    {/if}
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggleGame}>Do Something</Button>
      <Button color="secondary" on:click={toggleGame}>QUIT</Button>
    </ModalFooter>
  </Modal>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
  }
  input,
  select {
    border-radius: 3px;
    border: 2px black solid;
  }
  label {
    margin: 0.5rem 0 0 0;
  }

  input:focus,
  input:focus-visible,
  select:focus,
  select:focus-visible {
    outline: 2px #0400ffbd inset;
  }

  #spinnerDiv {
    margin: 0 auto;
    text-align: center;
  }
</style>
