import { BlockerManager } from './modules/BlockerManager'
import { injectGlobalCssVariables } from './modules/injectGlobalCssVariables'

const blockerManager = new BlockerManager()

blockerManager.start()

injectGlobalCssVariables()
