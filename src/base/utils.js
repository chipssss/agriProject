import {SERVER} from "@/base/constants";

export function getImage(url) {
  return SERVER.IMAGE_BASE + url;
}
