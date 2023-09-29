const apiUrl = 'https://api.openai.com/v1/images/generations';
// Warning: please store your  API keys in .env file 
const openAIkey = "paste your own api key"


const form = document.querySelector('form');
const inputPrompt = form.querySelector('input');

const recents = document.querySelector('section.recents');
const recentsUl = recents.querySelector('ul');

const main = document.querySelector('main');

const recentImages = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  generateImage(inputPrompt.value);
});

function generateImage(prompt) {
  form.classList.add('disabled');
  main.style.display = 'block';
  main.innerHTML = `<p>Generate image for <span>${prompt}</span></p>`;
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAIkey}`,
    },
    body: JSON.stringify({
      model: 'image-alpha-001',
      prompt: prompt,
      num_images: 1,
      size: '512x512',
      response_format: 'url',
    }),
  })
    .then((response) => response.json())
    .then((data) => handleData(data.data[0].url, prompt))
    .catch((error) => handleError(error));
}

function handleData(image, prompt) {
  main.style.display = 'block';
  main.innerHTML = `
  <p>${prompt}</p>
  <img src="${image}" alt="Generated image of ${prompt}">`;
  inputPrompt.value = '';
  form.classList.remove('disabled');
  handleRecents(image, prompt);
}

function handleError(message) {
  main.style.display = 'block';
  main.innerHTML = `<p class="error">There is an error with your request. <span>${message}</span></p>`;
}

function handleRecents(image, prompt) {
  recents.style.display = 'block';
  recentsUl.innerHTML = '';
  recentImages.unshift({
    image: image,
    prompt: prompt,
  });
  recentImages.forEach(
    (recent) =>
      (recentsUl.innerHTML += `
        <li>
            <a href="${recent.image}" target="_blank" title="${recent.prompt}">
            <img src="${recent.image}" alt="Generated image for ${recent.prompt}">
            </a>
        </li>
        `)
  );
}
