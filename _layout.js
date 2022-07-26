(function() {
    window.onload = function() {
        window.setTimeout(fadeout, 300);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }
    window.onscroll = function() {
        var header_navbar = document.querySelector(".hero-section-wrapper-5 .header");
        var sticky = header_navbar.offsetTop;
        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };
    let navbarToggler6 = document.querySelector(".header-6 .navbar-toggler");
    var navbarCollapse6 = document.querySelector(".header-6 .navbar-collapse");
    document.querySelectorAll(".header-6 .page-scroll").forEach(e => e.addEventListener("click", () => {
        navbarToggler6.classList.remove("active");
        navbarCollapse6.classList.remove('show')
    }));
    navbarToggler6.addEventListener('click', function() {
        navbarToggler6.classList.toggle("active");
    })

    function onScroll(event) {
        var sections = document.querySelectorAll('.page-scroll');
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < sections.length; i++) {
            var currLink = sections[i];
            var val = currLink.getAttribute('href');
            var refElement = document.querySelector(val);
            var scrollTopMinus = scrollPos + 73;
            if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
                document.querySelector('.page-scroll').classList.remove('active');
                currLink.classList.add('active');
            } else {
                currLink.classList.remove('active');
            }
        }
    };
    window.document.addEventListener('scroll', onScroll);

    new WOW().init();
})();
