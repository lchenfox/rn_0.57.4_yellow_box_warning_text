import {Toast, Portal} from "./components/index";

let key = 0;

export default class WKToast {

    static show = (content, mask = false, duration = 1.8) => {
        if (!content) {
            return;
        }
        if (!duration) {
            duration = 1.8;
        }
        key = Toast.show(content, duration, mask);
    };

    static hide = () => {
        Portal.remove(key);
    };

}