import Toast from "react-native-root-toast";

let toast;

export function showToast(msg, options) {
    toast && Toast.hide(toast);
    toast = Toast.show(msg, {
        ...options,
        onHidden: () => {
            // toast && Toast.hide(toast);
            console.warn('end')
        }
    });
}