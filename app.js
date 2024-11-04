import express from 'express';
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/add-post', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now().toString(), title, content };
  posts.push(newPost);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find((post) => post.id === req.params.id);
  if (post) {
    res.render('edit', { post });
  } else {
    res.redirect('/');
  }
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
