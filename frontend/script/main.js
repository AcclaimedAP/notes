import { loginPage } from './pages/login'
import '../style.css'

function init() {
    const app = document.getElementById('app');
        loginPage(app);
}

init();