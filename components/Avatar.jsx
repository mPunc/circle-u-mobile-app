import { View, Text, Image } from 'react-native'

const Avatar = ({ username, size = 48, imageUrl }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={avatarStyle}
        resizeMode="cover"
      />
    )
  }

  return (
    <View
      style={avatarStyle}
      className="bg-primary items-center justify-center"
    >
      <Text
        style={{ fontSize: size * 0.4 }}
        className="text-primaryText font-bold"
      >
        {username?.charAt(0).toUpperCase() ?? "U"}
      </Text>
    </View>
  )
}

export default Avatar
