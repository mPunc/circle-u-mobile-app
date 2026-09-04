import { Text, View } from 'react-native'

const ValueWithLabel = ({ label = "", value = "" }) => {
  return (
    <View className="flex-initial items-start justify-center w-full gap-1">
      <Text className="text-neutralText text-sm">
        {label}
      </Text>
      <Text className="
        text-xl text-lightText dark:text-darkText
        bg-lightSurface dark:bg-darkSurface
        border border-solid rounded-xl
        border-lightIconInactive dark:border-darkIconInactive
        pl-2 pb-1 pt-2 w-full
      ">
        {value}
      </Text>
    </View>
  )
}

export default ValueWithLabel
