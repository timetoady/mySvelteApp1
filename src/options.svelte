<script>
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
  } from "sveltestrap";
  import { giveCategories } from "./api";
  import { buildJsonFormData, getAllStorageInfo } from "./setLocal";
  let open = false;
  const toggle = () => (open = !open);
  const setOptions = () => {
    let form = document.querySelector("#optionForm");
    form.addEventListener("submit", (event) => event.preventDefault());
    const formData = buildJsonFormData(form);
    console.log("Form info", JSON.stringify(formData));
    localStorage.setItem("Settings", JSON.stringify(formData));
    console.log("Local storage says:", getAllStorageInfo());
    toggle();
  };
</script>

<div>
  <Button class="text-uppercase" color="primary">LET'S PLAY</Button>
  <Button
    class="text-uppercase"
    id="optionButton"
    color="secondary"
    on:click={toggle}>Options</Button
  >

  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Options</ModalHeader>
    <ModalBody>Select your game options below.</ModalBody>
    {#await giveCategories()}
      <div id="spinnerDiv">
        <Spinner color="primary" />
      </div>
    {:then category}
      <form data-toggle="tab" id="optionForm" action="">
          <div>
            <label for="numQuestions"># Questions (max 50):</label>
            <input type="number" name="numQuestions" id="numQuestions" min="1" max="50" value="10" />
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
  label{
      margin: .5rem 0 0 0;
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
