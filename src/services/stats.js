import * as request from '@/helpers/request';
import {
  STATISTICS,
  EXCEPTION,
} from '@/constants/url';

export function statistics(data) {
  return request.post(STATISTICS, data);
}

export function exception(data) {
  return request.post(EXCEPTION, data);
}
