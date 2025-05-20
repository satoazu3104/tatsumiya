import '../scss/admin.scss';
setTimeout(() => {
  const warningButton = document.querySelectorAll('.block-editor-warning__action .components-button');
  console.log(warningButton);
  if(warningButton) {
    warningButton.forEach(button => {
      button.click();
    });
  }
}, 1000);