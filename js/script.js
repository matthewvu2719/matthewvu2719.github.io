$(window).on("load", function() {
	// Loader with fallback timeout
	setTimeout(function() {
		$(".loader").fadeOut(750);
	}, 2000);

	$(".loader .inner").fadeOut(500, function() {
		$(".loader").fadeOut(750);
	});

	// Disable Isotope - using CSS grid instead
	/*
	$(".items").isotope({ 
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});
	*/
})




$(document).ready(function(){
/*
$('#slides').superslides({
	animation: 'fade',
	play: 5000,
	pagination: false
});
*/

var typed = new Typed(".typed-text",{
	strings: [ "game developer", "full stack developer"],
	typeSpeed: 70,
	loop: true,
	startDelay: 500,
	showCursor: false
});

$('.owl-carousel').owlCarousel({
    loop:true,
	itmes:4,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        778:{
        	items:3
        },
        938:{
            items:5
        }
    }
});




var skillsTopOffset = $(".skillsSection").offset().top;

$(window).scroll(function(){

	if(window.pageYOffset > skillsTopOffset - $(window).height() + 200){

			$('.chart').easyPieChart({
			easing: 'easeInOut',
			barColor: '#fff',
			trackColor: false,
			scaleColor: false,
			lineWidth: 4,
			size: 152	

			})



	}
});


$("[data-fancybox]").fancybox();




$("#filters a").click(function(){
	$("#filters .current").removeClass("current");
	$(this).addClass("current");

	var selector = $(this).attr("data-filter");
	$(".items").isotope({
	filter: selector,
	animationOptions: {
		duration: 1500,
		easing: 'linear',
		queue: false
	}
});

	return false;
})





const nav = $("#navigation");
const navTop = nav.offset().top;

$(window).on("scroll", stickyNavigation);

function stickyNavigation() {
	var body = $("body");

	if($(window).scrollTop() >= navTop){
		body.css("padding-top",nav.outerHeight() + "px");
		body.addClass("fixedNav");	
	}
	else{
		body.css("padding-top",0);
		body.removeClass("fixedNav");
	}
}


});



// Project Modal Functions
let currentSlide = 0;
let totalSlides = 0;

function openProjectModal(data) {
  const modal = document.getElementById('projectModal');
  const modalMedia = document.getElementById('modalMedia');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechAndLinks = document.getElementById('modalTechAndLinks');

  currentSlide = 0;

  // Set media (slideshow, video, or image)
  if (data.slides && data.slides.length > 0) {
    totalSlides = data.slides.length;
    let slideshowHTML = '<div class="project-modal-slideshow">';
    
    data.slides.forEach((slide, index) => {
      const activeClass = index === 0 ? 'active' : '';
      if (slide.endsWith('.mp4')) {
        slideshowHTML += `<div class="project-modal-slide ${activeClass}">
          <video autoplay muted loop playsinline>
            <source src="${slide}" type="video/mp4">
          </video>
          <button class="video-sound-toggle" onclick="toggleSound(event)">
            <i class="fas fa-volume-mute"></i>
          </button>
        </div>`;
      } else {
        slideshowHTML += `<div class="project-modal-slide ${activeClass}"><img src="${slide}" alt="Slide ${index + 1}"></div>`;
      }
    });
    
    if (totalSlides > 1) {
      slideshowHTML += '<button class="project-modal-nav project-modal-nav-prev" onclick="changeSlide(-1)">‹</button>';
      slideshowHTML += '<button class="project-modal-nav project-modal-nav-next" onclick="changeSlide(1)">›</button>';
      
      // Add dots indicator
      slideshowHTML += '<div class="project-modal-dots">';
      for (let i = 0; i < totalSlides; i++) {
        const dotClass = i === 0 ? 'active' : '';
        slideshowHTML += `<span class="dot ${dotClass}"></span>`;
      }
      slideshowHTML += '</div>';
    }
    
    slideshowHTML += '</div>';
    modalMedia.innerHTML = slideshowHTML;
  } else if (data.video) {
    modalMedia.innerHTML = `<div style="position: relative;">
      <video autoplay muted loop playsinline>
        <source src="${data.video}" type="video/mp4">
      </video>
      <button class="video-sound-toggle" onclick="toggleSound(event)">
        <i class="fas fa-volume-mute"></i>
      </button>
    </div>`;
  } else if (data.image) {
    modalMedia.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
  }

  // Set title and description
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  // Combine tech stack and links
  let techAndLinksHTML = data.tech.map(t => `<span>${t}</span>`).join('');
  
  // Add links container
  techAndLinksHTML += '<div class="project-modal-links">';
  if (data.demo) {
    techAndLinksHTML += `<a href="${data.demo}" target="_blank" class="project-modal-link"><i class="fas fa-link"></i></a>`;
  }
  if (data.github) {
    techAndLinksHTML += `<a href="${data.github}" target="_blank" class="project-modal-link"><i class="fab fa-github"></i></a>`;
  }
  techAndLinksHTML += '</div>';
  
  modalTechAndLinks.innerHTML = techAndLinksHTML;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function toggleSound(event) {
  event.stopPropagation();
  const button = event.currentTarget;
  const slide = button.closest('.project-modal-slide') || button.parentElement;
  const video = slide.querySelector('video');
  const icon = button.querySelector('i');
  
  if (video.muted) {
    video.muted = false;
    icon.className = 'fas fa-volume-up';
  } else {
    video.muted = true;
    icon.className = 'fas fa-volume-mute';
  }
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.project-modal-slide');
  const dots = document.querySelectorAll('.dot');
  
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) {
    dots[currentSlide].classList.remove('active');
  }
  
  currentSlide += direction;
  
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add('active');
  }
  
  // Reset all videos to muted and update icons
  slides.forEach((slide, index) => {
    const video = slide.querySelector('video');
    const button = slide.querySelector('.video-sound-toggle');
    const icon = button ? button.querySelector('i') : null;
    
    if (video) {
      video.muted = true;
      if (icon) {
        icon.className = 'fas fa-volume-mute';
      }
      if (index === currentSlide) {
        video.play();
      } else {
        video.pause();
      }
    }
  });
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Stop video if playing
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
  }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
  const modal = document.getElementById('projectModal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});
