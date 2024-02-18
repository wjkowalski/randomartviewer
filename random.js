function refreshPage(){
    window.location.reload();
}

let nextButton = document.getElementById('next-image-button');
let clicked = nextButton.addEventListener('click', refreshPage);


// Show a random piece from a random page
async function showRandomImage() {

    let thinkHolder = document.getElementById('thinking-holder');
    let thinking = document.getElementById('thinking');

    // clear the page temporarily
    document.getElementById('artWrapper').style.display = "none";
    console.log("Cleared the page.");

    // reset the thinking text
    thinking.innerHTML = "Finding an image";
    console.log("Text reset.");
  
    // add dots while thinking
    function addDots() {
        const dot = document.createTextNode(".");
        thinking.appendChild(dot);
    }

    let n = 0;

    function addDotLoop() {
        setTimeout(() => {
            addDots();
            console.log("Added dot #" + n);
            n++;
            if (n < 10) {
                addDotLoop();
            }
        }, 1000);

        }

    addDotLoop();

    if (n === 9){
        showRandomImage();
    }

    let artworkImage = document.getElementById('artworkImage');
    let pageNum = Math.floor(Math.random() * 10333);
    let imageNum = Math.floor(Math.random() * 11);
    let imageStem = 'https://www.artic.edu/iiif/2/';
    let imageEnd = '/full/843,/0/default.jpg'; // build image URLs with these stems (Image ID goes in the middle)
    let pageStem = 'https://api.artic.edu/api/v1/artworks?page=';

    let url = pageStem + pageNum;

    const response = await fetch(url); // fetch creates and returns a promise which is handled in the next line 

    const json = await response.json();  // convert json into js
    pageInfo = json.data; // update global pageInfo variable with new data

    console.log(pageInfo[imageNum]); 

    let thisImage = pageInfo[imageNum];
    if(thisImage.image_id == null) {

        showRandomImage(); // run the function again if there is no image id 
    }

    let title = thisImage.title;
    let artist = thisImage.artist_title;
    let artist_display = thisImage.artist_display.replace("/n", "<br />");
    let image_url = imageStem + thisImage.image_id + imageEnd;
    let date = thisImage.date_display;
    let medium = thisImage.medium_display;
    let collectionID = thisImage.id;
    let description = thisImage.description;
    let type = thisImage.artwork_type_title;
    let credit = thisImage.credit_line;
    let isPublic = thisImage.is_public_domain;
    let country = thisImage.place_of_origin;
    let full_image_link;
    
    document.getElementById('title').innerHTML = "<em>" + title + "</em>"; // name of piece

    if(artist){ // check to see if artist name is available
        document.getElementById('artistName').innerHTML = artist;
    } else {
        document.getElementById('artistName').innerHTML = ("No artist available.");
    }

    // Toggle from splash to page once image is loaded.
    let img = new Image();
    img.onload = function() {
        artworkImage.src = img.src;
        thinking.style.display = "none";
        thinkHolder.style.display = "none";
        document.getElementById('artWrapper').style.display = "flex";
    };

    img.src = image_url;

    document.getElementById('intro').innerHTML = `<p class="desc-text">Welcome to the Random Art Slideshow v0.1 <br />Data courtesy of the <a href="https://api.artic.edu/docs/#introduction">Chicago Art Institute</a>.<br />Built by Bill Kowalski of <a href="https://mahonebaywebdesign.com">Mahone Bay Web Design</a>.<br />With thanks to <a href="#">frumiousbandersnatch</a> and <a href="#">simplydisconnected</a> for their contributions.<br />This website is best viewed on larger screens.<br /><br />Current image: ${collectionID}<br /> Current collection page ${pageNum} <br /><br />To see a new image, refresh the page or click the button below.<br /><p style="margin-top: 1rem; text-align: center; font-weight: bold;">CAUTION: Some images may be unsafe for work (NSFW) or inappropriate for minors.</p>`;
    
    document.getElementById('description').innerHTML = `<p class="desc-text"><strong>TITLE: </strong>${title}<br /><p class="desc-text"><strong>ARTIST: </strong>${artist}<br /><p class="desc-text"><strong>DATE: </strong>${date}<br /><p class="desc-text"><strong>COUNTRY: </strong>${country}<br /><p class="desc-text"><strong>TYPE: </strong>${type}<br /><p class="desc-text"><strong>MEDIUM: </strong>${medium}<br><p class="desc-text"><strong>CREDIT: </strong>${credit}<br /><p class="desc-text"><a href="${image_url}" target="_blank">CLICK HERE FOR ORIGINAL IMAGE FILE</a>`;

    if(isPublic === true){ // if in public domain, it will have a large zoomable version of the image available
        full_image_link = 'https://www.artic.edu/iiif/2/' + thisImage.image_id + "/full/1686,/0/default.jpg";
        document.getElementById('fullImageLink').innerHTML = `<a href="${full_image_link}" target="_blank"> CLICK HERE FOR FULL SIZE PUBLIC DOMAIN IMAGE</a>`;
    } else {
        document.getElementById('fullImageLink').innerHTML = "This image is not in the public domain.";
    }

    if(description !== null){ // check if there is a description
        document.getElementById('advDesc').innerHTML = description;
    } else {
        document.getElementById('advDesc').innerHTML = "<strong>Item Description:</strong> <br /> No further description available";
    }        
}

showRandomImage();
