/**
 * TuringOff Logo Visibility Enhancement
 * This script ensures logos are visible regardless of background color
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all TuringOff logos
  const logos = document.querySelectorAll('.turingoff-logo');
  
  // Function to detect if background is light or dark
  function isLightBackground(element) {
    // Get background color of parent element
    const parent = element.parentElement;
    const bgColor = window.getComputedStyle(parent).backgroundColor;
    
    // Parse RGB values
    const rgb = bgColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return false;
    
    // Calculate luminance using the formula: 0.299*R + 0.587*G + 0.114*B
    const luminance = (0.299 * parseInt(rgb[0]) + 0.587 * parseInt(rgb[1]) + 0.114 * parseInt(rgb[2])) / 255;
    
    // Consider light background if luminance > 0.5
    return luminance > 0.5;
  }
  
  // Apply appropriate styling based on background
  logos.forEach(logo => {
    if (isLightBackground(logo)) {
      logo.classList.add('light-background');
    } else {
      logo.classList.remove('light-background');
    }
  });
});
