import {
    DragEvent,
    SwipeDirection,
    ModalProps,
    ModalFooterProps,
    ModalFooterActionList,
    ModalButtonProps,
    ModalTitleProps,
    ModalContentProps,
    BackdropProps,
} from './modal/type';
import Modal from './modal/Modal';
import DraggableView from './modal/components/DraggableView';
import BaseModal from './modal/components/BaseModal';
import BottomModal from './modal/components/BottomModal';
import Backdrop from './modal/components/Backdrop';
import ModalTitle from './modal/components/ModalTitle';
import ModalFooter from './modal/components/ModalFooter';
import ModalButton from './modal/components/ModalButton';
import ModalContent from './modal/components/ModalContent';
import Animation from './modal/animations/Animation';
import FadeAnimation from './modal/animations/FadeAnimation';
import ScaleAnimation from './modal/animations/ScaleAnimation';
import SlideAnimation from './modal/animations/SlideAnimation';
import WKAlert from "./alert/WKAlert";

Modal.BottomModal = BottomModal;

export {
    DraggableView,
    BaseModal,
    BottomModal,
    Backdrop,
    ModalButton,
    ModalContent,
    ModalTitle,
    ModalFooter,
    Animation,
    FadeAnimation,
    ScaleAnimation,
    SlideAnimation,
    DragEvent,
    SwipeDirection,
    ModalProps,
    ModalFooterProps,
    ModalFooterActionList,
    ModalButtonProps,
    ModalTitleProps,
    ModalContentProps,
    BackdropProps,
    WKAlert,
};

export default Modal;
