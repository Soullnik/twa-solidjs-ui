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
import images from './assets/images.json'
import simple from './assets/simple.json'

const App: Component = () => {
  const [tab, setTab] = createSignal('browser')

  const [isOpen, setIsOpen] = createSignal(false)

  const mainButtonHandler = () => {}

  const backButtonHandler = () => {}

  const buttonHandler = () => {}

  return (
    <div class={styles.app}>
      <nav class={styles.nav}>
        <List
          items={[
            {
              name: 'Browser',
              type: 'browser',
            },
            {
              name: 'Tma',
              type: 'tma',
            },
          ]}
        >
          {props => <li onClick={() => setTab(props.item.type)}>{props.item.name}</li>}
        </List>
      </nav>
      <section class={styles.view}>
        <header class={styles.header}>{tab().toUpperCase()}</header>
        <Switch>
          <Match when={tab() === 'browser'}>
            <section class={styles.browser}>
              <Article title={'Article Component'}>
                <code>{'ArticleProps = { title: string; onClick?: VoidFunction }'}</code>
                <Article title={'Article'}>
                  <h2>Lorem ipsum dolor</h2>
                  <p>
                    sit amet consectetur adipisicing elit. Maxime, et reprehenderit. Nisi vel,
                    expedita repellat animi ab quod dolore enim hic facilis assumenda deleniti
                    corrupti, recusandae velit ipsa aut error.
                  </p>
                  <h2>Avatar</h2>
                  <Avatar size={40} name="NIK"></Avatar>
                  <Avatar
                    name="Girl"
                    size={40}
                    url="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=M3w1MzE5MTF8MHwxfHNlYXJjaHw1fHxXb21lbnxlbnwwfHx8fDE3MDA3MjY3Njd8MA&ixlib=rb-4.0.3"
                  ></Avatar>
                </Article>
              </Article>
              <Article title={'Buttons'}>
                <Button text="Button" onClick={buttonHandler}></Button>
                <Tile text="BLBLBALB"></Tile>
                <MainButton text="mainButton" onClick={mainButtonHandler}></MainButton>
                <BackButton onClick={backButtonHandler}></BackButton>
              </Article>
              <Article title={'Card'}>
                <Card></Card>
              </Article>
              <Article title={'Inputs'}>
                <Input
                  onInput={value => console.log(value)}
                  name="input"
                  type="text"
                  label={'text input'}
                  debounce={300}
                ></Input>
                <Input name="input-number" type="number" label={'number input'}></Input>
                <Input type="text" name="input-req" label={'req input'} required></Input>
                <TextArea name="textarea"></TextArea>
                <InputError name="error"></InputError>
                <InputLabel name="label"></InputLabel>
                <Checkbox name="check-box"></Checkbox>
                <Select
                  name="select"
                  value={'value1'}
                  options={[
                    { label: 'value1', value: 'value1' },
                    { label: 'value2', value: 'value3' },
                  ]}
                ></Select>
              </Article>
              <Article title={'Details'}>
                <Details title="Details"></Details>
              </Article>
              <Article title={'List'}>
                <List items={[1, 2, 3, 4, 5, 6]}>
                  {item => {
                    return <div>{item.item}</div>
                  }}
                </List>
              </Article>
              <Article title={'Lottie'}>
                <Lottie width={'40px'} height={'40px'} animationData={simple}></Lottie>
              </Article>
              <Article title={'Modal'}>
                <Button text="Open modal" onClick={() => setIsOpen(true)}></Button>
                <Modal position="bottom" isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
              </Article>
              <Article title={'Progress & Spinner'}>
                <Progress value={5} max={10}></Progress>
                <Spinner></Spinner>
              </Article>
              <Article title={'Slider'}>
                <Slider items={images} effect="cards" grab={true}>
                  {item => <img class={styles.image} src={item.urls.small} />}
                </Slider>
              </Article>
              <Article title={'Tabs'}>
                <Tabs>
                  <Tab text="Tab1" name="tab1">
                    {'Tab 1'}
                  </Tab>
                  <Tab text="Tab2" name="tab2">
                    {'Tab 2'}
                  </Tab>
                </Tabs>
              </Article>
              <Article title={'Wizard'}>
                <Wizard onFinish={() => {}}>
                  <Step buttonTitle="next" title="step1">
                    {'step1'}
                  </Step>
                  <Step buttonTitle="next" title="step2">
                    {'step2'}
                  </Step>
                </Wizard>
              </Article>
              <Article title={'PageTransition'}>
                <PageTransition></PageTransition>
              </Article>
            </section>
          </Match>
          <Match when={tab() === 'tma'}>
            <section class={styles.tma}>
              <Article title="a">{'asdf'}</Article>
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
              <List items={[1, 2, 3, 4, 5, 6]}>
                {item => {
                  return <div>{item.item}</div>
                }}
              </List>
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
              <Wizard onFinish={() => {}}>
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
