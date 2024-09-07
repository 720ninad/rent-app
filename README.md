# rent-app

**Tech Stack** -
* Frontend - Angular
* Backend - Nestjs, PostgreSQL, Sequilize orm



---

### Setup - 

* #### Prerequisite 
    * [Node](https://nodejs.org/en/download/package-manager)

* #### Starting the server
    * Navigate to server folder 
    * Run the following command to build and start postgres container in detach mode
        ```bash
        npm i
        ```

    * Set DB details in server/src/app.module.ts
      username: 'your-user-name',
      password: 'your-password',
      database: 'your-db-name',

    * after adding db details run
      ```bash
        npm run migration
        ```
    * now enter command to start server
      ```bash
        npm run start
        ```

* #### Starting the client

    * Navigate to client folder
    * Run the following command to install all dependencies
        ```bash
        npm install
        ```

    * Run the following command to run the react client
        ```bash
        npm start
        ```

---

**Notes** -
* Major views - Shop, Customer, Delivery
* Shop account can post products to app for rent
* Customer account can rent products from app
* Delivery account can see details of delivery assigned to them of rented products
* Free delivery from our app
* Payment gateway
* monthly/weekly/daily rent details 

* Shop Screen -
    * Create shop account
    * Add products
    * Current Orders
    * Ongoing Rents
    * Inventory

* Customer Screen -
    * My orders
    * Rent Details
    * Products Search
    * Delivery staus
    * My account
    * Add to cart
    * Payment screen

**UI/UX Reference** - ![rent-app](https://github.com/gorvk/rent-app/assets/52004037/314ca415-f093-4648-819a-4bc1055fc94f)

**Rough Designs** -![Untitled-2024-02-16-0051 excalidraw(1)](https://github.com/gorvk/rent-app/assets/52004037/1ac51d1d-61df-425b-b356-1930b993b6d5)
