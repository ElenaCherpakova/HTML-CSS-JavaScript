let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');

let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      render(myLeads)
  })
})

function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}


deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener('click', () => {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

inputEl.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  }
});
