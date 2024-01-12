import { Accessor, For, JSX, createEffect, createSignal } from 'solid-js'
import { register } from 'swiper/element/bundle'

import styles from './styles.module.scss'

register()

interface SliderProps<P extends readonly any[], I extends JSX.Element> {
  children: (item: P[number], index: Accessor<number>) => I
  items: P | undefined | null | false
  effect: string
  grab: boolean
  onChange?: (item: P[number]) => void
}

export function Slider<P extends readonly any[], I extends JSX.Element>(props: SliderProps<P, I>) {
  const [activeIndex, setActiveIndex] = createSignal<number>(0)
  const onSlideChange = (e: CustomEvent) => {
    setActiveIndex(e.detail[0].activeIndex)
  }

  createEffect(() => {
    if (!props.onChange || !props.items) return
    props.onChange(props.items[activeIndex()])
  })

  return (
    <swiper-container
      class={styles.swiperContainer}
      effect={props.effect}
      grab-cursor={props.grab}
      onSwiperslidechange={onSlideChange}
    >
      <For each={props.items}>
        {(item, index) => (
          <swiper-slide class={styles.swiperSlide}>{props.children(item, index)}</swiper-slide>
        )}
      </For>
    </swiper-container>
  )
}
