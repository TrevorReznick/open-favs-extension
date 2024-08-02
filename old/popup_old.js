/*
document.getElementById('saveButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const url = activeTab.url;

    console.log('Saving URL:', url);

    // Esegui una richiesta fetch al tuo endpoint per salvare l'URL
    fetch('https://your-backend-api.com/add-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('URL saved successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to save URL.');
    });
  });
});
*/
document.getElementById('saveButton').addEventListener('click', () => { 
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]
    const url = activeTab.url

    console.log('Fetching data for URL:', url)

    // Costruisci l'URL per il tuo endpoint con i parametri appropriati
    //const apiUrl = `http://localhost:4321/api/v1/test`;
    const apiUrl = `https://bookmarks-list.netlify.app//api/v1/test`
    // Esegui una richiesta fetch al tuo endpoint
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      alert(data.message)
      alert (url)
      chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
        alert('im here')
        alert('Cookies:', cookies)
          // Puoi anche salvare le informazioni dei cookies in chrome.storage
          /*
          chrome.storage.local.set({ sessionCookies: cookies }, () => {
            alert('Session cookies saved.')
          })
          */
        })
        alert('end of invoke')
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to fetch data.');
    });
  });
})




