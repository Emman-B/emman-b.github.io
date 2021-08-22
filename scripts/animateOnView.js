// Code for animating when in view is from: https://www.youtube.com/watch?v=-ths7kNIFnw

// To use this, provide the "animate-on-view" class to elements



const scroll =
        window.requestAnimationFrame || 
        function (callback) {
            // if browser doesn't support requestAnimationFrame, just run the callback
            //  every 60th of a second
            window.setTimeout(callback, 1000/60); 
        };

// get all of the elements to animate
let elementsToAnimate = document.querySelectorAll('.animate-on-view');
// we need to wait for the browser to load before getting all of the elements
window.addEventListener('load', () => {
    elementsToAnimate = document.querySelectorAll('.animate-on-view');
});

/**
 * Checks if the element is in the viewport
 * @param {Element} element element to check
 */
function isElementInViewport(element) {
    // if jQuery is in use, correct for a possible issue
    if (typeof jQuery === 'function' && element instanceof jQuery) {
        element = element[0];
    }

    // get position of element and info about its position relative to viewport
    const elementRect = element.getBoundingClientRect();
    return (
        (elementRect.top <= 0 && elementRect.bottom >= 0)
        ||
        (elementRect.bottom >= (window.innerHeight || document.documentElement.clientHeight)
            && elementRect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (elementRect.top >= 0
            && elementRect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}

// loop that is being run when the element in question is in view
function animationLoop() {
    
    // if we want to hide the element when it leaves view, set this to true
    const doHideWhenElementOutsideView = false;

    elementsToAnimate.forEach( (element) => {
        if (isElementInViewport(element) && !element.classList.contains('is-visible')) {
            element.classList.add('is-visible')
        } else {
            if (doHideWhenElementOutsideView) {
                element.classList.remove('is-visible');
            }
        }
    });

    scroll(animationLoop);
}

animationLoop();
