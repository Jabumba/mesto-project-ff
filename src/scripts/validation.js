const disableSubmitButton = (button, config) => {
    button.disabled = true;
    button.classList.add(config);
};

const showInputError = (formElement, inputElement, errorMessage, obj) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
};
  
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
};
    
const isValid = (formElement, inputElement, obj) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
              inputElement.setCustomValidity("");
    };
  
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    };
};
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
        return !inputElement.validity.valid;
    });
};
  
const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, obj.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(obj.inactiveButtonClass);
    };
};

const clearValidation = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, obj);
    });

    disableSubmitButton(buttonElement, obj.inactiveButtonClass);
};
  
const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, obj);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj)
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};
  
const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, obj);
    });
};

export { enableValidation, clearValidation }