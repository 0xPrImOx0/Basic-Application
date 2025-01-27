import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import ShowMoreBox from "../../components/ShowMoreBox";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";
import SubjectCards from "../../components/SubjectCards";
import courses from "../../lib/courses.json";
import Container from "../../components/Container";
import CourseCard from "../../components/CourseCard";

const home = () => {
  const oddCourses = Object.keys(courses)
    .filter((key) => parseInt(key) % 2 !== 0) // Keep only odd keys
    .map((key) => ({ id: key, ...courses[key] })); // Convert to array for FlatList

  const evenCourses = Object.keys(courses)
    .filter((key) => parseInt(key) % 2 === 0) // Keep only even keys
    .map((key) => ({ id: key, ...courses[key] })); // Convert to array for FlatList

  const getCourseByCode = (courses, code) => {
    for (const key in courses) {
      if (courses[key].courseCode === code) {
        return courses[key];
      }
    }
    return null; // If no course with the given courseCode is found
  };

  const [datas, setDatas] = useState(null);
  const [isCourseCardVisible, setIsCourseCardVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to disable button

  const ShowCourseCard = ({ data }) => {
    return (
      <CourseCard
        key={data.courseCode}
        courseIcon={Images[data.courseIcon]}
        courseCode={data.courseCode}
        courseName={data.courseName}
        courseType={data.courseType}
        section={data.section}
        f2fSchedule={data.f2fSchedule}
        roomDesignated={data.roomDesignated}
        onlineSchedule={data.onlineSchedule}
        instructor={data.instructor}
        onPress={closeCourseCard}
      />
    );
  };

  const toggleCourseCard = (courses, courseCode) => {
    try {
      const course = getCourseByCode(courses, courseCode);
      if (!course) {
        console.log(`No course found for the code: ${courseCode}`);
      }
      console.log("Selected course:", course); // Debugging log
      setDatas(course);
      setIsButtonDisabled(true);
      setIsCourseCardVisible(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const closeCourseCard = () => {
    setIsButtonDisabled(false); // Enable the button when the gallery is closed
    setIsCourseCardVisible(false); // Hide the gallery
  };

  return (
    <View className={"w-full h-full"}>
      <Container>
        <View className={"mt-8 mb-10 px-5 w-full"}>
          <View className={"flex-row items-center"}>
            <Image
              source={Images.daugCrop}
              className={"w-14 h-14 rounded-full mr-3"}
            />
            <Text className={"font-extrabold text-2xl text-[#0A0A0A]"}>
              Welcome, Rey!
            </Text>
          </View>
        </View>

        <View className={"px-5"}>
          <ShowMoreBox
            label="Student's Sypnosis"
            icon={Icons.biography}
            borderStyle="mt-8"
          >
            <View className="items-center mt-4">
              <Image
                source={Images.studGrad}
                className={"w-32 h-32 rounded-full"}
              />

              <View className={"pt-3"}>
                <Text
                  className={"font-medium text-xl text-[#0A0A0A] text-center"}
                >
                  Rey Lagumbay Daug Jr.
                </Text>
                <Text
                  className={
                    "font-light italic text-base text-[#6C6C6C] text-center"
                  }
                >
                  Born on October 3, 2004
                </Text>
              </View>
            </View>

            <View className="mt-5 px-2 text-justify">
              <Text className="font-normal text-base text-[[#0A0A0A] text-justify">
                {"\t\t\t"}Rey is a determined and resilient student who sees
                challenges as opportunities for growth. With an unwavering
                problem-solving mindset, he faces every obstacle head-on,
                turning difficulties into stepping stones toward success. Rey’s
                dedication to overcoming hurdles has helped him excel
                academically and earned him admiration from those around him.
                {"\n"}
                {"\t\t\t"}Beyond his studies, Rey enjoys reading books and
                playing games, which fuel his creativity and provide balance in
                his life. Books broaden his imagination and knowledge, while
                games sharpen his strategic thinking and sense of adventure.
                Rey’s perseverance and passion make him an inspiring example of
                how determination and a love for learning can lead to success,
                no matter the odds.{"\n"}
              </Text>
            </View>
          </ShowMoreBox>
        </View>

        <View className={"px-5"}>
          <ShowMoreBox
            label="Class Schedule"
            icon={Icons.event}
            borderStyle="mt-8 mb-8"
          >
            <View className="items-center my-8">
              <Text className="font-bold text-xl text-[#0A0A0A] text-center">
                Legend
              </Text>

              <View className="flex-row justify-between mt-4">
                <View className="flex-row justify-between items-center mr-6">
                  <View className="rounded-full bg-[#FF0004] w-5 h-5 mr-2" />
                  <Text className="font-light italic text-base text-[#6C6C6C]">
                    Major Course
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="rounded-full bg-[#00FF4C] w-5 h-5 mr-2" />
                  <Text className="font-light italic text-base text-[#6C6C6C]">
                    Minor Course
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between w-full items-start mx-3">
              <View className={"w-[48%]"}>
                {oddCourses.map((course, index) => (
                  <SubjectCards
                    key={index}
                    courseIcon={Images[course.courseIcon]}
                    courseType={course.courseType}
                    courseCode={course.courseCode}
                    courseName={course.courseName}
                    courseSched1={`${course.f2fSchedule} ${course.roomDesignated}`}
                    courseSched2={course.onlineSchedule}
                    onPress={() => toggleCourseCard(courses, course.courseCode)}
                    disabled={isButtonDisabled}
                  />
                ))}
              </View>

              <View className={"w-[48%]"}>
                {evenCourses.map((course, index) => (
                  <SubjectCards
                    key={index}
                    courseIcon={Images[course.courseIcon]}
                    courseType={course.courseType}
                    courseCode={course.courseCode}
                    courseName={course.courseName}
                    courseSched1={`${course.f2fSchedule} ${course.roomDesignated}`}
                    courseSched2={course.onlineSchedule}
                    onPress={() => toggleCourseCard(courses, course.courseCode)}
                    disabled={isButtonDisabled}
                  />
                ))}
              </View>
            </View>
          </ShowMoreBox>
        </View>
      </Container>

      {isCourseCardVisible && <ShowCourseCard data={datas} />}
    </View>
  );
};

export default home;
