import Admin from '../components/admin/admin';
import Compatibility from '../components/admin/compatibility';
import Import from '../components/admin/import';
import Lines from '../components/admin/lines';
import Moderation from '../components/admin/moderation';
import Profile from '../components/admin/profile';
import ProfileAdd from '../components/admin/profileAdd';

export default [
    {path: 'table', elem: <Admin />},
    {path: 'lines', elem: <Lines />},
    {path: 'import', elem: <Import />},
    {path: 'moderation', elem: <Moderation />},
    {path: 'profile', elem: <ProfileAdd />},
    {path: 'profile/:user_id', elem: <Profile />},
    {path: 'compatibility/:user_id', elem: <Compatibility />},
]
