Assignment Category: assignment12_category_0001

Website Name: Byte Talks

Admin name: Byte Talks Admin

Admin email: admin@bytetalksforum.com

Admin password: 1234567Admin$

Front-end Live Site Link (firebase): https://online-forum-auth.web.app/

Alternative Front-end Live Site Link (Netlify): https://6568625c76ceac0fcdbeb58e--fantastic-cuchufli-23144a.netlify.app/

Server Side Vercel Live Link (alternative, if requires): https://online-forum-server-ten.vercel.app/

Website Features:

The main theme of this website is about an online forum where the people can make conversations with each other in the form of posted messages. The website is developed by using React, React Router, Node, MongoDB, Tailwind CSS and other necessary tools. The main features of this website are: 
*The home page has a nav bar with website name and logo, menu and join us button. There is a banner which has a search functionality. User can search posts by using tags. 
*At home page, there is a section where posts are shown. Pagination has been implemented here. Every page shows only 5 posts. A drop menu has been implemented by using tags for searching posts.
*If the admin announce something, user can see it at the home page after login. A notification icon has been developed for seeing notification or announcement counts. 
*User can login or register by join us button. Password validation added. Password be like: 1234567Example$. Google sign in is also implemented.
*There are two types of user. Bronze badge (general user) and Gold badge (paid user). Bronze badge user can posts only 5 post. To create more post the user must be paid member and get a gold badge. React Stripe payment method implemented in membership page. 
*Normal user can visit his dashboard. Here the user can see his profile, create posts, visit post comments. If the user thinks that the comment is not suitable for the user, then he can report. At first the user will select a feedback from drop down and clicks the button then report button will be enabled. If the user reports then a details form will be shown as modal, the user has to write details why he wants to report. Then the form will be submitted to admin. After the proper investigation, admin can take action against the commenter. The report details will be shown in admin dashboard. Admin can delete the commenter from the forum as the action. 
*Admin dashboard is different from the user. Here the admin profile has a pie chart analysis of the total users, number of posts and number of comments. A tag form also implemented here. 
*Admin can manage users, see the report details from the admin dashboard. There is an announcement page where admin can announce something to the forum users.