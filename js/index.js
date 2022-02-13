const elm = document.querySelectorAll('section');
const elmCount = elm.length;
const nav = document.querySelector('nav');
const skills = document.querySelector('#skill');
const projects = document.querySelector('#project');
const carrers = document.querySelector('#career');

slider(skills);
slider(projects);
slider(carrers);

elm.forEach(function(item, index){
    item.addEventListener('mousewheel', function(event){
        event.preventDefault();
        let delta = 0;

        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
        }
        else if (event.detail)
            delta = -event.detail / 3;

        let moveTop = window.scrollY;
        let elmSelector = elm[index];

        // wheel down : move to next section
        if (delta < 0){
            if (index !== elmCount-1){
                try{
                    moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                }catch(e){}
            }
        }

        // wheel up : move to previous section
        else{
            if (index !== 0){
                try{
                    moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                }catch(e){}
            }
        }

        const body = document.querySelector('html');
        window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
    });
});

window.addEventListener("scroll",e=>{
    if(window.scrollY < 100){
        if (nav.classList.contains('appear')) {
            nav.classList.add('disappear');
            setTimeout(function(){
                if(window.scrollY < 100){
                    nav.classList.remove('appear')
                    nav.classList.add('hidden');
                }
            },1001);
        }
    }else{
        nav.classList.remove("disappear");
        nav.classList.add("appear");
    }
})