document.querySelector('#saveButton').addEventListener('click', async () => {
  console.log('hello from estension')
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]
    const url = activeTab.url

    if (activeTab?.url) {
    try {
      let url = new URL(activeTab.url)
      console.log(url.hostname)
      let cookies = getCookies(url.hostname)
      alertCookies(cookies)
    } catch (error) {
      console.error('Error fetching cookies:', error)
      alert('Error fetching cookies')
    }
  }
  /* test api connection */

  console.log('Fetching data for URL:', url)
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
      console.error('Error:', error);
      alert('Failed to fetch data.');
    })
  }) 
})

function getCookies(domain) {
    console.log('hello from function getCookies')
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll({ domain }, (cookies) => {
        if (chrome.runtime.lastError) {
          console.log('cookies not founded')
          reject(chrome.runtime.lastError)
        } else {
          console.log('cookies founded')
          resolve(cookies)
        }
      })
    })
}

function alertCookies(cookies) {
  if (cookies.length === 0) {
    alert('No cookies found')
    return
  }

  let cookieDetails = cookies.map(cookie => {
    return `Name: ${cookie.name}\nValue: ${cookie.value}\nDomain: ${cookie.domain}\nPath: ${cookie.path}\nSecure: ${cookie.secure}\nHttpOnly: ${cookie.httpOnly}\nSameSite: ${cookie.sameSite}\nExpirationDate: ${cookie.expirationDate}\n`;
  }).join('\n\n');

  alert(`Cookies found:\n\n${cookieDetails}`)
}

    







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


