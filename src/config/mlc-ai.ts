import { selectedModel } from '@/const/selectModel'
import { CreateMLCEngine, type MLCEngineConfig } from '@mlc-ai/web-llm'

export async function initProgressCallback(engineConfig: MLCEngineConfig) {
  try {
    const engine = await CreateMLCEngine(selectedModel, engineConfig)
    return engine
  } catch (error) {
    console.error('Error al inicializar la IA:', error)
    return null
  }
}
