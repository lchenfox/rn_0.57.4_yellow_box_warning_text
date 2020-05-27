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
} from './lib/modal/type';
import Modal from './lib/modal/Modal';
import DraggableView from './lib/modal/components/DraggableView';
import BaseModal from './lib/modal/components/BaseModal';
import BottomModal from './lib/modal/components/BottomModal';
import Backdrop from './lib/modal/components/Backdrop';
import ModalTitle from './lib/modal/components/ModalTitle';
import ModalFooter from './lib/modal/components/ModalFooter';
import ModalButton from './lib/modal/components/ModalButton';
import ModalContent from './lib/modal/components/ModalContent';
import Animation from './lib/modal/animations/Animation';
import FadeAnimation from './lib/modal/animations/FadeAnimation';
import ScaleAnimation from './lib/modal/animations/ScaleAnimation';
import SlideAnimation from './lib/modal/animations/SlideAnimation';
import WKAlert from "./lib/alert/WKAlert";

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
