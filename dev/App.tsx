import { Switch, type Component, createSignal, Match } from 'solid-js'
import styles from './App.module.css'
import {
  MainButton,
  BackButton,
  Article,
  Avatar,
  Checkbox,
  Button,
  Card,
  Details,
  Input,
  InputError,
  InputLabel,
  List,
  Lottie,
  Modal,
  PageTransition,
  Select,
  Slider,
  Spinner,
  Tabs,
  Tab,
  TextArea,
  Wizard,
  Progress,
  Tile,
  Step,
} from '../src'
import images from './images.json'
import simple from './simple.json'

const App: Component = () => {
  const [tab, setTab] = createSignal<'browser' | 'tma'>('browser')

  const [isOpen, setIsOpen] = createSignal(false)

  const mainButtonHandler = () => {}

  const backButtonHandler = () => {}

  const buttonHandler = () => {}

  return (
    <div class={styles.app}>
      <nav class={styles.nav}>
        <li class={styles.link} onClick={() => setTab('browser')}>
          Browser
        </li>
        <li class={styles.link} onClick={() => setTab('tma')}>
          Tma
        </li>
      </nav>
      <section class={styles.view}>
        <header class={styles.header}>{tab().toUpperCase()}</header>
        <Switch>
          <Match when={tab() === 'browser'}>
            <section class={styles.browser}>
              <Article item="asdf"></Article>
              <MainButton text="mainButton" onClick={mainButtonHandler}></MainButton>
              <BackButton onClick={backButtonHandler}></BackButton>
              <Avatar size={40}></Avatar>
              <Button text="Button" onClick={buttonHandler}></Button>
              <Card></Card>
              <Checkbox name="check-box"></Checkbox>
              <Details title="Details"></Details>
              <Input name="input" type="text"></Input>
              <Input name="input-number" type="number"></Input>
              <Input name="input-req" type="number" required></Input>
              <InputError name="error"></InputError>
              <InputLabel name="label"></InputLabel>
              <List></List>
              <Lottie width={'40px'} height={'40px'} animationData={simple}></Lottie>
              <Modal position="bottom" isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
              <PageTransition></PageTransition>
              <Progress value={5} max={10}></Progress>
              <Select
                name="select"
                value={'value1'}
                options={[
                  { label: 'value1', value: 'value1' },
                  { label: 'value2', value: 'value3' },
                ]}
              ></Select>
              <Slider items={images} effect="cards" grab={true}>
                {item => <img class={styles.image} src={item.urls.small} />}
              </Slider>
              <Spinner></Spinner>
              <Tabs>
                <Tab name="tab1">{'Tab 1'}</Tab>
                <Tab name="tab2">{'Tab 2'}</Tab>
              </Tabs>
              <TextArea name="textarea"></TextArea>
              <Tile></Tile>
              <Wizard onFinish={() => {}} onExit={() => {}}>
                <Step buttonTitle="next" title="step1">
                  {'step1'}
                </Step>
                <Step buttonTitle="next" title="step2">
                  {'step2'}
                </Step>
              </Wizard>
            </section>
          </Match>
          <Match when={tab() === 'tma'}>
            <section class={styles.tma}>
              <Article item="asdf"></Article>
              <MainButton text="mainButton" onClick={mainButtonHandler}></MainButton>
              <BackButton onClick={backButtonHandler}></BackButton>
              <Avatar size={40}></Avatar>
              <Button text="Button" onClick={buttonHandler}></Button>
              <Card></Card>
              <Checkbox name="check-box"></Checkbox>
              <Details title="Details"></Details>
              <Input name="input" type="text"></Input>
              <Input name="input-number" type="number"></Input>
              <Input name="input-req" type="number" required></Input>
              <InputError name="error"></InputError>
              <InputLabel name="label"></InputLabel>
              <List></List>
              <Lottie
                autoplay={true}
                width={'40px'}
                height={'40px'}
                animationData={simple}
              ></Lottie>
              <Modal position="bottom" isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
              <PageTransition></PageTransition>
              <Progress value={5} max={10}></Progress>
              <Select
                name="select"
                value={'value1'}
                options={[
                  { label: 'value1', value: 'value1' },
                  { label: 'value2', value: 'value3' },
                ]}
              ></Select>
              <Slider items={images} effect="cards" grab={true}>
                {item => <img class={styles.image} src={item.urls.small} />}
              </Slider>
              <Spinner></Spinner>
              <Tabs>
                <Tab name="tab1">{'Tab 1'}</Tab>
                <Tab name="tab2">{'Tab 2'}</Tab>
              </Tabs>
              <TextArea name="textarea"></TextArea>
              <Tile></Tile>
              <Wizard onFinish={() => {}} onExit={() => {}}>
                <Step buttonTitle="next" title="step1">
                  {'step1'}
                </Step>
                <Step buttonTitle="next" title="step2">
                  {'step2'}
                </Step>
              </Wizard>
            </section>
          </Match>
        </Switch>
      </section>
    </div>
  )
}

export default App
