<script>
  //have to set default options on load
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
  import { buildJsonFormData, getAllStorageInfo } from "./setLocal";
  //import ErrorModal, {toggleError} from "./error.svelte"
  let open = false;
 
  let errorOpen = false;
  const toggleError = () => (errorOpen = !errorOpen);
  const toggle = () => (open = !open);
  const setOptions = () => {
    let form = document.querySelector("#optionForm");
    const formData = buildJsonFormData(form);
    console.log("Form info", JSON.stringify(formData));
    localStorage.setItem("Settings", JSON.stringify(formData));
    console.log("Local storage says:", getAllStorageInfo());
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
    }
    console.log(questions.results);
  };
</script>

<div>
  <Button on:click={getQuestions} class="text-uppercase" color="primary"
    >LET'S PLAY</Button
  >

  <Button
    class="text-uppercase"
    id="optionButton"
    color="secondary"
    on:click={toggle}>Options</Button
  >
  <div>
    <Modal isOpen={errorOpen} {toggleError}>
      <ModalHeader style="color: red" {toggleError}>Error</ModalHeader>
      <ModalBody>
        Error: Options too narrow, not enough results returned. Please broaden your selections.
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
      <Button color="primary" on:click={setOptions}>Confirm</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
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
