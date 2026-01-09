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
function openProjectModal(data) {
  const modal = document.getElementById('projectModal');
  const modalMedia = document.getElementById('modalMedia');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechAndLinks = document.getElementById('modalTechAndLinks');

  // Set media (video or image)
  if (data.video) {
    modalMedia.innerHTML = `<video autoplay muted loop playsinline controls><source src="${data.video}" type="video/mp4"></video>`;
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
