# Full Stack open

## part 3.b Deploying app to internet

Folder structure

```
|-backend [copied from part-3-a]
  |-index.js
|-frontend [copied from part2-e]
  |-src
    |-component
    |-services
    |-App.jsx
```

### `part3b.1` Added CORS to backend as middleware

```bash
npm install cors
```

Then:

```js
const cors = require("cors");
app.use(cors());
```

### `part3b.2` Added all functionality to talk to frontend by backend

### `part3b.3` Build Single page application i.e. Build frontend and added to backend.

### `part3b.4` Added proxy to vite config file, relative url, and added build:ui script

- we don't need to use CORS while using vite proxy. Removed from backend server.js
