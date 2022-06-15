const textarea = document.querySelector('textarea')
const btn = document.querySelector('button')
const list = document.querySelector('ul')

const addNewNote = (newNote) => {
  const li = document.createElement('li')
  li.append(newNote)
  list.append(li)
}

btn.addEventListener('click', () => {
  const content = textarea.value
  console.log(content)

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "content": content
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  // const mySumAcyncData = (a) => new Promise((resolve, reject) => {
  //   //...
  //   resolve((b) => a + b)
  // })
  //
  // mySumAcyncData(5)
  //   .then((response) => response(6))
  //   .then((data) => console.log(data))

  fetch("http://localhost:7777/notes", requestOptions)
    .then(response => response.json())
    .then(result => {
      addNewNote(result.content)
    })
    .catch(error => console.log('error', error));

})

console.log('before DOMContentLoaded')

document.addEventListener('DOMContentLoaded', () => {

  const requestOptions = {
    method: 'GET'
  };

  fetch("http://localhost:7777/notes", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('inside fetch')
      result.forEach((item) => {
        addNewNote(item.content)
      })

    })
    .catch(error => console.log('error', error));


  console.log('outside fetch')
})

console.log('after DOMContentLoaded')