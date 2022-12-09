import logo from './Slack-mark-RGB.png'
import Image from 'next/image'

export const SlackLogo = () => (
  <div className="w-12 h-12 flex items-center ml-4">
    <Image src={logo} width="30" height="30" alt="Slack"/>
  </div>
)
