let allProjects = [];
let activeFilters = new Set();

document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
});

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  
  if (!grid) {
    return;
  }

  try {
    const response = await fetch('/assets/data/projects.xml');
    
    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const projects = xmlDoc.querySelectorAll('project');
    
    if (projects.length === 0) {
      console.warn('No projects found in XML');
      return;
    }
    
    allProjects = Array.from(projects).map(project => ({
      id: project.getAttribute('id'),
      slug: project.getAttribute('slug'),
      title: project.querySelector('title')?.textContent || '',
      summary: project.querySelector('summary')?.textContent || '',
      thumbnail: project.querySelector('thumbnail')?.textContent || '',
      tech: Array.from(project.querySelectorAll('tech')).map(t => t.textContent)
    }));
    
    setupFilters();
    renderProjects();
    
  } catch (error) {
    console.error('Error loading projects:', error);
    grid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
  }
}

function setupFilters() {
  const allTech = new Set();
  allProjects.forEach(project => {
    project.tech.forEach(tech => allTech.add(tech));
  });
  
  const filterContainer = document.getElementById('filter-chips');
  if (!filterContainer) return;
  
  filterContainer.innerHTML = '';
  
  Array.from(allTech).sort().forEach(tech => {
    const chipDiv = document.createElement('div');
    chipDiv.className = 'filter-chip';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `filter-${tech}`;
    checkbox.value = tech;
    checkbox.addEventListener('change', handleFilterChange);
    
    const label = document.createElement('label');
    label.htmlFor = `filter-${tech}`;
    label.textContent = tech;
    
    chipDiv.appendChild(checkbox);
    chipDiv.appendChild(label);
    filterContainer.appendChild(chipDiv);
  });
}

function handleFilterChange(e) {
  const tech = e.target.value;
  
  if (e.target.checked) {
    activeFilters.add(tech);
  } else {
    activeFilters.delete(tech);
  }
  
  renderProjects();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  const filteredProjects = activeFilters.size === 0 
    ? allProjects 
    : allProjects.filter(project => 
        project.tech.some(tech => activeFilters.has(tech))
      );
  
  if (filteredProjects.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No projects match the selected filters.</p>';
    return;
  }
  
  grid.innerHTML = '';
  
  filteredProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="tags">
        ${project.tech.map(tech => `<span class="tag">${tech}</span>`).join('')}
      </div>
      <a href="/projects/${project.slug}.html" class="cta-button">View Details</a>
    `;
    
    grid.appendChild(card);
  });
}
