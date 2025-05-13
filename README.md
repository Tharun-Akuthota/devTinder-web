# DevTinder Front-End

- Created a vite + react project using `npm create vite@latest`
- npm install and created a hello world
- setup tailwind css using react
- add config content and add @tailwind in index.css file
- install and setup daisy UI
- Add Navbar component to App.js or create navbar.js
- install React Router dom library using `npm i react-router-dom` and add to main.jsx
- Create BrowserRouter > Routes > Route => Route Children
- Make an Outlet in your Body component
- Create a Footer in body component

- Create Login Page
- Install axios
- CORS - install cors in backend => add middleware with configurations: origin, credentials
- Whenever making API call, pass axios => { withCredentials: true}
- If we don't pass the axios, it'll not send the token back.
- Install Redux toolkit + react redux => create a createStore => add a Provideer => createSlice => add reducer to store
- Add redux toolkit tools
- NavBar should update as soon as user log in
- Refractor code to const files and component folders

- You should not use other routes without login
- If token is not present redirect user to login page
- Logout, Profile pages
- Profile form and toast
- Edit profile feature
- Make a dropdown for gender and text area for about

- Connections page
- Requests page
- Accept/Reject connection request
- Send/ ignore request from feed
- Sign Up and Login Toggle

# Deployment

- AWS account and EC2

- instance with ubuntu, t2.micro, create a key .pem file
- connect with ssh to terminal
  - chmod 400 "devTinder.pem"
- Install node to ssh using -> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
- install node version -> nvm install <version>
- add repos to the instance using git clone

- Fronend

  - install dependecies
  - build project using `npm run build`
  - `sudo apt update` to update the system
  - `sudo apt install nginx`to install nginx
  - start and enable nginx `sudo systemctl start nginx` & `sudo systemctl enable nginx`
  - Copy code from dist (build files) to nginx /var/www/html
    - `sudo scp -r dist/* /var/www/html`
  - Enable port :80 of your instance to use public ip

- Backend

  - allowed EC2 instance public IP on mongoDB
  - installed pm2 `npm install pm2 -g`
  - to start server 24/7 use `pm2 start npm -- start`
  - pm2 logs helps to
  - pm2 list,pm2 flush <name>, pm2 delete <name>, pm2 stop <name>
  - to give custom name to pm2 `pm2 start npm --name "devTinderBackend" -- start`
  - config nginx - `sudo nano /etc/nginx/sites-available/default`
  - to restart nginx `sudo systemctl restart nginx`
  - modify BASE_URL in front end project to "/api"
  - do git pull everytime made changes from local to server
  - and build it again, copy to nginx/
  - add AWS IP to mongoDB

- add dotenv file to server `sudo nano .env`

# nginx config

    Frontend = http://43.204.96.49/
    Backend = http://43.204.96.49:7777/

    Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

      nginx config :

      server_name 43.204.96.49;

      location /api/ {
          proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }

# Domain

- buy domain from godaddy
- DNS, registrar, cloudflare, change nameservers to cloudflare
- DNS record point A to instance IP
- Enable SSL/TLS- flexible for website

# Send email to User

- Amazon SES - simple email service

# Build chat using websockets(socket.io)

- Auth for socket.io

- low latency, bidirectional and event based
