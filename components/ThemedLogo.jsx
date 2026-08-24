import { Image } from 'react-native'

// images
import Logo from '../assets/img/logo.png'

const ThemedLogo = () => {
  return (
    <Image
      className="size-48"
      source={Logo}
      resizeMode="cover"
    />
  )
}

export default ThemedLogo
