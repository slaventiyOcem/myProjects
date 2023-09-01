let imgArray = [
    "img/bg/applehedear.png",
    "img/bg/joystick.png",
    "img/bg/PC.png",
    "img/bg/Watch.png",
];
let counter = 1; //переменная
let interval = '';//переменная
let navigatorId = 1;//переменная
let container = document.querySelector('.container-slider');
let slider = document.querySelector('.slider');
let navigator = document.querySelectorAll('.navigator');
for (let i = 0; i < imgArray.length; i++) {
    let img = document.createElement('img');//создает новый элемент по указанному имени тега.
    img.setAttribute('class','img_slider');
    img.src = imgArray[i]; //путь
    slider.appendChild(img); //добавляет узел в конец списка дочерних элементов
}
let sliders = document.querySelectorAll('.img_slider');//обращаемся ко всем элеметам img в классе slider.
let dotDiv = document.querySelector('.dot'); //обращаемся к элементу с тегом
let containerWidth = container.clientWidth; // задаем ширину container
let sliderWidth = sliders[0].clientWidth;  //задаем ширину slider
let dots = '';
let firstClone = `<img src="${sliders[0].src}" id="firstClone">`;
let lastClone = `<img src="${sliders[sliders.length - 1].src}" id="lastClone">`;
slider.innerHTML = slider.innerHTML;
sliders = slider.querySelectorAll('img');
sliders.forEach((slides1) => {
    slides1.draggable = false;
});

navigator.forEach((navigator1) => {
    navigator1.onclick = () => {
        console.log('Increment')
        if (navigator1.id == 1 && counter + 1 < sliders.length) {
            counter++;
        } else if (navigator1.id == 0 && counter > -1) {
            counter--;
        }
        slider.style.transition = "transform 1s ease-in-out";
        navigatorId = navigator1.id;
        navigator1.disabled = true;
        //increament();
    }
});


slider.addEventListener("transitionend", transitionEnd);
function transitionEnd() {
    if (sliders[counter].id == 'lastClone') {
        slider.style.transition = 'none';
        //counter = sliders.length - [0];
        //increament();
    } else {
        slider.style.transition = 'none';
        //counter = sliders.length - [1];
        //increament();
    }
    dots.forEach((dot1) => {
        dot1.classList.remove('clicked');
    });
    dots[counter - 1].classList.add('clicked');
    navigator[navigatorId].disabled = false;
}

function increament() {
    slider.style.transform = `translateX(${
        containerWidth * counter * -1
        //(containerWidth - sliderWidth) * 0.5 - sliderWidth * counter
    }px)`;
    navigator[1].click();
    startInterval()
}

function startInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
        increament()
    }, 3000);
}

startInterval();
window.addEventListener("resize", () => {
    startInterval();
});

for (let i = 0; i <= sliders.length -1 ; i++) {
    let dot = document.createElement("span");
    dot.id = 'dot' + i;
    dot.setAttribute('onclick', `dotClick(${i})`);
    dotDiv.appendChild(dot);
}

dots = dotDiv.querySelectorAll("span");
dots[0].classList.add('clicked');

function dotClick(c) {
    counter = c;
    slider.style.transition = "transform 0.4s ease-in-out";
    increament(counter);
    dots.forEach((dot1) => {
            dot1.classList.remove('clicked');

    });
    dots[c + 1].classList.add('clicked');

}
window.oncontextmenu =(e)=>{
    e.preventDefault();

};
window.onkeyup = (e) =>{
    if (e.keyCode == 37)navigator[0].click();
    else if (e.keyCode == 39)navigator[1].click();
    ;
};


