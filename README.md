Pranav Unnikrishnan · Portfolio

A single-page portfolio website for Pranav Unnikrishnan, Architectural & Concept Designer based in Dubai. The site showcases leisure, hospitality and entertainment destinations, masterplans and AI-assisted visualisations, with an interactive project index, filterable gallery, regional atlas and a full-screen image viewer.

Demo portfolio. All renders are by Pranav.

Overview

The portfolio presents 18 projects across 8 countries and four continents, produced during four years of design work in the UAE. It is built as a lightweight static site with no build step and no framework dependencies, so it can be hosted anywhere.

Sections
Section	Description
Hero	Full-bleed rotating render showcase with a "Now showing" caption and progress bars
Ribbon	Scrolling marquee strip of project highlights
About	Introduction, portrait and key statistics
Selected Work	Filterable project index (All, Parks & destinations, Entertainment, Hospitality, Individual work) with hover image previews, followed by detailed project sections
Atlas	Interactive map of project locations, with a legend for portfolio renders, additional work and the Dubai studio base
Experience	Career timeline from site to sketch to screen
Toolkit	AI visualisation, 3D and rendering, and drawing and post-production tools
Behind the Lens	Photography work under THE P STUDIOS
Contact	Email and phone with copy-to-clipboard buttons, plus LinkedIn and location
Features
Category filter chips for the project index
Hover image peek preview
Full-screen lightbox with previous / next navigation and captions
Scroll progress indicator in the header
Interactive project map
One-click copy for email and phone
Responsive layout with a mobile viewport configuration
SEO and social metadata (description, Open Graph title, description and image)
Dark theme colour (
#0D0E0D) for browser chrome
Tech Stack
HTML5: semantic, single-page structure
CSS3: custom properties, responsive layout (css/style.css)
Vanilla JavaScript: no frameworks or bundlers (js/main.js)
Data-driven content: project data lives in js/data.js
Google Fonts: Bricolage Grotesque, Instrument Serif, Manrope, IBM Plex Mono
Project Structure
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js        # Project, map and content data
│   └── main.js        # Rendering, filtering, lightbox, map, interactions
├── images/
│   ├── hero/          # Hero slideshow images (e.g. hero-01-sakura-rooftop.jpg)
│   ├── about/         # portrait.jpg, photographer.jpg
│   └── ...            # Project render folders
└── README.md

Adjust the images/ subfolders to match your actual project folder names.

Getting Started

No installation or build process is required.

Option 1: Open directly

Open index.html in any modern browser.

Option 2: Run a local server (recommended)

A local server avoids path and loading quirks with scripts and images.

bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve .

Then visit http://localhost:8000.

Customisation
Updating projects

Project entries, captions, categories and image paths are defined in js/data.js. Add or edit entries there and the index, project sections, lightbox and filters update automatically. Keep the category keys consistent with the filter chips in index.html (park, ent, hosp, ind).

Updating text and contact details

Edit the relevant sections in index.html:

About copy and statistics: #about
Experience timeline: #experience
Toolkit: #toolkit
Contact details: #contact

If you change the project count, update the "All · 18" chip label and the stats block as well.

Updating images
Replace images/about/portrait.jpg and images/about/photographer.jpg with your own photos.
Replace hero images in images/hero/.
Update og:image in the <head> if the lead hero image changes.
Theming

Colours and typography are controlled by CSS custom properties in css/style.css (for example --lagoon, --amber, --bone, --line). Adjust these to change the look without touching the layout.

Deployment

As a static site, it can be deployed to any static host:

GitHub Pages: push to a repository and enable Pages from the repo settings
Netlify / Vercel: drag and drop the folder, or connect the repository (no build command, publish directory is the project root)
Traditional hosting: upload the files via FTP or a control panel
Before going live
 Replace placeholder/demo notes in the footer if needed
 Use an absolute URL for og:image so social previews work reliably
 Compress images (WebP or optimised JPEG) for faster loading
 Confirm all image paths resolve correctly on the host
 Verify the contact details and external links (LinkedIn, Instagram)
 Add a favicon
Browser Support

Works in current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile.

Credits
Design & renders: Pranav Unnikrishnan
Photography: THE P STUDIOS
Fonts: Google Fonts
Contact
Email: pranavunnikrishnan2324@gmail.com
LinkedIn: pranav-unnikrishnan
Instagram: @thepstudioo
Location: Al Barsha, Dubai, UAE