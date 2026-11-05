import test from "node:test";
import assert from "node:assert/strict";

function isAllowedMediaUrl(input) {
  try {
    const url = new URL(input);
    return ["https:", "http:"].includes(url.protocol) && !["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  } catch { return false; }
}

test("allows public http and https media URLs", () => {
  assert.equal(isAllowedMediaUrl("https://cdn.example.com/video.mp4"), true);
  assert.equal(isAllowedMediaUrl("http://cdn.example.com/video.mp4"), true);
});
test("rejects malformed, non-http and local URLs", () => {
  assert.equal(isAllowedMediaUrl("javascript:alert(1)"), false);
  assert.equal(isAllowedMediaUrl("not-a-url"), false);
  assert.equal(isAllowedMediaUrl("http://localhost:4000/private"), false);
});
