function processGoogleIdToken(response) {
    console.log("Got response from Google with credential: " + response.credential);
}

function windowLoaded() {
    console.log("onload event fired, in theory everything is loaded, let's add our button to let them log in");

    // Reference: https://developers.google.com/identity/gsi/web/guides/display-button#javascript

    google.accounts.id.initialize(
        {
            client_id   : "263659947191-e0sr8qg2pmofgb15h5lc1ihu7bhni26j.apps.googleusercontent.com",
            callback    : processGoogleIdToken
        }
    );

    // Now let's add our login button to the webpage div now that we are set up to handle the click
    google.accounts.id.renderButton(
        document.getElementById("div_google_button"),
        
        // customization options
        { 
            theme   : "outline", 
            size    : "large" 
        }  
    );
}


// Add event listener for sign in image
window.addEventListener('load', windowLoaded);
