import {post} from "@/api/http";

export function apiGetRootList(batchId) {
  return post('portal/processRecord/trace.do', {batchId: batchId});
}
