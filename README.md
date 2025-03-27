
# Project Title

A brief description of what this project does and who it's for


## Overview

This project is a Booking Platform similar to Cult that allows users to register and book available slots for an event. The platform supports optimistic locking to prevent concurrent booking conflicts and ensure data consistency.

The system consists of Users, Events, Event Slots, and Bookings, with the ability to handle waitlists when slots are full.
## Tech Stack

| Component             | Technology                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | JWT (JSON Web Tokens) |
| ORM | Sequelize |


## Setup Instructions 🚀

This is how you can set up your project locally. To get a local copy up plese clone project and follow these steps.

### Prerequisites & Installation Guide 🚀

Before setting up the project, ensure you have the following installed on your system:

1. Node.js (v18 or higher)

2. PostgreSQL (v14 or higher) 

3. Git (Latest version)


### Installation Steps 🔧

```bash
  clone the repository
```

### Install Dependency 🔧

```bash
  yarn
```

### Environment Configuration 🔧

```bash
PORT=5000
DATABASE_URL= postgres://username:password@localhost:5432/bookings_db
JWT_SECRET= your_secret_key
```

## Demo

Coming up


## Deployment

To run this project

```bash
  yarn start
```

