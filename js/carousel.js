const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right') ;
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);


const slideWidth = slides[0].getBoundingClientRect().width;
// const withSlide = slideSize.width; [if you have a separate varaibel /// slideSize=slides[0].getBoundingClientRect()]

//Arrange the slides to be next to one another
// THE ONE BELOW WILL WORK BUT TOO WAY LONG CODE SO WE HAVE ANOTHER JS MEANS[loop through]
// slides[0].style.left =0;
// slides[1].style.left=slideWidth + 'px';
// slides[2].style.left=slideWidth * 2 + 'px';
//LOOP ALSO WORKS
// slides.forEach((slide,index)=>{
//     slide.style.left=slideWidth * index + 'px';
// });
// WITH FUNCTION CALL.... BETTER AND SIMPLE BUT THEY ARE ALL DOING THE SAME
const setSlidePosition = (slide,index)=>{
  slide.style.left=slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

// THE FUCTION BELOW  IS TO MOVE EITHER LEFT OR RIGHT
const moveToSlide = (track,currentSlide,targetSlide)=>{
   track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

// TO UPDATEDOT FUNCTION
const updateDots = (currentDot,targetDot)=>{
  // the below code will renove the style attached to current-slide and put it on the clicked btn
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}
// FUNCTION FOR HIDDEN ARROW
const hideShowArrow =(slides, prevButton,nextButton, targetIndex)=>{
if(targetIndex === 0){
  prevButton.classList.add('is-hidden');
  nextButton.classList.remove('is-hidden');
}else if(targetIndex === slides.length -1){
prevButton.classList.remove('is-hidden')
nextButton.classList.add('is-hidden');
}else{
  prevButton.classList.remove('is-hidden')
nextButton.classList.remove('is-hidden');
}
}
//when click to the left, move theslides to the left
prevButton.addEventListener('click',e=>{
  const currentSlide =track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
  
  moveToSlide(track,currentSlide,prevSlide);

    updateDots(currentDot,prevDot);
    hideShowArrow(slides, prevButton,nextButton,prevIndex);
  })



//when click to the right, move theslides to the right
nextButton.addEventListener('click',()=>{
  // for right icon 
  const currentSlide =track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
 
//  THE BELOW WAS USED TO TEST RUN RIGHT NEXT SLIDE
    //   const amountToMove = nextSlide.style.left;
  //   // move to  the next slide
  // track.style.transform = 'translateX(-' + amountToMove + ')';
  // currentSlide.classList.remove('current-slide');
  // nextSlide.classList.add('current-slide');

  // for dot
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track,currentSlide,nextSlide);
  updateDots(currentDot,nextDot);
  hideShowArrow(slides, prevButton,nextButton,nextIndex);
})


// when i lick the nav indicatur move the slides
dotsNav.addEventListener('click',e=>{
  //  waht indicator was clicked on
  const targetDot =e.target.closest('button');
  // if where i click is not the button, then dont fire the event
  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');

  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex];

  moveToSlide(track,currentSlide,targetSlide);

  // the below code will renove the style attached to current-slide and put it on the clicked btn
  // currentDot.classList.remove('current-slide');
  // targetDot.classList.add('current-slide');
updateDots(currentDot,targetDot);

// if(targetIndex === 0){
//   prevButton.classList.add('is-hidden');
//   nextButton.classList.remove('is-hidden');
// }else if(targetIndex === slides.length -1){
// prevButton.classList.remove('is-hidden')
// nextButton.classList.add('is-hidden');
// }else{
//   prevButton.classList.remove('is-hidden')
// nextButton.classList.remove('is-hidden');
// }
hideShowArrow(slides, prevButton,nextButton,targetIndex);

})

