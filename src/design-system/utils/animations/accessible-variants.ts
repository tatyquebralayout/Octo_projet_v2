import { Variants } from 'framer-motion';

// Tipo para o objeto de variantes acessíveis
export interface AccessibleVariants {
  /** Variantes padrão com animação completa */
  standard: Variants;
  /** Variantes para movimento reduzido */
  reduced: Variants;
}

/**
 * Variantes de Fade: fade in/out com opções para movimento reduzido
 */
export const fadeVariants: AccessibleVariants = {
  standard: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes de Slide: slide in/out com opções para movimento reduzido
 */
export const slideVariants: AccessibleVariants = {
  standard: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes de Scale: scale in/out com opções para movimento reduzido
 */
export const scaleVariants: AccessibleVariants = {
  standard: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1.4] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes de Flip: flip in/out com opções para movimento reduzido
 */
export const flipVariants: AccessibleVariants = {
  standard: {
    hidden: { 
      opacity: 0, 
      rotateX: 90,
      transformPerspective: 1000
    },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    },
    exit: { 
      opacity: 0, 
      rotateX: 90,
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes de Slide Horizontal: slide in/out da esquerda/direita com opções para movimento reduzido
 */
export const slideHorizontalVariants: AccessibleVariants = {
  standard: {
    hiddenLeft: { 
      opacity: 0, 
      x: -20 
    },
    hiddenRight: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
    },
    exitLeft: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    },
    exitRight: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hiddenLeft: { opacity: 0 },
    hiddenRight: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exitLeft: { 
      opacity: 0,
      transition: { duration: 0.1 }
    },
    exitRight: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes para Menu/Dropdown: otimizadas para elementos de UI interativos
 */
export const menuVariants: AccessibleVariants = {
  standard: {
    hidden: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      pointerEvents: 'none' as 'none'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      pointerEvents: 'auto' as 'auto',
      transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      pointerEvents: 'none' as 'none',
      transition: { duration: 0.15, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { 
      opacity: 0, 
      pointerEvents: 'none' as 'none'
    },
    visible: { 
      opacity: 1, 
      pointerEvents: 'auto' as 'auto',
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0, 
      pointerEvents: 'none' as 'none',
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes para notificações tipo Toast: otimizadas para feedback de usuário
 */
export const toastVariants: AccessibleVariants = {
  standard: {
    hidden: { 
      opacity: 0, 
      y: -20, 
      scale: 0.9,
      height: 'auto'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { 
      opacity: 0,
      height: 'auto'
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      height: 'auto',
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes para Drawer/Sidebar: otimizadas para painéis laterais
 */
export const drawerVariants: AccessibleVariants = {
  standard: {
    hidden: { 
      x: '-100%'
    },
    visible: { 
      x: 0,
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
    },
    exit: { 
      x: '-100%',
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { 
      x: '-100%'
    },
    visible: { 
      x: 0,
      transition: { duration: 0.1 }
    },
    exit: { 
      x: '-100%',
      transition: { duration: 0.1 }
    }
  }
};

/**
 * Variantes para Modal/Dialog: otimizadas para diálogos modais
 */
export const modalVariants: AccessibleVariants = {
  standard: {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: -10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 10,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
    }
  },
  reduced: {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  }
}; 