import { SELECTED_MODEL } from '@/const/selectModel'
import { CreateMLCEngine, type MLCEngineConfig } from '@mlc-ai/web-llm'

export async function initEngine(engineConfig: MLCEngineConfig) {
  try {
    const engine = await CreateMLCEngine(SELECTED_MODEL, engineConfig)
    return engine
  } catch (error) {
    console.error('Error initializing AI:', error)
  }
}
