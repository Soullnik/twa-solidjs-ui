import { Component, JSX, ParentComponent, Show, children, createSignal } from 'solid-js'
import { useNavigator } from '../../providers'
import { PageTransition } from '../PageTransition'
import { BackButton } from '../BackButton'
import { MainButton } from '../MainButton'
import { Progress } from '../Progress'
import styles from './styles.module.scss'

interface StepProps {
  title?: string
  children: JSX.Element
  onNext: () => boolean | Promise<boolean>
  buttonTitle: string
}

export const Step: Component<StepProps> = props => {
  return props as unknown as JSX.Element
}

export const Wizard: ParentComponent = props => {
  const steps = children(() =>
    Array.isArray(props.children) ? props.children : [props.children],
  ) as unknown as () => StepProps[]
  const [stepIdx, setStepIdx] = createSignal<number>(0)
  const navigator = useNavigator()
  const nextStep = async () => {
    const step = steps()[stepIdx()]
    if (!step) return
    const currentValidation = await step.onNext()
    if (currentValidation && stepIdx() < steps().length - 1) {
      setStepIdx(stepIdx() + 1)
    }
  }

  const prevStep = () => {
    const step = steps()[stepIdx()]
    if (!step) return
    setStepIdx(stepIdx() - 1)
  }

  const renderStepContent = () => {
    return steps()[stepIdx()]?.children
  }

  const title = () => {
    return steps()[stepIdx()]?.title
  }

  const backButtonClick = () => {
    const backCb = navigator?.back ?? function () {}
    const idx = stepIdx()
    const isAtFirstStep = idx === 0
    return isAtFirstStep ? backCb : prevStep
  }

  const text = () => {
    return steps()[stepIdx()]!.buttonTitle
  }

  return (
    <div class={styles.wizard}>
      <BackButton onClick={backButtonClick()} />
      <Progress value={stepIdx() + 1} max={steps().length} />
      <PageTransition>
        <Show when={stepIdx() + 1} keyed>
          <div class={styles.step}>
            <header class={styles.header}>
              <h1>{title()}</h1>
            </header>
            <div class={styles.content}>{renderStepContent() as unknown as JSX.Element}</div>
          </div>
        </Show>
      </PageTransition>
      <MainButton text={text()} onClick={() => nextStep()} />
    </div>
  )
}
