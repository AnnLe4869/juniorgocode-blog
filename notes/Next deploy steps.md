# Steps to deploy Strapi to DigitalOcean

1. Basic setup

   See [Strapi setup](/notes/Strapi%20deploy%20steps.md) from step 1 through 8. Except we don't need to install and setup PostgreSQL.

   In summary, these are things we need to to:

   - Ubuntu basic setup, including public-private key authentication with local machine
   - Install git and setup remote authentication with GitHub (via SSH)
   - Install Node
   - Clone our NextJS project from GitHub
   - Install all dependencies with `npm install`
   - Build our NextJS app with `npm run build`
   - Start out NextJS app with `npm start`
   - Check whether our NextJS app actually running by going to our remote machine public IP with correct port. In our case NextJS run at port 3000

   Quick note here:

   - Some steps above may be done already so no need to repeat them again
   - If we use Strapi or other headless CMS as resource then we need to build them first before building our NextJS app, otherwise Next cannot fetch data from those headless CMS
   - In case we already setup Nginx for the local machine, we most likely cannot access our NextJS app via public IP address. In this case in our terminal try using `curl` and see if we can fetch some actual data

   ---> **Is working** now and should be ready for Nginx set up

2. Configure Nginx

   Follow the instruction in [NGINX config](https://github.com/AnnLe4869/strapi-deploy-test/blob/main/notes/NGINX%20config.md) and [Nginx with Node](https://github.com/AnnLe4869/strapi-deploy-test/blob/main/notes/Nginx%20with%20Node.md) and [Nginx with dynamic route](https://github.com/AnnLe4869/strapi-deploy-test/blob/main/notes/Nginx%20with%20Dynamic%20route.md)

   In particular, here is what we need to do:

   - Install Nginx
   - Remove the default config file `/etc/nginx/sites-enabled/default`
   - At the moment don't set firewall yet since we want to make sure our app is working
   - Create a file in `/etc/nginx/sites-available` and named it `next-config`
   - In `/etc/nginx/sites-available/next-config` write the following:

     ```bash
     server {
         listen 80;
         listen [::]:80;

         server_name 147.182.229.222; # This is our server public IP address and we can change it to domain name

         location / {
                 proxy_pass http://127.0.0.1:3000; # 127.0.0.1 is self-inferred IP address and 3000 is the port Next use
                 try_files $uri $uri/ =404; # Can comment out this one in development
         }
      }
     ```

   - Create a link to our `/etc/nginx/sites-available/next-config` in directory `/etc/nginx/sites-enabled` by running

     ```bash
     ln -s /etc/nginx/sites-available/next-config   /etc/nginx/sites-enabled/
     ```

   - Test to make sure there is no syntax error in our config file by running

     ```bash
     nginx -t
     ```

   - Restart Nginx to enable your changes by running

     ```bash
     systemctl restart nginx
     ```

     ---> **FAILED** because We can see the content of the post but the image is broken. The image having 500 Internal Server Error

## Error identifying

Possible reasons:

- The config in `/etc/nginx/sites-available/next-config` doesn't specify the path for image file.

Solutions:

- Edit the config file into:

  ```bash
  location /_next/ {
      alias /root/next-strapi-deploy-test/.next/;
  }
  ```

  ---> The image still not load. The image has different error than before: 403 Forbidden
  ---> Maybe we need to move the file out of /root directory ?

- Move the whole app `next-strapi-deploy-test` to `/var/www` and change the `/etc/nginx/sites-available/next-config` to

  ```bash
  server {
       listen 80;
       listen [::]:80;

       server_name 147.182.229.222; # This is our server public IP address and we can change it to domain name

        location /_next/static/ {
            alias /var/www/next-strapi-deploy-test/blog-next/.next/static/;
        }

       location / {
               proxy_pass http://127.0.0.1:3000; # 127.0.0.1 is self-inferred IP address and 3000 is the port Next
       }
  }
  ```

  ---> The image still not load. The image has different error than before: 404 Not Found
  ---> Maybe the `alias` route is incorrect

- Start the Strapi server. We didn't start it before.

  ---> It is working now and we can see the image.

## PM2 set up

- If you didn't install PM2 before, run `npm install pm2@latest -g`. Let no install `build-essential` package for experiment purpose to see whether we need it or not.

- Create a configuration file to organize multiple processes of PM2. This is more convenient in case of multiple processes since we can specify many properties of an app that unique for that app only. For example, environment variable (env), additional arguments, how we want to start the app (for example, React app has to start with `npm start`), etc.

  On how to set up the config file, [follow the instruction on PM2 config](https://github.com/AnnLe4869/strapi-deploy-test/blob/main/notes/PM2%20Config%20for%20Node%20app.md)

- Edit the `ecosystem.config.js` as followed:

  ```js
  module.exports = {
    apps: [
      {
        name: "blog-strapi",
        cwd: "/var/www/next-strapi-deploy-test/blog-strapi",
        watch: true,
        script: "npm",
        args: "start",
      },
      {
        name: "blog-strapi",
        cwd: "/var/www/next-strapi-deploy-test/blog-next",
        watch: true,
        script: "npm",
        args: "start",
      },
    ],
  };
  ```

---> A working Next with Strapi app now

## Modification

1. At the moment, we got the error

   > GET http://147.182.229.222/_next/data/3b4m0u8RlJGay0SENWMMM/sixth-post.json 404 (Not Found)

   This suggest that our Nginx config file has to change.

   Let try changing it to:

   ```bash
    server {
       listen 80;
       listen [::]:80;

       server_name 147.182.229.222; # This is our server public IP address and we can change it to domain name

        location /_next/ {
            alias /var/www/next-strapi-deploy-test/blog-next/.next/;
        }

       location / {
               proxy_pass http://127.0.0.1:3000; # 127.0.0.1 is self-inferred IP address and 3000 is the port Next
       }
   }
   ```

   ---> Make the app fail badly as now both the json file and image file become unable to render

2. Try the image route

   ```bash
   location ~* \.(?:ico|svg|woff|woff2|ttf|otf|css|js|gif|jpe?g|png)$ {
                  proxy_pass http://127.0.0.1:3000;

                  proxy_http_version 1.1;
          }
   ```

   ---> Image work but json file still 404

3. Error is in the `NextJS` part itself and not caused by Nginx

   After going to the port itself - which mean the app in raw without going through Nginx, we see that the error about `json` file still pertains, which suggests something is wrong with the NextJS server.

   ---> Rerun `npm run build` and then `npm start` fix this problem. Now everything is up and running and no error

4. Now reduce the config to just

   ```bash
   server {
        listen 80;
        listen [::]:80;

        server_name 147.182.229.222; # This is our server public IP address and we can change it to domain name


        location / {
          proxy_pass http://127.0.0.1:3000;

          # The entire setting below can be skipped and our app can work still PROPERLY
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_pass_request_headers      on;
          proxy_cache_bypass $http_upgrade;
        }
   }
   ```

   ---> And the app work fine without any 404 and image work just fine.

## LESSONS

- When encounter a problem, before trying to solve it, make a list of what can cause this error from the most likely to least likely. Then check out one by one, from the **LEAST EFFORT** to check to the **MOST EFFORT** to check.

- Always find a way to check the log and error message. Guessing where it went wrong without any solid error message will lead to nowhere. For Nginx, the log is in `/var/log/nginx` and to set up log format we don so in `/etc/nginx/nginx.conf`

- The error log for Nginx will log error if the error is valid. If the error belong to the web server itself (in our case it's NextJS) then it won't log the message. You can check this out by changing the config on field `proxy_pass` and see how error log record error

- Have to know how to log the error message and request.

- Have to know how to clean up the error message

- Any files in `/pages` of NextJS should only start with lowercase and not uppercase
