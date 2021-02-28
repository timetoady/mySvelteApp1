<script>
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
  } from "sveltestrap";
  //import { fly, fade } from "svelte/transition";
  import tryCatch, { giveCategories } from "./api";
  import { getAllStorageInfo, setOptions } from "./setLocal";
  import formatQuestions from "./utilities";
  import { yourName, currentQuestions } from "./stores";
  let open = false;
  let openGame = false;
  let errorOpen = false;
  let size;
  let questionNum = 0;
  let score = 0;
  const tryAgain = async () => {
    await getQuestions();
    questionNum = 0;
  };
  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };
  const rightAnswer = () => {
    alert("You are correct!");
    questionNum += 1;
    score += 1;
  };
  const wrongAnswer = () => {
    alert("Nope, sorry.");
    questionNum += 1;
  };
  function flipCoin() {
    return Math.floor(Math.random() * 2 + 1);
  }
  const toggleError = () => (errorOpen = !errorOpen);
  const toggle = () => (open = !open);
  $: toggleGame = () => {
    size = "lg";
    openGame = !openGame;
  };
  const confirmOptions = () => {
    let form = document.querySelector("#optionForm");
    setOptions(form);
    getQuestions();
    toggle();
  };
  const randomNamePicker = () => {
    const nameList = [
      "Lazy",
      "Rebel",
      "Nameless",
      "Fast Clicker",
      "Quickdraw",
      "Shooter McGavin",
      "Nobody",
    ];
    const lazyName = nameList[Math.floor(Math.random() * nameList.length)];
    return lazyName;
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
      questions = formattedQuestions;
      $currentQuestions = formattedQuestions;
      return formattedQuestions;
    }
  };

  const endGame = () => {
    toggleGame();
    getQuestions();
    score = 0;
    questionNum = 0;
  };
</script>

<div>
  <Button on:click={toggleGame} class="text-uppercase" color="primary"
    >LET'S PLAY</Button
  >

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
    {#if getAllStorageInfo()[0].difficulty === "&difficulty=medium"}
      <ModalHeader {toggleGame}>Quiz: Medium</ModalHeader>
    {:else if getAllStorageInfo()[0].difficulty === "&difficulty=hard"}
      <ModalHeader {toggleGame}>Quiz: Hard</ModalHeader>
    {:else if getAllStorageInfo()[0].difficulty === "&difficulty=easy"}
      <ModalHeader {toggleGame}>Quiz: Easy</ModalHeader>
    {:else}
      <ModalHeader {toggleGame}>Quiz: Any Difficulty</ModalHeader>
    {/if}
    {#key questionNum}
      {console.log(questionNum, currentQuestions.length)}
      <ModalBody>
        {#await $currentQuestions}
          <Spinner /> Loading...
        {:then questions}
          {#each questions as question, index (question.question)}
            {#if questionNum == index}
              <div>
                {#if questionNum === 0}
                  <div>
                    <h6>
                      Okay, {$yourName === "Put your name here" ||
                      $yourName === "".trim()
                        ? ($yourName = randomNamePicker())
                        : ($yourName = $yourName)}, let's Quiz!
                    </h6>
                  </div>
                {/if}
                {#if questionNum !== 0}
                  <div class="scoreboard">
                    <h6>
                      {$yourName === "Put your name here" ||
                      $yourName === "".trim()
                        ? ($yourName = randomNamePicker())
                        : ($yourName = $yourName)}'s Score: {score}
                    </h6>
                    <p>Category: {question.category}</p>
                  </div>
                {/if}
                {#if questionNum === 0}<p>Category: {question.category}</p>{/if}
                <p>Question {index + 1}: {question.question}</p>
                {#if question.type === "boolean"}
                  {#if flipCoin() === 1}
                    <div>
                      <label>
                        <input on:click={wrongAnswer} type="radio" />
                        {question.incorrectAnswer}
                      </label>
                    </div>
                    <div>
                      <label>
                        <input on:click={rightAnswer} type="radio" />
                        {question.correctAnswer}
                      </label>
                    </div>
                  {:else}
                    <div>
                      <label>
                        <input on:click={rightAnswer} type="radio" />
                        {question.correctAnswer}
                      </label>
                    </div>
                    <div>
                      <label>
                        <input on:click={wrongAnswer} type="radio" />
                        {question.incorrectAnswer}
                      </label>
                    </div>
                  {/if}
                {:else if question.type === "multiple"}
                  {#each shuffle(question.answers) as theAnswers}
                    <div>
                      <label>
                        <input
                          type="radio"
                          on:click|preventDefault={theAnswers.correct
                            ? rightAnswer
                            : wrongAnswer}
                        />
                        {theAnswers.answer}
                      </label>
                    </div>
                  {/each}
                {/if}
              </div>
            {/if}
            {#if questionNum == currentQuestions.length + 1}
              <p>End of quiz.</p>
              <p>{yourName}{score}</p>
            {/if}
          {/each}
        {:catch error}
          <p>Something went wrong: {error.message}</p>
        {/await}
      </ModalBody>
      <ModalFooter>
        {#if questionNum === 0}
          <Button color="secondary" on:click={endGame}>CANCEL</Button>
        {:else if questionNum == currentQuestions.length + 1}
          <Button color="primary" on:click={tryAgain}>TRY AGAIN</Button>
          <Button color="danger" on:click={endGame}>QUIT</Button>
        {:else}
          <Button color="danger" on:click={endGame}>QUIT</Button>
        {/if}
      </ModalFooter>
    {/key}
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

  .scoreboard {
    display: flex;
    justify-content: space-between;
  }
</style>
