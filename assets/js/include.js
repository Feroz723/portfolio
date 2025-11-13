document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadComponents();
  } finally {
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
  }
});

async function loadComponents() {
  await Promise.all([
    loadComponent('header', '/components/header.html'),
    loadComponent('footer', '/components/footer.html')
  ]);
}

async function loadComponent(id, url) {
  const element = document.getElementById(id);
  
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return;
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    
    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${id}:`, error);
    element.innerHTML = `<p style="color: red;">Failed to load ${id} component</p>`;
  }
}
