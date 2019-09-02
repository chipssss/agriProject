import {get, post} from "@/api/http";

export function apiGetRootList(batchId) {
  return post('portal/processRecord/trace.do', {batchId: batchId});
}


export function apiRootGetUnGeneratedBatchList() {
  return new Promise((resolve, reject) => get('portal/processRecord/getBatchesGenerated.do')
    .then(res => resolve(res.unGenerated)).catch(reject));
}

/**
 * batchId  int(10)  否    批次id
 pageNum  int(10)  否    页码
 pageSize  int(10)  否    页容量
 */
export function apiRootGetRecordUnTrace(object) {
  return post('portal/processRecord/getRecordsUngenratedByBatch.do', object);
}
