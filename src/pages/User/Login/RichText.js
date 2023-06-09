
import { useModel, history } from 'umi';
import * as services_login from '@/services/login';



const RichtText = () => {
  const { initialState: { settings, setToken, setUnionuser }, refresh } = useModel('@@initialState');

  return (
    <div>

      这里其实是个富文本

    </div>
  );
};
export default RichtText
