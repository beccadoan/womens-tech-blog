

async function mailInfo(event) {
    event.preventDefault();

    const username = document.querySelector('#users-name').value.trim();
    const email = document.querySelector('#users-email').value.trim();
    const message = document.querySelector('#users-message').value.trim();
    const response = await fetch('/api/users/contact', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        message
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
    } else {
      alert(response.statusText);
    }
  }

document.querySelector('.contact-us').addEventListener('submit', mailInfo);
