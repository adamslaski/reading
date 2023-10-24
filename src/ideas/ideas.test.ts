import { ideas } from "./ideas";

test("all names are pairways different", () => {
  const set = new Set([...ideas].map(idea => idea.word));
  expect(ideas.length).toBe(set.size);
});


test("all urls are pairways different", () => {
  const set = new Set([...ideas].map(idea => idea.url));
  expect(ideas.length).toBe(set.size);
});