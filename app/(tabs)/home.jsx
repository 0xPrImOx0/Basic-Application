import { View, Text, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ShowMoreBox from "../../components/ShowMoreBox";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";
import SubjectCards from "../../components/SubjectCards";
import courses from "../../lib/courses.json";
import Container from "../../components/Container";
import CourseCard from "../../components/CourseCard";
import CustomButton from "../../components/CustomButton";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const [isCourseCardVisible, setIsCourseCardVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to disable button

  const toggleCourseCard = (courses, courseCode) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const course = getCourseByCode(courses, courseCode);
      if (!course) {
        throw new Error(`No course found for the code: ${courseCode}`);
      }
      console.log("Selected course:", course); // Debugging log
      setDatas(course);
      setIsButtonDisabled(true);
      setIsCourseCardVisible(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeCourseCard = () => {
    setIsButtonDisabled(false); // Enable the button when the gallery is closed
    setIsCourseCardVisible(false); // Hide the gallery
  };

  return (
    <View className={"w-full h-full"}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      <Container>
        <View className={"mt-[25px] mb-[35px] px-[15px] w-full"}>
          <View className={"flex-row items-center"}>
            <Image
              source={Images.daugCrop}
              className={"w-[50px] h-[50px] rounded-full mr-[12px]"}
            />
            <Text className={"font-extrabold text-[20px] text-[#0A0A0A]"}>
              Welcome, Rey!
            </Text>
          </View>
        </View>

        <View className={"px-[15px]"}>
          <ShowMoreBox
            label="Student's Sypnosis"
            icon={Icons.biography}
            styles="mt-[25px]"
          >
            <View className="items-center">
              <Image
                source={Images.studGrad}
                className={"w-[100px] h-[100px] rounded-full"}
              />

              <View className={"pt-[5px]"}>
                <Text
                  className={
                    "font-medium text-[16px] text-[#0A0A0A] text-center"
                  }
                >
                  Rey Lagumbay Daug Jr.
                </Text>
                <Text
                  className={
                    "font-light italic text-[14px] text-[#6C6C6C] text-center"
                  }
                >
                  Born on October 3, 2004
                </Text>
              </View>
            </View>

            <View className="mt-[20px] text-justify">
              <Text className="font-normal text-[14px] text-[[#0A0A0A] text-justify">
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

        <View className={" px-[15px]"}>
          <ShowMoreBox
            label="Class Schedule"
            icon={Icons.event}
            styles="mt-[25px] items-center"
          >
            <View className="items-center mb-[30px]">
              <Text className="font-bold text-[14px] text-[#0A0A0A] text-center">
                Legend
              </Text>

              <View className="flex-row justify-between mt-[13px]">
                <View className="flex-row justify-between items-center mr-[20px]">
                  <View className="rounded-full bg-[#FF0004] w-[15px] h-[15px] mr-[5px]" />
                  <Text className="font-light italic text-[12px] text-[#6C6C6C]">
                    Major Course
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="rounded-full bg-[#00FF4C] w-[15px] h-[15px] mr-[5px]" />
                  <Text className="font-light italic text-[12px] text-[#6C6C6C]">
                    Minor Course
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between w-[350px] items-start">
              <View className={"w-[170px]"}>
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

              <View className={"w-[170px]"}>
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
