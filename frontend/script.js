const textarea = document.querySelector('textarea')
const btn = document.querySelector('button')
const list = document.querySelector('ul')

const getAllData = () => {
  list.innerHTML = ''
  const requestOptions = {
    method: 'GET'
  };

  fetch("http://localhost:7777/notes", requestOptions)
    .then(response => response.json())
    .then(result => {
      result.forEach((item) => {
        console.log(item.id)
        addNewNote(item.content, item.id)
      })

    })
    .catch(error => console.log('error', error));
}

const removeNote = (noteId) => {

  fetch("http://localhost:7777/notes/" + noteId, {method: 'DELETE'})
    .then(() => getAllData())
    .catch(error => console.log('error', error));
}

const addNewNote = (newNote, id) => {
  const li = document.createElement('li')
  li.addEventListener('click', () => removeNote(id))
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
      addNewNote(result.content, result.id)
    })
    .catch(error => console.log('error', error));

})

document.addEventListener('DOMContentLoaded', () => {
  getAllData()
})