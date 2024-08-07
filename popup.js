
const _url = 'https://open-favs.vercel.app'
const sessionAuthUrl = _url + '/api/v2/auth/signin'
const YOUR_TOKEN = '89773db3-7863-460c-ad3c-6abd0db43f1c'
const API_URL = 'https://vnavarra.nuvolaris.dev/api/my/openfavs/assistant?name=enzo'

let user_id = null

document.querySelector('#saveButton').addEventListener('click', () => { 
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]
    const url = activeTab.url
    

    /* @@@ check auth @@@ */

    chrome.cookies.getAll({ url: _url }, function (cookies) {
      console.log('into cookies fn')
      let isAuthenticated = false
      for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].name === 'sb-access-token') {
          isAuthenticated = true
          break;
        }
      }
      if (isAuthenticated) {

        /* @@ testing  AI backend @@ */

        var url = API_URL
        let bearer = 'Bearer ' + YOUR_TOKEN

        const response = fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Errore nella richiesta');
            }
            return response.json()// o response.text() se ti aspetti un testo
          })
          .then(data => {
            // Mostra il risultato in un alert
            alert(JSON.stringify(data.body)) // Usa JSON.stringify per convertire l'oggetto JSON in stringa
          })
          .catch(error => {
            // Gestisci eventuali errori
            alert('Errore: ' + error.message)
          })


        /* @@ get session info @@ */
        fetch(sessionAuthUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            user_id = data.session.user.id
            console.log('Success:', user_id)
            alert(`Authenticated as user: ${user_id}`)
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Failed to get user info')
          })
      } else {
        //alert('Not authenticated')
        document.body.innerHTML = `
          <h3>Save Current Site</h3>
          <p>You need to be authenticated to use OpenFavs.</p>
          <button id="loginButton">Login</button>
        `
        document.querySelector('#loginButton').addEventListener('click', () => {
          window.open('https://open-favs.vercel.app/login/signin', '_blank')
        })
      }
    })
  })
})

// Esegui una richiesta fetch al tuo endpoint
/*
const apiUrl = `https://bookmarks-list.netlify.app/api/v1/test`
  fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert(data.message)
  })
    .catch((error) => {
      console.error('Error:', error)
      alert('Failed to fetch data.')
    })*/