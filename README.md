# Blackjack

## By Samuel Masters

![Front page as seen on different device screen sizes.](assets/images/front-page.png)

#### This project was developed to act as my second portfolio project, based on JavaScript Essentials, as part of my Diploma in Software Development with Code Institute.

### [Click here to view the website.](https://samuelmasters.github.io/blackjack/)

### [Click here to view the public repository.](https://github.com/SamuelMasters/blackjack)


# Table of Contents:

1. [The Why](#the-why)
2. [User Experience(UX)](#user-experience-UX)
   1. [Target Audience](#target-audience)
   2. [Strategy](#strategy)
   3. [Scope](#scope)
   4. [Structure](#structure)
   5. [Skeleton](#skeleton)
      1. [Wireframes](#wireframes)
   6. [Surface](#surface)
      1. [Colours](#colours)
      2. [Typography](#typography)
      3. [Images & Icons](#images-&-icons)
3. [Features](#features)
   1. [Current Features](#current-features)
   2. [Future Features](#future-features)
4. [Technologies](#technologies)
5. [Testing](#testing)
   1. [Tests](#tests)
   2. [Bugs & Fixes](#bugs-&-fixes)
6. [Deployment](#deployment)
   1. [GitHub Pages](#github-pages)
7. [Credits](#credits)

# The Why

The purpose of the web application is to allow users to play quick rounds of a  simplified version of the popular card game 'blackjack' (AKA 21) against the computer. 

# User Experience (UX)

## Target Audience

- People who are idle for short periods of time.
- People who prefer clean, minimalist interfaces.
- People who are bored and want to play a brief, solo card game. 

## Strategy

To develop a web application that lets users quickly and easily jump into quick-fire rounds of blackjack, even for only a minute or two per session. Key information about how to play and how the application works are presented to the user on the landing page. 

### Project Goals

- To develop a simplified version of blackjack . 
- To inform users who might not already know how to play blackjack about the rules of the game. 
- To enable users to play quick-fire rounds of the game whilst still presenting key information in a way that avoids user confusion. 

## Scope:

The scope of the Blackjack application at the time of submission is as set out by the features below:

- Consistent 'casino green' color scheme across text content and game interface
- Information on how to play the game and the specifics of how this version of the game is played through the web app ('aces high', for example).
- Automatic calculation of hand totals, generation of a virtual 'deck of cards' (values only, no suits) from which values are randomly chosen. 
- Automatic evaluation of the winner of each round. 
- Automatic play by the computer (via JavaScript) which simulates the appearance of stategy. 
- Large, easily accessible buttons that the user can interact with to play the same, view the rules, or start a fresh game.  

If the project were to be revisited in the future, the following features would be considered:

- Image elements of actual cards that would replace the simple numerical values used in this iteration.
- Improved virtual strategy for the computer's turns, rather than the simple controlled randomness of the computer's current logic. 
- Modify the game rules to allow a player to choose whether they want to play an ace as a 11 or 1, rather than having it be automatically assigned. 

## Structure

The application's structure is very simply, and consists of only two main parts; the rules, and the game interface itself, with a simple persistent banner.

- How to Play / Rules

  - Text content informs the user on what the game is, how it is played and won, and how they can interact with the game by via the 'Hit' and 'Stand' buttons. 

- Game Interface

  - The interface itself consists of your opponent (the computer's) section, the player (the user's) section, and two large buttons at the bottom of the page. 


## Skeleton

### Wireframes

- [Mobile](https://github.com/SamuelMasters/local-cleaners-ms1/blob/main/assets/wireframes/home-compressed.png)
- [Desktop](https://github.com/SamuelMasters/local-cleaners-ms1/blob/main/assets/wireframes/services-compressed.png)
- [Functions](https://github.com/SamuelMasters/local-cleaners-ms1/blob/main/assets/wireframes/testimonials-compressed.png)

## Surface

### Colours

Only two main colours were utilised in the design of the website. The hex codes used are below: 

- #F0ECE3, an off-white colour, chosen for it's neutrality and simple background colouring. 
- #302C2D, a dark charcoal colour, was used for all text content of the site. It was chosen as it provided good contrast with the site's universal background colour. 

The contrast between the two means that the text across the site remains easily readable for all users.

---

### Typography

The font [Karla](https://fonts.google.com/specimen/Karla?query=Karla) was used throughout the site. It was chosen for it highly-professional design and simple readability. 

To keep with the theme of simplicity and minimalism, one single font was chosen to be used across the site, and visual variety was provided through sizing, letter spacing and weight. 

For the logo in particular, extra letter-spacing was added to offer some subtle differentiation from the rest of the on-screen text. 

---

### Images & Icons

Icons were used on three out of the four pages that comprise the website. All icons were sourced from [Font Awesome](https://fontawesome.com/). They were used for social media links, as well as providing visual indication of customer ratings. They were also utilised to help provide distinctions between services offered. 

The only image used in the project was used on the front page, and was taken from [Pexels](https://www.pexels.com/photo/housekeepers-standing-back-to-back-and-smiling-9462614/) as a freely available stock image. It was used as a hero image on the front page, and was chosen to help provide users landing on the site's home page with a friendly first impression. 

---

# Features

## Current Features

- Functioning social icons, including a direct email option. 
- Persistent header with navbar and company logo. 
- Contact form for accepting user input. 
- Concise presentation of information regarding services. 

## Future Features

- Add simple animation to page content to invoke a more positive reaction from users. 
- An internal booking system integrated into the website itself, provide users with a way to book the service without leaving the site. 
- Add genuine functionality to the contact form. 

# Technologies

## Languages

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Other Technologies, Frameworks & Libraries

- [Google Fonts](https://fonts.google.com/)
  - Fonts were imported directly into the style sheet. 
- [Font Awesome](https://fontawesome.com/)
  - All icons used in the site were provided by Font Awesome.
- [Balsamic](https://balsamiq.com/)
  - Wireframes were created from original paper sketches, then to Balsamiq, and from there on were used as a reference when creating the core structure of each page. 
- [Canva](https://www.canva.com/colors/color-wheel/)
  - Canva's colour wheel was useful when researching what colours to use for the site. 
- [Favicon.io](https://favicon.io/emoji-favicons/soap/)
  - Favicon.io provided a compatible emoji to use for this site.
- [Pexels](https://www.pexels.com/)
  - Pexels was used to source the hero image used on the home page. 

# Testing

## Tests

### [W3 HTML Validation](https://validator.w3.org/)

All four HTML documents have passed with no errors. 
- [Home](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsamuelmasters.github.io%2Flocal-cleaners-ms1%2Findex.html)
- [Services](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsamuelmasters.github.io%2Flocal-cleaners-ms1%2Fservices.html)
- [Testimonials](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsamuelmasters.github.io%2Flocal-cleaners-ms1%2Freviews.html)
- [Contact Us](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsamuelmasters.github.io%2Flocal-cleaners-ms1%2Fcontact.html)

### [Jigsaw CSS Validation](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fsamuelmasters.github.io%2Flocal-cleaners-ms1%2Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

This project's style.css document has been passed through the CSS validator with no errors, and successfully validates as CSS level 3 + SVG. 

## Browser Compatibility
The website was tested across Chrome, Firefox, and Edge browsers.

- Chrome
![Front page as seen on from the Google Chrome browser.](assets/testing/chrome-test.png)

- Edge
![Front page as seen from the Microsoft Edge browser.](assets/testing/edge-test.png)

- Firefox
![Front page as seen from the Mozilla Firefox browser](assets/testing/firefox-test.png)

## Responsiveness

This project utilised media queries to ensure that the website's design remains acceptable from screen sizes of 335px and upwards.

## Bugs & Fixes

1. Fixed -- W3 HTML Validator Errors
   - When the project's HTML was first run through the validator, it returned an error due to usage of a paragraph tag nested within a unordered list element. This was initially done to provide a space to put the '|' operator in the navigation bar. To fix this error, I simply replaced the paragraph tags with additional list items tags to house the operator instead. 
2. Unresolved -- W3 HTML Validator Warnings
   - At the same time as seeing the errors being returned above, an additional warning was presented, specifying that a section within index.html should include a heading tag somewhere. The section in question however was only containing the hero image, and as such did not require a heading. Therefore, in this instance the warning was left unresolved, but the section was left in to keep semantic distinction.  
3. Unresolved - Firefox Text Rendering
   - During testing, the Firefox browser appeared to render the chosen font in a lighter, thinner style than intended. This appeared to be a problem exclusive to this particular browser, as this issue was not replicated on other browsers. After some research, it appears that the cause of the bug is a difference in the font-rendering engine used for Firefox compared to that of Edge and Chrome. Because of the nature of this issue, I was unable to standardise the font-weights across the browsers. The lighter font weight is consistent across the site on Firefox, however. 

# Deployment

## Gitpod
GitPod was used as the IDE for this project. It can be setup via the following steps:
1. Install the Gitpod browser extension [here](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki).
2. Navigate to your GitHub account and log in. 
3. Navigate to your own repository. 
4. Click the green 'Gitpod' button near the top of the page. 

## Remote deployment

GitHub Pages was used to deploy this project. 

It was achieved via the following steps: 

1. Navigate to your GitHub repository. 
2. Click on 'Settings'. 
3. On the left-hand navbar, click on 'Pages'. 
4. Under 'Source', click on the dropdown menu, and select "main". 
5. Click 'Save'. Wait a few minutes, refresh the page, and a link will be provided at the top of the page with a URL to your website. 

## Cloning the repository

If you wish to clone the repository to make a dynamic copy of this project, you may do so via the following steps: 

1. Navigate to your GitHub account and log in. 
2. Navigate to the [repository](https://github.com/SamuelMasters/local-cleaners-ms1). 
3. Click 'Code', and on the dropdown menu, click the copy icon alongside the provided URL. 
4. Open Gitpod in your own repository, and open a terminal. 
5. Type 'git clone ' followed by the URL you copied in the previous steps.
6. Press Enter to finish cloning of the repository.  

## Forking the repository

If you wish to fork the repository to make a static, independent copy of this project, you may do so via the following steps: 

1. Navigate to your GitHub account and log in. 
2. Navigate to the [repository](https://github.com/SamuelMasters/local-cleaners-ms1). 
3. In the top-right corner, click 'Fork'. 
4. You should now have a copy of the original repository amongst your other repositories. 

Copying a repository in this way allows you to make changes to the code without affecting the original project, and can be useful for experimentation. 

---

# Credits

1. [Code Institute](https://codeinstitute.net/)
   - For providing me with the knowledge and resources to get to this point, which I would not have been able to do otherwise!
2. [MDN Web Docs](https://developer.mozilla.org/en-US/)
   - An incredibly useful reference which was used frequently throughout development of the website.
3. [Chris Quinn](https://github.com/10xOXR)
   - Chris' guidance and direction were a particular help with this, my first portfolio project. Thank you! 
4. [Pexels](https://www.pexels.com/)
   - The [main image](https://www.pexels.com/photo/housekeepers-standing-back-to-back-and-smiling-9462614/) used on the front page of this site was created by [Liliana Drew](https://www.pexels.com/@liliana-drew), and was found on Pexels. The image was marked as 'Free to Use' and was used in accordance with the site's [licensing rules](https://www.pexels.com/license/). 
5. [Favicon.io](https://favicon.io/)
   - The site's favicon was found on the website [favicon.io]() and was used in this project under the [Creative Commons 4.0 license](https://creativecommons.org/licenses/by/4.0/legalcode). The icon was available as part of the open source [Twemoji](https://github.com/twitter/twemoji/blob/master/assets/svg/1f9fc.svg) project. 