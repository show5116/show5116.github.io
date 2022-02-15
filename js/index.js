const nav = document.querySelector('nav');
const skills = document.querySelector('#skill');
const projects = document.querySelector('#project');
const carrers = document.querySelector('#career');

slider(skills);
slider(projects);
slider(carrers);

document.querySelector('main').addEventListener("scroll",e=>{
    console.log(e);
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