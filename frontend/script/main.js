import { loginPage } from './pages/login'
import '../style.scss'

function init() {
    const app = document.getElementById('app');
        loginPage(app);
}

init();