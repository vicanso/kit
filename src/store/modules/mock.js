import {
  MOCKS,
  MOCKS_UPDATE,
} from '@/http/apis';
import * as http from '@/http';


// 获取mock配置列表
const mockList = async () => {
  const res = await http.get(MOCKS);
  return res;
};

// 保存mock配置
const mockAdd = async (tmp, data) => {
  const res = await http.post(MOCKS)
    .send(data);
  return res;
};

// 更新mock
const mockUpdate = async (tmp, { id, data }) => {
  const res = await http.patch(MOCKS_UPDATE.replace(':id', id))
    .send(data);
  return res;
};

export const actions = {
  mockList,
  mockAdd,
  mockUpdate,
};

export default {};
