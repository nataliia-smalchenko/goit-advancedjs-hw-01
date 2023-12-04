import throttle from 'lodash.throttle';

const elements = {
  form: document.querySelector('.feedback-form'),
};

function getFormData(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

elements.form.addEventListener(
  'input',
  throttle(evt => {
    const form = evt.target.closest('.feedback-form');
    // console.log(data);
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify(getFormData(form))
    );
  }, 500)
);

elements.form.addEventListener('submit', evt => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const formData = getFormData(form);

  if (!formData.email && !formData.message) {
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
});

const savedState = JSON.parse(localStorage.getItem('feedback-form-state'));
if (savedState) {
  elements.form.elements.email.value = savedState.email;
  elements.form.elements.message.value = savedState.message;
}
