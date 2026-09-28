# Mail Client 

A single-page email client built with Django, JavaScript, HTML, and CSS. The application allows users to send, receive, view, archive, and reply to emails through an API.

## About the Project

I built this project as part of **CS50's Web Programming with Python and JavaScript** by Harvard University.

The project is a single-page email client where users can manage their emails without loading a new page for every action. JavaScript is used to communicate with the API and update the interface dynamically.

Emails are stored in the application's database rather than being sent through real email servers.

## Features

* User registration and login
* Inbox, Sent, and Archive mailboxes
* Sending emails
* Viewing individual emails
* Marking emails as read or unread
* Archiving and unarchiving emails
* Replying to emails
* Dynamic single-page interface
* API requests using JavaScript
* Email information stored in the database

## Technologies

* Python
* Django
* JavaScript
* HTML
* CSS
* SQLite
* JSON API

## How It Works

After logging in, users can navigate between their Inbox, Sent, and Archive mailboxes.

JavaScript sends requests to the provided API to load emails, send new messages, update email status, and retrieve individual messages.

When an email is opened, the application displays the sender, recipients, subject, timestamp, and message body. The email is also marked as read.

Users can archive received emails or remove them from the archive. They can also reply to an email, with the recipient and subject automatically prepared based on the original message.

## What I Practiced

While working on this project, I practiced:

* Working with Django
* Building a single-page web interface
* Using JavaScript to interact with APIs
* Sending `GET`, `POST`, and `PUT` requests
* Working with JSON data
* Manipulating the DOM
* Handling JavaScript events
* Updating the interface dynamically
* Working with email-related data
* Managing application state

## What I Learned

This project helped me understand how JavaScript can communicate with a backend API and update a web page without requiring a full page reload.

I also gained more experience with asynchronous requests, DOM manipulation, event handling, and building interactive web interfaces.

## Course

This project was completed as part of **CS50's Web Programming with Python and JavaScript** by Harvard University.
