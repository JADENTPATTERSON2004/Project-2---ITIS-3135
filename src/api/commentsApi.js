import axios from "axios";

/**
 * Comments API \u2014 backed by our local json-server.
 *
 * Endpoints used:
 *   GET  /comments?postId=:id&_sort=createdAt&_order=desc
 *   POST /comments
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

/**
 * Fetch all comments for a given post, newest first.
 */
export async function fetchComments(postId) {
  const { data } = await axios.get(`${API_URL}/comments`, {
    params: {
      postId: String(postId),
      _sort: "createdAt",
      _order: "desc",
    },
  });
  return Array.isArray(data) ? data : [];
}

/**
 * Create a new comment for a post.
 */
export async function createComment({ postId, name, text }) {
  const trimmed = (text || "").trim();
  if (!trimmed) throw new Error("Comment text is required");

  const { data } = await axios.post(`${API_URL}/comments`, {
    postId: String(postId),
    name: name || "Anonymous",
    text: trimmed,
    createdAt: new Date().toISOString(),
  });
  return data;
}
