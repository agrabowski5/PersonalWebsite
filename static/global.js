// STEP 1
console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}


// STEP 2
// 2.1
/*
let navLinks = $$("nav a");

// 2.2
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)

// 2.3
if (currentLink) { // or if (currentLink !== undefined)
	currentLink?.classList.add("current");
}
*/
// STEP 3
// TODO: Remove <nav> menu from all HTML pages!
// TODO: Comment out the step 2 code in this file!

// step 3.1
let pages = [
    {url: "/", title: "Home"},
    {url: "/projects", title: "Projects"},
    {url: "/contact", title: "Contact"},
    {url: "/CV", title: "CV"},
    {url: "https://github.com/agrabowski5", title: "GitHub"},
];

let nav = document.createElement("nav");
document.body.prepend(nav);

// TODO: Inside index.html (our home page), add a class="home" attribute to the <html lang="en"> element!
const ARE_WE_HOME = document.documentElement.classList.contains("home");
/*
for (let p of pages) {
	let url = p.url;
	let title = p.title;

	// Create link and add it to nav 
    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }

	let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav.append(a);
}
*/

// step 3.2
// TODO: Comment out the `for (let p of pages) {...}` loop you made in step 3.1 and uncomment the for loop below! I have helped you restructure the loop a bit in a way that may be confusing from the lab instructions

for (let p of pages) {
	let url = p.url;
	let title = p.title;

    // Create correct relative link and add it to nav 
    /* 
    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }
    */
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }

    if (a.host !== location.host) {
        a.target = "_blank";
    }

    nav.append(a);
} 

// STEP 4
// step 4.1
// TODO: Inside your styles.css file, adjust your navigation menu colors! There is nothing to do in this file in this step.

// step 4.2
document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Auto</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
		</select>
	</label>`
);

// step 4.3
// TODO: Inside your styles.css file, add styling to move the switcher with class .color-scheme to the top right corner. There is nothing to do in this file in this step

// step 4.4
let select = document.querySelector("select");

select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);

    // TODO: use document.documentElement.style.setProperty to set the color scheme here! (hint: take a look at the handout)
    document.documentElement.style.setProperty("color-scheme", event.target.value);

    // TODO: (step 4.5.1) uncomment the line below!
    localStorage.colorScheme = event.target.value;
});


// step 4.5 (continued)
// Reminder: uncomment line inside the event listener for 4.5.1
if ("colorScheme" in localStorage) {
    // TODO: set color scheme to the stored local value (hint: look at handout)
    // Restore the user's preferred color scheme from local storage
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    // Also update the select element to reflect the current setting
    select.value = localStorage.colorScheme;
}

// STEP 5 (OPTIONAL)
// Note: This is an optional part of the lab! If you want to do it, uncomment the lines below and fill in the TODOs. Otherwise, leave the lines commented out.

// Select the form element
let form = document.querySelector("form");

// Add event listener for form submission
form?.addEventListener("submit", function (event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Create FormData object from the form
    let data = new FormData(form);

    // Build the URL with properly encoded parameters
    let url = form.action + "?";
    for (let [name, value] of data) {
        // Properly encode the value to handle spaces and special characters
        url += name + "=" + encodeURIComponent(value) + "&";
        console.log(name, value);
    }
    
    // Remove the trailing '&'
    url = url.slice(0, -1);
    
    // Open the URL (which triggers the email client)
    location.href = url;
});

