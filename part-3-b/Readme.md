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
