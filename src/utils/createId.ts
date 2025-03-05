import { storage } from "./storage";

export const createId = (() => {
  let lastId = Number(storage.getItem("id-tracker")) || 1;
  storage.setItem("id-tracker", ++lastId);
  return () => lastId;
})();
