/* ===== Show Menu ===== */
const showMenu = (toggleId, navId)=>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

          // Validate that variables Exist
          if(toggle && nav){
              toggle.addEventListener('click', () =>{
                // we add the show-menu class to the div tag with the nav__menu class
                nav.classList.toggle('show-menu');
              });
          }
}
showMenu('nav__toggle', 'nav__menu')

/* ===== Remove Menu Mobile ===== */

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav__menu')

    // when we click on each nav__link, we remove the show-menu class

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ===== Scroll Sections Active Link ===== */

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {

        const sectionHeight =  current.offSetHeight;
        const sectionTop = current.offSetHeight - 10 ;

        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= setionTop + sectionHeight){

            document.querySelector('.nav__menu a[href=*=' + sectionId + ']').classList.add('active-link')
        
        }else{

            document.querySelector('.nav__menu a[href*=' + sectionId +']').classList.remove('active-link')
        
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* ===== Show Scroll To Top ===== */

function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When The Scroll is higher than 560 viewport height, add the Show-scroll Class!
    if(this.scrollY >= 200){
        scrollTop.classList.add('show-scroll');
    }else{
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);

/* ===== Dark / Light Theme ===== */

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously Selected Topic (if user is selected)

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We Obtain The Current Theme That The Interface Has By Validating The Dark-theme Class

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We Validate If The User Previously Chose A Topic

if(selectedTheme){
    // if The Validation is Fulfilled, We Ask tha the issue was to know if we activated
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate Deactivate the theme manually with the button

themeButton.addEventListener('click', ()=>{
    //add or remove the dark/light theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //we save the theme and the current icon that the user choose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* ===== Reduce The Size And Print On An A4 Sheet */

function scaleCv(){
    document.body.classList.add('scale-cv')
}

/* ===== Remove The Size When The CV Is Downloaded ===== */

function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* ===== GENERATE PDF ===== */

// PDF Generated Area

let areaCV = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')


// HTML 2 PDF Options

let opt = {
    margin:         0,
    filename:       'DeghmoumDjamelEddineResume.pdf',
    image:          { type:'jpeg', quality: 0.98},
    html2canvas :   { scale: 4},
    jsPDF:          { format:'a4', orientation: 'portrait'}
}

// Function 2 Call Area Cv and Html 2 pdf options

function generateResume(){
    html2pdf(areaCV, opt)
}

// When The button is clicked, it executes the three functions

resumeButton.addEventListener('click', ()=>{

    // 1. The Class .scale-cv is added to the body,

    scaleCv()

    // 2. The PDF is Generated

    generateResume()

    // 3. The .scale-cv is removed from the body after 5 seconds

    setTimeout(removeScale, 5000)

})

