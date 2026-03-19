// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Create wrapper for button positioning
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    // Insert wrapper and button
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    wrapper.appendChild(copyButton);
    
    // Copy functionality
    copyButton.addEventListener('click', function() {
      const code = codeBlock.textContent;
      navigator.clipboard.writeText(code).then(function() {
        // Visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(function() {
          copyButton.textContent = originalText;
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Could not copy code:', err);
        copyButton.textContent = 'Error!';
      });
    });
  });
});
