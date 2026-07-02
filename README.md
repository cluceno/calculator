For this project, I am making a calculator similar styled to the Mac OS calculator. 

The numbers are inputted as strings into the display and then parsed into individual components after pressing equals. The operate function then makes simple calculations using two numbers and a single operator. 

Lessons from this project: 

1. Parsing a string can be difficult. This project required effective use of splice, split, slice, and regex. 
2. A single toggle function can be set in different variables. In this code, the toggle for clear and all clear are on the clear and buttonContainers query selector. 
3. Using @media in CSS for setting different sizing on phones and desktop. 
4. Making sure to set a width or height for justify-content  or align-items to work. 
5. Understanding that I can select a parent with documentQuerySelector and manipulate the children by identifying them by their class. 
6. Inappropriate use of documentQuerySelectorAll can cause unwanted effects and will act on all components selected instead of just one. 