
// Calculate:
function Calculate() {
    var text = "";
    var form_inputs = document.getElementsByClassName("form-control");
    var total_points = 0;
    var Id;
    var points;
    var value;
    for (my_input_field of form_inputs) {
        Id = my_input_field.id;
        value = my_input_field.value;
        origin = Id;
        points = Number(value);
        if (Id == "Elders") {
            points = points * 2;
        }
        if (Id == "Palaces") {
            points = points * 5;
        }
        if (Id == "PalmTrees") {
            points = Number(points) * 3
            origin = "Palm Trees"
        }
        if (Id == "JinnPoints") {
            origin = "Jinni"
        }
        if (Id == "TilePoints") {
            origin = "Tiles"
        }
        total_points = total_points + points;
        text += "Points from " + origin + ": " + points + "\n"
    }
    text += "You have: " + total_points + " points!\n"

    text += "\nCheck out this cool app for five tribes!\n" + window.location.href;
    alert(text)
    try {
        navigator.share({
            files: [],
            title: 'My Points',
            text: text,
        }).then(() => console.log('Share was successful.')).catch((error) =>
            console.log('Sharing failed', error));
    }
    catch (error) {
        console.log('Sharing failed', error);
    }
    return false;
}

function ShareApp() {
    var text = "Check out this cool app for five tribes!\n" + window.location.href;
    try {
        navigator.share({
            files: [],
            title: 'Share',
            text: text,
        }).then(() => console.log('Share was successful.')).catch((error) =>
            console.log('Sharing failed', error));
    }
    catch (error) {
        console.log('Sharing failed', error);
    }
    return false;
}

// Reset form:
function ResetForm() {
    window.location.reload(false);
}


// SW:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}

// install button:
let deferredPrompt = null;

function InatallClick() {
    try {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });

    } catch (error) {
        console.log(error)
    }

}

window.addEventListener('load', function () {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('app runs in standalone mode');
        document.getElementsByName("install_button_div")[0].style.display = "none";
    } else {
        console.log('app runs in browser');
        document.getElementsByName("install_button_div")[0].style.display = "block";
    }
})

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show install button:
    window.addEventListener('load', function () {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('app runs in standalone mode');
            document.getElementsByName("install_button_div")[0].style.display = "none";
        } else {
            console.log('app runs in browser');
            document.getElementsByName("install_button_div")[0].style.display = "block";
        }
    })
});
