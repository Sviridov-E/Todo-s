function horizontalDragging(element, handlerRemove){
  element.addEventListener('touchstart', event => {
    console.log('click!');
    function whenMove(event){
      touchOffset = event.touches[0].pageX - touchCoord;
      element.style.transform = `translateX(${touchOffset}px)`;
    }
    const touchCoord = event.touches[0].pageX,
          criticalPoint = element.offsetWidth/2;
    let   touchOffset = null;
    element.addEventListener('touchmove', whenMove);
    element.addEventListener('touchend', () => {
      element.removeEventListener('touchmove', whenMove);
      const touchOffsetModule = touchOffset >= 0 ? touchOffset : -touchOffset;
      if(touchOffsetModule > criticalPoint) handlerRemove();
      element.style.transform = 'inherit';
    })
  })
}
export default horizontalDragging;