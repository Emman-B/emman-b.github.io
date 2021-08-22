// This is for the logic for the navigation menu

window.addEventListener('load', () => {
    const menuButton = document.getElementById('menu-button');

    const makeVisible = (element) => {
        element.classList.add('is-open');
        menuButton.classList.remove('fa-bars');
        menuButton.classList.add('fa-times');
    }
    const makeInvisible = (element) => {
        element.classList.remove('is-open');
        menuButton.classList.remove('fa-times');
        menuButton.classList.add('fa-bars');
    }

    // clicking on menu
    menuButton.addEventListener('click', (e) => {
        document.querySelectorAll('.toggle-menu-content').forEach((element) => {
            if (!element.classList.contains('is-open')) {
                makeVisible(element);
            } else {
                makeInvisible(element);
            }

            
            // possibly checking for clicking outside menu (close menu if so)
            const outsideClickListener = (e) => {
                if (!menuButton.contains(e.target) && element.classList.contains('is-open')) {
                    makeInvisible(element);
                    removeClickListener();
                }
            };

            const removeClickListener = () => {
                document.removeEventListener('click', outsideClickListener);
            }

            document.addEventListener('click', outsideClickListener);
        });
    });

});