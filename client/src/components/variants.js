export const modalContainerVariant = {
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren"
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: "beforeChildren"
        }
    }
}

export const modalVariant = {
    hidden: {
        y: '-70vh',
    },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
        }
    }
}