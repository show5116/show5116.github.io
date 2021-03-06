function slider(element) {
    const slideWrap = element.querySelector('.slide-wrap');
    const slideList = element.querySelector('.slide-list');  // Slide parent dom
    const slideContents = element.querySelectorAll('.slide-content');  // each slide dom
    const slideBtnNext = element.querySelector('.slide-btn-next'); // next button
    const slideBtnPrev = element.querySelector('.slide-btn-prev'); // prev button
    const pagination = element.querySelector('.slide-pagination');
    const slideLen = slideContents.length;  // slide length
    const slideWidth = slideWrap.clientWidth; // slide width
    const slideSpeed = 300; // slide speed
    const startNum = 0; // initial slide index (0 ~ 4)
    slideList.style.width = slideWidth * (slideLen + 2) + "px";

    // Copy first and last slide
    let firstChild = slideList.firstElementChild;
    let lastChild = slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    // Add copied Slides
    slideList.appendChild(clonedFirst);
    slideList.insertBefore(clonedLast, slideList.firstElementChild);

    // Add pagination dynamically
    let pageChild = '';
    for (var i = 0; i < slideLen; i++) {
        pageChild += '<li class="dot';
        pageChild += (i === startNum) ? ' dot-active' : '';
        pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
    }
    pagination.innerHTML = pageChild;
    const pageDots = element.querySelectorAll('.dot'); // each dot from pagination

    slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

    let curIndex = startNum; // current slide index (except copied slide)
    let curSlide = slideContents[curIndex]; // current slide dom
    curSlide.classList.add('slide-active');

    /** Next Button Event */
    slideBtnNext.addEventListener('click', function() {
        if (curIndex <= slideLen - 1) {
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
        }
        if (curIndex === slideLen - 1) {
            setTimeout(function() {
                slideList.style.transition = "0ms";
                slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
            }, slideSpeed);
            curIndex = -1;
        }
        curSlide.classList.remove('slide-active');
        pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot-active');
        curSlide = slideContents[++curIndex];
        curSlide.classList.add('slide-active');
        pageDots[curIndex].classList.add('dot-active');
    });

    /** Prev Button Event */
    slideBtnPrev.addEventListener('click', function() {
        if (curIndex >= 0) {
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
        }
        if (curIndex === 0) {
            setTimeout(function() {
                slideList.style.transition = "0ms";
                slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
            }, slideSpeed);
            curIndex = slideLen;
        }
        curSlide.classList.remove('slide-active');
        pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot-active');
        curSlide = slideContents[--curIndex];
        curSlide.classList.add('slide-active');
        pageDots[curIndex].classList.add('dot-active');
    });

    /** Pagination Button Event */
    let curDot;
    Array.prototype.forEach.call(pageDots, function (dot, i) {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            curDot = element.querySelector('.dot-active');
            curDot.classList.remove('dot-active');

            curDot = this;
            this.classList.add('dot-active');

            curSlide.classList.remove('slide-active');
            curIndex = Number(this.getAttribute('data-index'));
            curSlide = slideContents[curIndex];
            curSlide.classList.add('slide-active');
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
        });
    });
}
