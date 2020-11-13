var menuBtn = document.querySelector('.menu-btn');
var menuLines = document.querySelector('.menu-btn-lines');
var menuMobBox = document.querySelector('.menu-box');
var menuItem = document.querySelectorAll('.menu-item');
  
if(menuBtn) {
    menuBtn.addEventListener('click', function() {
        menuLines.classList.toggle("menu-btn-active");
        menuMobBox.classList.toggle("menu-show");
    });
}
  
menuItem.forEach(function(btn) {
    btn.addEventListener('click', function() {
        menuLines.classList.remove("menu-btn-active");
        menuMobBox.classList.remove("menu-show");
    });
});