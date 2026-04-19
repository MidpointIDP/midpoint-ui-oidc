function googleLoginClicked() {
    console.log('Login button was clicked!');
}

function windowLoaded() {
    console.log('onload event fired, in theory everything is rendered');
    const googleButton = document.querySelector('.g_id_signin');

    if (googleButton) {
        googleButton.addEventListener('click', googleLoginClicked);
        console.log('Event listener added to the Google button');
    }
}


// Add event listener for sign in image
window.addEventListener('load', windowLoaded);
