import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import Loading from './Loading.jsx';
import { modalContainerVariant, modalVariant } from './variants';

function Modal() {
    return ReactDOM.createPortal(
        <motion.div
        variants={modalContainerVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
        className='fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-black/50 z-10'>
            <motion.div
            variants={modalVariant}
            className="rounded-2xl text-white z-20 bg-gradient-to-br from-violet-800 to-indigo-900 w-[60%] py-16 text-center text-2xl font-semibold px-4">
                    <div>Converting...</div>
                    <div className='h-64 flex w-full justify-center items-center'>
                        <Loading />
                    </div>
                    
            </motion.div>
        </motion.div>,
        document.getElementById('portal')
    );
}

export default Modal;