# Patterhorn Insider

An NFL blog built with React + Vite. Posts come from two sources, both
exposed through a shared API layer in [`src/api`](src/api):

1. **Our own REST API** powered by [json-server](https://github.com/typicode/json-server),
   serving the four hand-written articles + every user-submitted comment.
   Data lives in [`server/db.json`](server/db.json).
2. **ESPN's public NFL news API** (no key required), which adds live
   articles to the blog every page load.

Comments persist to the local json-server, so they survive refreshes
and are visible to anyone hitting the same dev API.

## Running locally

You need **two** processes running side by side:

```bash
# Terminal 1 - the REST API for posts and comments (port 4000)
npm run server

# Terminal 2 - the React app (port 5173 by default)
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

The frontend talks to `http://localhost:4000` by default. Override with
a `VITE_API_URL` env var in `.env.local` if you host the API elsewhere.

## API endpoints (json-server)

| Method | URL | Description |
|---|---|---|
| GET    | `/posts`                                    | All hand-written posts |
| GET    | `/posts/:id`                                | Single hand-written post |
| GET    | `/comments?postId=:id&_sort=createdAt&_order=desc` | Comments for a post |
| POST   | `/comments`                                 | Create a comment |

ESPN articles are fetched directly from
`https://site.api.espn.com/apis/site/v2/sports/football/nfl/news` in the
browser and merged with the local posts in
[`src/api/postsApi.js`](src/api/postsApi.js).

## Project structure

```
server/db.json                  # local API data (posts + comments)
src/api/nflApi.js               # ESPN fetch + normalization
src/api/postsApi.js             # merges local + ESPN posts
src/api/commentsApi.js          # json-server CRUD for comments
src/components/blog/            # BlogList, BlogPost, CommentSection, CommentForm
src/pages/                      # HomePage, BlogPostsPage, IndividualPostPage, ...
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev`     | Start Vite dev server |
| `npm run server`  | Start json-server on port 4000 watching `server/db.json` |
| `npm run build`   | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint |
