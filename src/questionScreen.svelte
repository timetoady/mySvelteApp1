<script >
    //here will be the format for each question as it is called
    //Has name in upper right. If they don't put a name, punish them by random picking between Lazy, No Namer, etc
    //needs question options organized by type, i.e. if type "multiple" comes in, picks layout
    //needs quit
    //needs final answer button
    //needs to show category in the upper right for each question
    import {
      Button,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader
    } from 'sveltestrap';
    let open = false;
    const toggle = () => (open = !open);
  </script>
  
  <div>
    <Button color="danger" on:click={toggle}>Open Modal</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" on:click={toggle}>Do Something</Button>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>