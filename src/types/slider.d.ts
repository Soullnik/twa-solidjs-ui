import 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': any
      'swiper-slide': any
    }
  }
}
