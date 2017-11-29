import {
  SETTINGS,
  SETTINGS_UPDATE,
} from '@/http/apis';
import * as http from '@/http';

const settingList = async () => {
  const res = await http.get(SETTINGS)
    .noCache();
  return res;
};


// 更新setting
const settingUpdate = async (tmp, { id, data }) => {
  const res = await http.patch(SETTINGS_UPDATE.replace(':id', id))
    .send(data);
  return res;
};

const settingAdd = async (tmp, data) => {
  const res = await http.post(SETTINGS)
    .send(data);
  return res;
};

export const actions = {
  settingList,
  settingUpdate,
  settingAdd,
};

export default {};
