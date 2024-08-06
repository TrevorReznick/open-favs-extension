document.querySelector('#saveButton').addEventListener('click', () => { 
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]
    const url = activeTab.url
    const _url = `https://bookmarks-list.netlify.app`

    //console.log('Fetching data for URL:', url)

    /* @@@ check auth @@@ */

    chrome.cookies.getAll({ url: _url }, function (cookies) {
      console.log('into coockies fn')
      let isAuthenticated = false
      for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].name === 'sb-access-token') {
          isAuthenticated = true
          break
        }
      }
      if (isAuthenticated) {
        alert('autenticated')
      } else {
        alert('not autenticated')
      }
    })


    /* @@@ fetch data @@@ */
    const apiUrl = `https://bookmarks-list.netlify.app/api/v1/test`
    const sessionAuthUrl = 'https://open-favs.vercel.app/api/v2/auth/signin'


    // Esegui una richiesta fetch al tuo endpoint
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
      })
    
    fetch(sessionAuthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data.session.user.id);
        alert(data.session.user.id)
      })
      .catch((error) => {
        console.error('Error:', error)
        alert('Failed to fetch data.')
      })


  })
})