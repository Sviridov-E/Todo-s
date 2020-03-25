function verticalDragging(source, clickTarget, handler, isMobile = false){
  const heightElement = source.offsetHeight;
  if(!isMobile){
    source.addEventListener('mousedown', event => {
      if(event.target.closest(clickTarget) !== source.querySelectorAll(clickTarget)[0]) return;
      source.classList.add('noneTransition');
      function whenMove(event){
        clickOffset = event.pageY - clickCoord;
        source.style.transform = `translateY(${clickOffset}px)`;
      }
      function whenUp(){
        document.removeEventListener('mousemove', whenMove);
        elementOffset = clickOffset/heightElement >= 0 ? Math.floor(clickOffset/heightElement) : Math.ceil(clickOffset/heightElement);
        source.style.transform = null;
        source.classList.remove('noneTransition');
        handler(+source.id, elementOffset);
        document.removeEventListener('mouseup', whenUp);
      }
      const clickCoord = event.pageY;
      let clickOffset = null,
          elementOffset = null;
      document.addEventListener('mousemove', whenMove);
      document.addEventListener('mouseup', whenUp);
    })
  }
  else {
    source.addEventListener('touchstart', event => {
      if(event.touches[0].target.closest(clickTarget) !== source.querySelectorAll(clickTarget)[0]) {alert('!');return;};
      source.classList.add('noneTransition');
      function whenMove(event){
        clickOffset = event.touches[0].pageY - clickCoord;
        source.style.transform = `translateY(${clickOffset}px)`;
      }
      function whenUp(){
        document.removeEventListener('touchmove', whenMove);
        elementOffset = clickOffset/heightElement >= 0 ? Math.floor(clickOffset/heightElement) : Math.ceil(clickOffset/heightElement);
        source.style.transform = null;
        source.classList.remove('noneTransition');
        handler(+source.id, elementOffset);
        document.removeEventListener('touchend', whenUp);
      }
      const clickCoord = event.touches[0].pageY;
      let clickOffset = null,
          elementOffset = null;
      document.addEventListener('touchmove', whenMove);
      document.addEventListener('touchend', whenUp);
    })
  }
}

export default verticalDragging;