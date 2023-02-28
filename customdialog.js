export function customDialog() {
    const Dialog = document.getElementById('Dialog');
    let outputTag = document.getElementById('outputDialog');

    const alertButton = document.getElementById('alertButton');

    alertButton.addEventListener('click', alert);

    function alert() {
        Dialog.innerHTML = `
        <h1> Alert was pressed! </h1>
        <button id="okButton">OK</button>
        `;
        Dialog.showModal();

        let okBtn = document.getElementById('okButton');

        okBtn.addEventListener('click', () => {
            Dialog.close();
        });
    }

    const confirmButton = document.getElementById('confirmButton');

    confirmButton.addEventListener('click', confirm);
    function confirm() {
        Dialog.innerHTML = `
    <h1>Are you confirming?</h1>
    <button id="yesButton" value="true">Yes</button>
    <button id="noButton" value="false">No</button>
    `;
        Dialog.showModal();

        const yesButton = document.getElementById('yesButton');
        const noButton = document.getElementById('noButton');

        yesButton.addEventListener('click', () => {
            outputTag.textContent = `Confirm result: ${yesButton.value}`;
            Dialog.close();
        });

        noButton.addEventListener('click', () => {
            outputTag.textContent = `Confirm result: ${noButton.value}`;
            Dialog.close();
        });
    }

    const promptButton = document.getElementById('promptButton');
    promptButton.addEventListener('click', prompt);
    function prompt() {
        Dialog.innerHTML = `
      <h1>What is your name?</h1>
      <input type="text" id="inputName">
      <button id="okButton" value="ok">OK</button>
      <button id="cancelButton" value="User cancelled the prompt">Cancel</button>
    `;
        Dialog.showModal();

        let okButton = document.getElementById('okButton');
        const cancelButton = document.getElementById('cancelButton');
        const inputName = document.getElementById('inputName');

        okButton.addEventListener('click', () => {
            if (inputName.value === '' || inputName == null) {
                inputName.value = 'User didn\'t enter anything';
            }
            outputTag.innerHTML = DOMPurify.sanitize(`Prompt result: ${inputName.value}`);
            Dialog.close();
        });

        cancelButton.addEventListener('click', () => {
            outputTag.innerHTML = `Prompt result: ${cancelButton.value}`;
            Dialog.close();
        });
    }

    const safer_promptButton = document.getElementById('safer-promptButton');
    safer_promptButton.addEventListener('click', saferPrompt);
    function saferPrompt() {
        Dialog.innerHTML = `
      <h1>What is your name?</h1>
      <input type="text" id="inputName">
      <button id="okButton" value="ok">OK</button>
      <button id="cancelButton" value="User cancelled the prompt">Cancel</button>
    `;
        Dialog.showModal();

        let okButton = document.getElementById('okButton');
        const cancelButton = document.getElementById('cancelButton');
        let inputName = document.getElementById('inputName');

        okButton.addEventListener('click', () => {
            if (inputName.value === '' || inputName == null) {
                inputName.value = 'User didn\'t enter anything';
            }
            inputName.value = DOMPurify.sanitize(inputName.value)
            outputTag.innerHTML = `Prompt result: ${inputName.value}`;
            Dialog.close();
        });

        cancelButton.addEventListener('click', () => {
            outputTag.textContent = `Prompt result: ${cancelButton.value}`;
            Dialog.close();
        });
    }

}
