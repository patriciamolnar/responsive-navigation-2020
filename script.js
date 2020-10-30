window.addEventListener('DOMContentLoaded', setup);

function setup() {
    //Open and close mobile nav
    function showHideNav() {
        const nav = document.getElementById('header-nav');
        if(nav.classList.contains('slide-in')) {
            nav.classList.remove('slide-in');
        } else {
            nav.classList.add('slide-in');
        }
        
    }

    const burger = document.getElementById('burger'); 
    burger.addEventListener('click', showHideNav, false); 

    //Slide in animation for individual <li>s 
    const lis = document.querySelectorAll('#header-nav>ul>li'); 

    let num = lis.length; 
    let delay = 0.3;  
    while(num > 0) {
        lis[lis.length - num].style.animationDelay = delay + 's'; 
        num--; 
        delay += 0.3; 
    } 


    //Collapse and show nested menus (mobile version only) 
    const navBtns = document.querySelectorAll('.header-nav-button'); 

    function  slideCloseNav(e) { 
        const arrow = e.target.children[0]; 
        const list = e.target.children[1];
        const icon = arrow.children[0];  

        if(list.offsetHeight === 0) {
            icon.classList.add('up');
            icon.classList.remove('down');
            list.classList.remove('hide');
            list.classList.add('show'); 
        } else {
            icon.classList.add('down');
            icon.classList.remove('up');
            list.classList.remove('show');
            list.classList.add('hide');  
        }
    }

    //only add event listener if window width is less than 1024
    function checkSize() {
        if(window.innerWidth < 1024) {
            navBtns.forEach(navBtn => {
                navBtn.addEventListener('click', function (e) {
                    slideCloseNav(e);
                }, false);
            });
        }    
    }
    
    checkSize(); 
    window.addEventListener('resize', checkSize);

    //Desktop: Open dropdown with tab key.
    navBtns.forEach(navBtn => {
        navBtn.addEventListener('keyup', function(e) {
            if (e.key === "Tab" && e.target.children[1] != undefined) {
                const list = e.target.children[1];  
                list.classList.add('show'); 
            }
        }, false); 
    });

    //Desktop: Close navigation with tab key.
    const lastLinks = document.querySelectorAll('.header-nav-nested-list>li:last-of-type'); 
    lastLinks.forEach(lastLink => {
        lastLink.addEventListener('keydown', function(e) {
            if (e.key === "Tab") {
                const list = e.target.parentNode.parentNode;  
                list.classList.remove('show');
            }
        }, false); 
    }); 

    // Intersection Observer 
    const sections = document.querySelector('.welcome'); 
		
    const options = {
        root: null, 
        threshold: 0,
        rootMargin: "-250px"
    }
    
    const observer = new IntersectionObserver( (entries, observer) => {
        entries.forEach(entry => {
            console.log(entry.target, entry.isIntersecting);
            
            if(entry.isIntersecting) {
                document.querySelector('header').classList.remove('orange');; 
            } 

            if(!entry.isIntersecting) {
                document.querySelector('header').classList.add('orange');
            }
            
        })
    }, 
    options); 
    
    observer.observe(sections);
    
		
    

}
