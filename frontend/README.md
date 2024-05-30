# Engineering Assessment

### Introduction

I have created a small map app to display some markdowns and map the food services with STATUS = "APPROVED" in the database. I didn't handle duplications, and I assumed your current location to be San Francisco downtown (although I've never been there). The app displays a list at the bottom, where you can search for a place name or food, and clicking on an item will redirect you to it.

- Initially, I thought of creating an autocomplete feature in the header. However, I found it to be less user-friendly as it only provided the place name. So, I changed it to an input field in the bottom list, which includes more details.
- I also considered creating a backend Node.js app to serve the data. However, it seemed unnecessary as the frontend could handle the data well.
- I wish I had more time to add tests. I would have liked to showcase my testing skills, but it can be done later in the process.
- The poor UI makes me uncomfortable to share it, but improving the user experience would require more time than expected for this task.

### How to run

To run the project you gonna have NodeJS installed in your machine, the version used to develop was 22.1.0 and npm 10.7.0, after confirm it please go to the repository at the directory you cloned and then run the following commands:

```bash
npm ci && npm run dev
```

After the command finishes notice the terminal output where it shows an url you can follow to access the application, in any case the default url is:

```
http://localhost:5173/
```
