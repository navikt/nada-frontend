import amplitude from 'amplitude-js'
let amplitudeInstance: amplitude.AmplitudeClient | undefined = undefined
const amplitudeLog = (name: string, eventProperties: any) => {
  if (!window) return
  const AmplitudeConfig = {
    apiEndpoint: 'amplitude.nav.no/collect-auto',
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  }
  if (!amplitudeInstance) {
    amplitudeInstance = amplitude.getInstance()
    amplitudeInstance.init('default', undefined, AmplitudeConfig)
  }
  amplitudeInstance.logEvent(name, eventProperties)
}
export default amplitudeLog
