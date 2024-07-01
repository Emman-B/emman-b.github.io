let animationInterval = null;
const SLIDESHOW_DURATION = 7500;

// clicks through services button
function clickNextService() {
    const currents = [...document.getElementsByClassName("current")];

    // in case there are multiple "current" elements, remove all other elements except the last one
    while (currents.length > 1) {
        currents.pop();
    }

    if (currents.length === 1) {
        const current = currents[0];
        if (current.nextElementSibling == null) {
            current.parentElement.firstElementChild.click(); // go to first element if current is last child
        } else {
            current.nextElementSibling.click();
        }
    }
}

// about services button logic
[...document.getElementsByClassName("about-service")].forEach(function (service) {
    service.addEventListener("click", function (event) {
        if (!event.currentTarget.classList.contains("current")) {
            let prev = "";
            // remove all "current"
            [...document.getElementById("about-services-list").getElementsByClassName("current")].forEach(function (currentService) {
                currentService.classList.remove("current");
                prev = currentService.dataset.serviceName; // if multiple "currents", only last current will be used
            });
            // make the clicked element "current"
            event.currentTarget.classList.add("current");

            // fire event with name of service
            const serviceChanged = new CustomEvent("serviceChanged", { detail: {
                current: event.currentTarget.dataset.serviceName,
                previous: prev
            }});
            document.dispatchEvent(serviceChanged);

            clearInterval(animationInterval);
            animationInterval = setInterval(clickNextService, SLIDESHOW_DURATION);
        }
    });
});

// after page loads, run services slideshow
window.addEventListener("load", function () {
    // on load, also simulate transitioning to the current element
    document.dispatchEvent(new CustomEvent("serviceChanged", { detail: { current: document.getElementsByClassName("current")[0].dataset.serviceName } }));

    // services slideshow
    animationInterval = setInterval(clickNextService, SLIDESHOW_DURATION);
});

document.addEventListener("serviceChanged", function(event) {
    const {current, previous} = event.detail;

    const exitAnimationKeyframes = [
        { transform: "translateX(0%)", opacity: 1 },
        { transform: "translateX(50%)", opacity: 0 }
    ];

    const enterAnimationKeyframes = [
        { transform: "translateX(-50%)", opacity: 0 },
        { transform: "translateX(0%)", opacity: 1 }
    ];

    const animationOptions = {
        duration: 500,
        fill: "forwards",
        easing: "ease"
    };

    if(previous == null) {
        // on start, previous will be null, so hide all non-current elements
        document.querySelectorAll(`.about-service-image-wrapper[data-service-name]:not(.about-service-image-wrapper[data-service-name=${current}])`).forEach(function(otherService) {
            otherService.style.opacity = 0;
        });
    } else {
        // play exit animation for previous element
        document.querySelector(`.about-service-image-wrapper[data-service-name=${previous}]`).animate(exitAnimationKeyframes, animationOptions);
    }

    // play entrance animation for current element
    document.querySelector(`.about-service-image-wrapper[data-service-name=${current}]`).animate(enterAnimationKeyframes, animationOptions);
});