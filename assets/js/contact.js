document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});

function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formMessage = document.getElementById('form-message');
  
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();
  
  formMessage.className = 'form-message';
  formMessage.style.display = 'none';
  
  if (!name || !email || !message) {
    showMessage('error', 'Please fill in all required fields.');
    return;
  }
  
  if (!isValidEmail(email)) {
    showMessage('error', 'Please enter a valid email address.');
    return;
  }
  
  if (message.length < 10) {
    showMessage('error', 'Message must be at least 10 characters long.');
    return;
  }
  
  showMessage('success', 'Message sent successfully! Thank you for reaching out. I will get back to you soon.');
  
  form.reset();
  
  console.log('Form data:', { name, email, message });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(type, text) {
  const formMessage = document.getElementById('form-message');
  formMessage.className = `form-message ${type}`;
  formMessage.textContent = text;
  formMessage.style.display = 'block';
  
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
