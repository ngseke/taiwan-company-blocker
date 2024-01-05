import { type VueWrapper, mount } from '@vue/test-utils'
import AddSubscriptionDialog from './AddSubscriptionDialog.vue'
import Input from '../../../components/Input.vue'
import Button from '../../../components/Button.vue'
import { nextTick } from 'vue'
import Dialog from '../../../components/Dialog.vue'

describe('AddSubscriptionDialog', () => {
  const name = '我的訂閱名稱'
  const url = 'https://google.com'

  let wrapper: VueWrapper<InstanceType<typeof AddSubscriptionDialog>>
  let inputs: Array<VueWrapper<InstanceType<typeof Input>>>
  let buttons: Array<VueWrapper<InstanceType<typeof Button>>>

  beforeEach(() => {
    wrapper = mount(AddSubscriptionDialog)
    inputs = wrapper.findAllComponents(Input)
    buttons = wrapper.findAllComponents(Button)
  })

  test('add subscription', async () => {
    const nameInput = inputs.find((input) => input.props('label') === '名稱')
      ?.find('input')
    const urlInput = inputs.find((input) => input.props('label') === 'URL')
      ?.find('input')

    const submitButton = buttons.find((button) => button.text().match('儲存'))

    const response = wrapper.vm.requestAdd()

    expect(submitButton?.props('disabled')).toBe(true)

    await nameInput?.setValue(name)
    await urlInput?.setValue('invalid url')

    expect(submitButton?.props('disabled')).toBe(true)

    await urlInput?.setValue(url)

    expect(submitButton?.props('disabled')).toBe(false)

    await submitButton?.find('button').trigger('click')

    expect(response).resolves.toMatchObject({ name, url })
  })

  test('open and close dialog', async () => {
    const dialog = wrapper.getComponent(Dialog)
    const cancelButton = buttons.find((button) => button.text().match('取消'))

    expect(dialog.props('open')).toBe(false)
    const response = wrapper.vm.requestAdd()
    await nextTick()
    expect(dialog.props('open')).toBe(true)

    await cancelButton?.find('button').trigger('click')
    await nextTick()

    expect(dialog.props('open')).toBe(false)
    expect(response).rejects.toBeUndefined()
  })

  test('reset fields after reopening the dialog', async () => {
    const nameInput = inputs.find((input) => input.props('label') === '名稱')
      ?.find('input')
    const urlInput = inputs.find((input) => input.props('label') === 'URL')
      ?.find('input')

    const cancelButton = buttons.find((button) => button.text().match('取消'))

    wrapper.vm.requestAdd()

    await nameInput?.setValue(name)
    await urlInput?.setValue(url)
    expect(nameInput?.element.value).toBe(name)
    expect(urlInput?.element.value).toBe(url)

    await cancelButton?.find('button').trigger('click')

    wrapper.vm.requestAdd()
    await nextTick()

    expect(nameInput?.element.value).toBe('')
    expect(urlInput?.element.value).toBe('https://')
  })
})
