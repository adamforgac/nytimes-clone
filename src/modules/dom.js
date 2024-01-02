import { format } from 'date-fns';

function makeDom() {
  const scrollWrapper = document.querySelector('.scroll-articles');
  const prevButton = document.querySelector('.left-button');
  const nextButton = document.querySelector('.right-button');
  const styleLeft = document.querySelector('.left-button span');
  const styleRight = document.querySelector('.right-button span');

  // TEXT ARTICLES MOVING ARROWS

  let pairIndex = 0;
  const pairWidth = scrollWrapper.offsetWidth;

  function scrollToPair() {
    scrollWrapper.scroll({
      left: pairWidth * pairIndex,
      behavior: 'smooth',
    });
  }

  prevButton.addEventListener('click', () => {
    pairIndex = Math.max(pairIndex - 1, 0);
    if (pairIndex === 0) {
      styleLeft.style.color = 'rgb(232, 232, 232)';
    } else {
      styleLeft.style.color = 'black';
    }
    styleRight.style.color = 'black';
    scrollToPair();
  });

  nextButton.addEventListener('click', () => {
    pairIndex = Math.min(pairIndex + 1, 2);
    if (pairIndex === 2) {
      styleRight.style.color = 'rgb(232, 232, 232)';
    } else {
      styleRight.style.color = 'black';
    }
    styleLeft.style.color = 'black';
    scrollToPair();
  });

  // WELL SECTION ARROWS

  const wellControlButton = document.querySelector('.well-control');
  const wellWrapper = document.querySelector('.well-articles article');
  const wellSection = document.querySelector('.well-articles');
  const wellControlButtonBack = document.querySelector('.well-control-back');

  let wellIndex = 0;
  const wellWidth = wellWrapper.offsetWidth * 2 + 85;
  console.log(wellWidth);

  function scrollWell() {
    wellSection.scroll({
      left: wellWidth * wellIndex,
      behavior: 'smooth',
    });
  }

  wellControlButton.addEventListener('click', () => {
    wellIndex = Math.min(wellIndex + 1, 1);
    wellControlButtonBack.style.opacity = '1';
    wellControlButton.style.opacity = '0';
    console.log('works');
    scrollWell();
  });

  wellControlButtonBack.addEventListener('click', () => {
    wellIndex = Math.min(wellIndex - 1, 1);
    wellControlButtonBack.style.opacity = '0';
    wellControlButton.style.opacity = '1';
    console.log('works as well');
    scrollWell();
  });

  // COOKING SECTION ARROWS

  const cookingControlButton = document.querySelector('.cooking-control');
  const cookingWrapper = document.querySelector('.cooking-articles article');
  const cookingSection = document.querySelector('.cooking-articles');
  const cookingControlButtonBack = document.querySelector(
    '.cooking-control-back',
  );

  let cookingIndex = 0;
  const cookingWidth = cookingWrapper.offsetWidth * 2 + 85;
  console.log(cookingWidth);

  function scrollCooking() {
    cookingSection.scroll({
      left: cookingWidth * cookingIndex,
      behavior: 'smooth',
    });
  }

  cookingControlButton.addEventListener('click', () => {
    cookingIndex = Math.min(cookingIndex + 1, 1);
    cookingControlButtonBack.style.opacity = '1';
    cookingControlButton.style.opacity = '0';
    console.log('cooking');
    scrollCooking();
  });

  cookingControlButtonBack.addEventListener('click', () => {
    cookingIndex = Math.min(cookingIndex - 1, 1);
    cookingControlButtonBack.style.opacity = '0';
    cookingControlButton.style.opacity = '1';
    console.log('works as cooking');
    scrollCooking();
  });

  //   SHOW MENU WHEN SCROLLING

  let prevScrollPos = window.pageYOffset;
  const menu = document.querySelector('.appearing-nav');
  const scrollThreshold = 300;

  window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    const scrolledDown = currentScrollPos > prevScrollPos;

    if (scrolledDown && currentScrollPos > scrollThreshold) {
      menu.style.top = '-10px';
    } else if (currentScrollPos <= 0 || currentScrollPos < scrollThreshold) {
      menu.style.top = '-200px';
    }

    prevScrollPos = currentScrollPos;
  });

  // GIVES REAL DATE

  const currentDate = new Date();

  const formattedDate = format(currentDate, 'iiii, MMMM dd, yyyy');
  3;

  const timeElement = document.getElementById('dynamicDate');
  timeElement.textContent = formattedDate;
  timeElement.setAttribute('datetime', currentDate.toISOString());

  const currentYear = new Date().getFullYear();
  const copyright = document.querySelector('.mark-first a');
  copyright.textContent = `© ${currentYear} The New York Times Company`;
}

export default makeDom;
