function loadGallery(fileName, galleryName) {
    // Grab the JSON file and send it to the function
    fetch(fileName)
    .then((response) => response.json())
    .then((json) => populateGallery(json, galleryName));
}

function populateGallery(file, gallery) {
    var container;

    // Find the gallery that matches the name
    var galleries = document.querySelectorAll("div[gallery-name]");
    for (var i = 0; i < galleries.length; i++) {
        if (galleries[i].getAttribute("gallery-name") == gallery) {
            container = galleries[i];
            break;
        }
    }

    // If there exists no gallery with the given name, exit
    if (container == null) {
        console.log("Error: No gallery with name of '" + gallery + "' could be found!");
        return;
    }

    for (var i = 0; i < file.projects.length; i++) {
        var button = document.createElement("a");
        button.className = "contentButton";
        button.href = "project-page.html?project=" + file.projects[i].data_prefix;

        var image = document.createElement("img");
        image.src = "images/thumbnails/" + file.projects[i].thumbnail;

        button.appendChild(image);
        
        var text = document.createTextNode(file.projects[i].name);

        button.appendChild(text);

        container.appendChild(button);
    }
}

