export function handleSubmit(event) {
  alert('hei')
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value

  console.log("::: Form Submitted :::")

}

document.getElementById('submit-btn').addEventListener('click', () => {
  event.preventDefault();
  fetch('http://localhost:8081/getForcast')
    .then(res => res.json())
    .then(function (res) {
      alert(res.message)
    })
  
})
