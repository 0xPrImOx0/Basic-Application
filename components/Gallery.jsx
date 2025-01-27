import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Images from "../constants/Images";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const getImagesArray = (shsImages) => {
  return Object.entries(shsImages).map(([key, data]) => ({
    id: key,
    source: Images[data.image],
  }));
};

const GalleryImage = ({ imageSource, onPress }) => {
  return (
    <Pressable onPress={onPress} className="w-[48%] aspect-square mb-4">
      <Image
        source={imageSource}
        className="w-full h-full rounded-lg"
        resizeMode="cover"
      />
    </Pressable>
  );
};

const ZoomedImage = ({
  imageSource,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalImages,
}) => {
  const handlePrevious = () => {
    if (currentIndex > 0) {
      onPrev();
    }
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      onNext();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Pressable
      className="absolute inset-0 bg-black items-center justify-center"
      onPress={(e) => {
        // Only close if clicking the background
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* Header with close button */}
      <View className="absolute top-0 left-0 right-0 h-16 flex-row justify-between items-center px-4 bg-black/50 z-50">
        <Text className="text-white text-lg">
          {currentIndex + 1} / {totalImages}
        </Text>
        <Pressable
          onPress={handleClose}
          className="w-10 h-10 items-center justify-center"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-white text-3xl font-bold">×</Text>
        </Pressable>
      </View>

      <Pressable
        className="absolute left-4 top-1/2 z-10 w-12 h-12 items-center justify-center"
        onPress={handlePrevious}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        {currentIndex > 0 && <Text className="text-white text-4xl">‹</Text>}
      </Pressable>

      <Image
        source={imageSource}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.7,
        }}
        resizeMode="contain"
      />

      <Pressable
        className="absolute right-4 top-1/2 z-10 w-12 h-12 items-center justify-center"
        onPress={handleNext}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        {currentIndex < totalImages - 1 && (
          <Text className="text-white text-4xl">›</Text>
        )}
      </Pressable>

      {/* Thumbnails */}
      <View className="absolute bottom-4 w-full px-4">
        <View className="flex-row justify-center space-x-2">
          {Array(totalImages)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
        </View>
      </View>
    </Pressable>
  );
};

const Gallery = ({ isVisible, onClose, shsImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const imagesArray = getImagesArray(shsImages);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNext = () => {
    if (selectedImageIndex < imagesArray.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleCloseZoom = () => {
    setSelectedImageIndex(null);
  };

  if (!isVisible) return null;

  return (
    <View className="absolute inset-0 bg-white">
      <View className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold text-black">
            Senior High Journey
          </Text>
          <Pressable
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text className="text-2xl text-black">×</Text>
          </Pressable>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {imagesArray.map((item, index) => (
            <GalleryImage
              key={item.id}
              imageSource={item.source}
              onPress={() => handleImagePress(index)}
            />
          ))}
        </View>
      </View>

      {selectedImageIndex !== null && (
        <ZoomedImage
          imageSource={imagesArray[selectedImageIndex].source}
          onClose={handleCloseZoom}
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={selectedImageIndex}
          totalImages={imagesArray.length}
        />
      )}
    </View>
  );
};

export default Gallery;
