async function processGoogleIdToken(response) {
    console.log("Got response from Google, sending ID token to backend for validation")

    // Send the ID token to the OAuth callback for validation and login token assignment
    const api_start = performance.now()
    response = await fetch(
        'https://ghwp9f7zqj.execute-api.us-east-2.amazonaws.com/oauth2/idp/google/callback',
        {
            method: "POST",
            body: JSON.stringify(
                {
                    id_token: response.credential
                }
            ),
            headers: {
                "Content-type"  : "application/json; charset=UTF-8",
                "Accept"        : "application/json"
            }
        }
    );

    // console.log('Got response to callback POST');

    // Check if the request was successful
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const api_end = performance.now()

    const duration = (end - start).toFixed(0);

    console.log(`Fetch completed in ${duration} ms`);

    jsonObj = await response.json();
    // console.log('Parsed response body as JSON')

    // Step 2: Stringify with indentation (2 spaces)
    const prettyJson = JSON.stringify(jsonObj, null, 2);
    //console.log('Created pretty print of JSON')

    console.log('Response from backend:\n' + prettyJson);
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
