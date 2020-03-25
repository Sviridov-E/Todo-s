function verticalDragging(source, clickTarget, handler){
  const heightElement = source.offsetHeight;
  source.addEventListener('mousedown', event => {
    if(event.target.closest(clickTarget) !== source.querySelectorAll(clickTarget)[0]) return;
    source.classList.add('noneTransition');
    function whenMove(event){
      clickOffset = event.pageY - clickCoord;
      source.style.transform = `translateY(${clickOffset}px)`;
    }
    function whenUp(event){
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

export default verticalDragging;