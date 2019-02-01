
function genColor(colorStep, numberOfSteps = 15) {

  const MAX_HUE = 360;
  const MAX_SATURATION = 100;
  const SATURATION_INTERVAL = 3;
  const LIGHT_STEPS = [50, 75, 25];

  const colorSet = ~~(colorStep / numberOfSteps);
  const hueVariation = MAX_HUE / numberOfSteps;


  let hue = (colorStep % numberOfSteps) * hueVariation;
  let saturation = 100;
  let light = 50;

  if (colorSet) {
    saturation = 100 / (2 ** Math.ceil(colorSet / 3));
    light = LIGHT_STEPS[colorSet % LIGHT_STEPS.length];

  }
  if (!colorStep) {
    light = 100;
  }
  return hue + "," + saturation + "%," + light + "%";

}

function createReplacement(colorIndex, total = uniqueAuthors.length) {

  let color = genColor(colorIndex);
  if(colorIndex < 0) {
    color= '0, 0%, 100%';
  }
  console.log('replace', colorIndex)
  let replacement = document.createElement('span');
  replacement.appendChild(document.createTextNode("PERSON" + colorIndex));
  replacement.setAttribute('style', `color: hsl(${color}); background:hsl(${color})`);
  return replacement;
}

function findPoster() {
  let links = document.body.querySelectorAll('#contentArea a');
  let found;
  links.forEach(element => {
    if (element.hasAttribute('data-hovercard')
      && element.getAttribute('data-hovercard').includes('/ajax/hovercard/user.php?')) {
      found = element;
    }
  });

  return found;
}

function replacePoster() {
  let poster = findPoster();
  let posterIndex = uniqueAuthors.indexOf(poster.innerText)
  if ( posterIndex != -1) {
    poster.replaceWith(createReplacement(posterIndex));
  } else { 
    poster.replaceWith(createReplacement())
  }
}



let authors = document.body.querySelectorAll('#contentArea a.UFICommentActorName');


let uniqueAuthors = Array.from(
  new Set(
    Object.values(
      document.body.querySelectorAll('#contentArea a.UFICommentActorName'))
      .map(node => node.innerText)
  )
);

// if poster comented, uniqueAuthors has name - Assign color to poster the same as UA index.
// if poster did not comment, UA does not have name - Assign white to poster

authors.forEach((current, index) => {
  const colorIndex = uniqueAuthors.indexOf(current.innerText);
  console.log('colorIndex', colorIndex)
  current.replaceWith(createReplacement(colorIndex));
})

// if (uniqueAuthors.indexOf(poster.innerText) != -1) {
//   // poster commented
//   person.replaceWith(
//     createReplacement(uniqueAuthors.indexOf(poster.innerText)
//   ));
// } else { 
//   person.replaceWith(
//     createReplacement(uniqueAuthors.indexOf(poster.innerText)
//   ));
// }


// let uniqueAuthors = Array.from(
//   new Set(
//     Object.values(
//       document.body.querySelectorAll('#contentArea a.UFICommentActorName'))
//       .map(node => nodeHref(node))
//   )
// );


let mentions = document.body.querySelectorAll('#contentArea a.profileLink');


// Check if mentions exist in unique authors, otherwise create unique mentions with leftovers and merge with authors
mentions.forEach((mention, index) => {
  const mentionIndex = uniqueAuthors.indexOf(mention.innerText);
  if (mentionIndex == -1) {
    uniqueAuthors.push(mention.innerText);
  } 
  mention.replaceWith(createReplacement(uniqueAuthors.indexOf(mention.innerText)));
})

let profilePictures = document.body.querySelectorAll('#contentArea .img.UFIActorImage');
profilePictures.forEach((picture, index) => {
  picture.setAttribute('style', 'filter :blur(4px)');
})




  // TODO: 
  /*

    
    Get and click on Replies and Show more links
      UFICommentLink
      .UFICommentBody a[href="#"]
    Do previous steps before blurring the rest

    Blur original poster  - There's no UFI class name...


    function _click(elem) {
      // Create our event (with options)
      let evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      // If cancelled, don't dispatch our event
      var canceled = !elem.dispatchEvent(evt);
    };
  */



