import { ParentComponent, createSignal, onCleanup, onMount } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { useBackButton } from '../../hooks'

export const PageTransition: ParentComponent = ({ children }) => {
  const [direction, setDirection] = createSignal<'in' | 'out'>('in')
  const bb = useBackButton()

  const getOnEnterTransform = () => {
    return direction() === 'in' ? `translate(100%)` : `translate(-100%)`
  }

  const getOnExitTransform = () => {
    return direction() === 'in' ? `translate(-100%)` : `translate(100%)`
  }

  const onButtonClick = () => {
    setDirection('out')
  }

  onMount(() => {
    bb().on('click', onButtonClick)
  })

  onCleanup(() => {
    bb().off('click', onButtonClick)
  })

  return (
    <Transition
      mode="outin"
      onBeforeEnter={el => {
        if (el instanceof HTMLElement) el.style.opacity = '0'
      }}
      onEnter={(el, done) => {
        el.animate(
          [
            {
              opacity: 0,
              transform: getOnEnterTransform(),
            },
            { opacity: 1, transform: 'translate(0%)' },
          ],
          { duration: 200, fill: 'both' },
        )
          .finished.then(() => {
            setDirection('in')
            done()
          })
          .catch(done)
      }}
      onExit={(el, done) => {
        el.animate(
          [
            { opacity: 1, transform: `translate(0%)` },
            {
              opacity: 0,
              transform: getOnExitTransform(),
            },
          ],
          { duration: 200 },
        )
          .finished.then(done)
          .catch(done)
      }}
    >
      {children}
    </Transition>
  )
}
