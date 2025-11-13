document.addEventListener('DOMContentLoaded', async () => {
  await loadSkills();
});

async function loadSkills() {
  const container = document.getElementById('skills-container');
  
  if (!container) {
    return;
  }

  try {
    const response = await fetch('/assets/data/skills.xml');
    
    if (!response.ok) {
      throw new Error(`Failed to load skills: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const categories = xmlDoc.querySelectorAll('category');
    
    if (categories.length === 0) {
      console.warn('No skill categories found in XML');
      return;
    }
    
    container.innerHTML = '';
    
    categories.forEach(category => {
      const categoryName = category.getAttribute('name');
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';
      
      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = categoryName;
      categoryDiv.appendChild(categoryTitle);
      
      const skills = category.querySelectorAll('skill');
      
      skills.forEach(skill => {
        const skillName = skill.getAttribute('name');
        const skillLevel = parseInt(skill.getAttribute('level'));
        
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        const skillLabel = document.createElement('div');
        skillLabel.className = 'skill-label';
        skillLabel.innerHTML = `<span>${skillName}</span><span>${skillLevel}%</span>`;
        
        const progressBar = document.createElement('progress');
        progressBar.max = 100;
        progressBar.value = skillLevel;
        progressBar.setAttribute('aria-label', `${skillName} skill level ${skillLevel}%`);
        
        skillItem.appendChild(skillLabel);
        skillItem.appendChild(progressBar);
        categoryDiv.appendChild(skillItem);
      });
      
      container.appendChild(categoryDiv);
    });
    
    container.style.display = 'block';
    
    const fallback = document.getElementById('skills-fallback');
    if (fallback) {
      fallback.style.display = 'none';
    }
    
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}
