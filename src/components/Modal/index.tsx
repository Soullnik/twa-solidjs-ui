import {
  Accessor,
  ParentComponent,
  Setter,
  Show,
  createEffect,
  createSignal,
  on,
  onCleanup,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import { useMainButton } from '../../hooks'
import { TiDelete } from 'solid-icons/ti'

import styles from './styles.module.scss'

type ModalProps = {
  position: 'top' | 'bottom'
  buttonText?: string
  setIsOpen: Setter<boolean>
  isOpen: Accessor<boolean>
}

export const Modal: ParentComponent<ModalProps> = props => {
  let swipeElement: HTMLDivElement | undefined
  const [startY, setStartY] = createSignal<number>(0)
  const [offsetY, setOffsetY] = createSignal<number>(0)
  const mainButton = useMainButton()

  onCleanup(() => {
    if (mainButton) {
      mainButton().hide()
      mainButton().off('click', handleCloseModal)
    }
  })

  createEffect(
    on(props.isOpen, isOpen => {
      if (isOpen) {
        if (mainButton) {
          if (props.buttonText) {
            mainButton().setText(props.buttonText)
            mainButton().on('click', handleCloseModal)
            mainButton().show()
          } else {
            mainButton().hide()
          }
        }
      }
    }),
  )

  // createEffect(() => {
  //   const handleTouchMove = (e: TouchEvent) => {
  //     e.preventDefault();
  //   };
  //   const element = swipeElement;
  //   if (element) {
  //     element.addEventListener("touchmove", handleTouchMove, {
  //       passive: false,
  //     });
  //   }
  // });

  const handleTouchStart = (e: TouchEvent) => {
    const touchStartY = e.touches[0]?.clientY || 0
    setStartY(touchStartY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (startY() == null) return

    const currentY = e.touches[0]?.clientY || 0
    const diffY = currentY - startY()
    if (diffY < 0) return

    setOffsetY(diffY)
  }

  const handleTouchEnd = () => {
    if (offsetY() > 100) {
      props.setIsOpen(false)
    }
    setOffsetY(0)
    setStartY(0)
  }

  const handleCloseModal = () => {
    props.setIsOpen(false)
  }

  return (
    <Show when={props.isOpen()}>
      <Portal>
        <div class={styles.modal}>
          <div
            class={styles.container}
            style={{ transform: `translateY(${offsetY()}px)` }}
            ref={swipeElement}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div class={styles.header}>
              <div class="modal-header">
                <div class="modal-close" onClick={() => handleCloseModal()}>
                  <TiDelete class={styles.close} onClick={() => handleCloseModal()} size={30} />
                </div>
                <div class={styles.title}>
                  <span>Details</span>
                </div>
              </div>
              <div class="modal-content">{props.children}</div>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  )
}
