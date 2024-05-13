document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const successRadio = document.getElementById('success');
    const errorRadio = document.getElementById('error');
    const messageContent = document.getElementById('message-content');
    const durationInput = document.getElementById('duration');
    const cancelableCheckbox = document.getElementById('cancelable');
    const toastsContainer = document.getElementById('toasts');

    addButton.addEventListener('click', function() {
        const type = successRadio.checked ? 'success' : 'error';
        const message = messageContent.value.trim() || (type === 'success' ? 'Success!' : 'Error.');
        const duration = parseInt(durationInput.value);
        const cancelable = cancelableCheckbox.checked;

        const toast = document.createElement('div');
        toast.classList.add('toast', type + '-toast');

        const messageParagraph = document.createElement('p');
        messageParagraph.classList.add('message');
        messageParagraph.textContent = message;
        toast.appendChild(messageParagraph);

        if (cancelable) {
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('cancel-button');
            cancelButton.textContent = 'X';
            cancelButton.addEventListener('click', function() {
                toastsContainer.removeChild(toast);
            });
            toast.appendChild(cancelButton);
        }

        toastsContainer.prepend(toast);

        if (!isNaN(duration) && duration >= 500) {
            setTimeout(function() {
                toastsContainer.removeChild(toast);
            }, duration);
        }
    });

    clearButton.addEventListener('click', function() {
        while (toastsContainer.firstChild) {
            toastsContainer.removeChild(toastsContainer.firstChild);
        }
    });
});
