import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../assets/colors/color";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import motivasyon from "../BilgiKartlariJSON/Motivasyon.json";

export default function MiniQuiz({ route }) {
  const navigation = useNavigation();

  const { colors, themaName, start, end } = route.params;
  const color1 = colors[0];
  const [allQuestions, setAllQuestions] = useState([]);
  const [correctlyAnsweredIds, setCorrectlyAnsweredIds] = useState([]);
  const [correctlyAnsweredThemas, setCorrectlyAnsweredThemas] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mot, setMot] = useState(null);
  const [favLoading, setFavLoading] = useState(false);

  const { user } = UseAuthContext();

  const fetchQuestions = async () => {
    console.log("user.email: " + user.email);
    console.log("themaName: " + themaName);
    try {
      const response = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/questions?thema=${themaName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      const questions = data.questions.map((question) => {
        const options = [
          question.answerA,
          question.answerB,
          question.answerC,
          question.answerD,
        ];
        const correctOption =
          options[question.correctAnswer.charCodeAt(0) - 65];
        return {
          id: question._id,
          question: question.question,
          options: options,
          correct_option: correctOption,
          thema: question.thema,
        };
      });
      setAllQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchQuestions().then(() => setLoading(false));
    }
  }, [user]);

  const Favorite = async (id) => {
    setFavLoading(true);
    try {
      const response = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/favorite/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            user_email: user.email,
            question_id: id,
          }),
        }
      );
      console.log("response: " + response.status);

      if (response.status === 200) {
        setIsFavorite(true);
        setFavLoading(false);
      }
      return response;
    } catch (error) {
        setFavLoading(false);
        console.log(error);
    }
  };

  //correctlyAnsweredIds will be send to backend to save in the user object
  const correctlyAnswered = async (email, correctlyAnsweredIds) => {
    try {
      const response = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/completed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            user_email: email,
            correctlyAnsweredIds: correctlyAnsweredIds,
            correctlyAnsweredThemas: correctlyAnsweredThemas,
          }),
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
      // Set Correctly Answered Ids
      setCorrectlyAnsweredIds([
        ...correctlyAnsweredIds,
        allQuestions[currentQuestionIndex]["id"],
      ]);
      setCorrectlyAnsweredThemas([
        ...correctlyAnsweredThemas,
        allQuestions[currentQuestionIndex]["thema"],
      ]);
    }
    // Show Next Button
    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
      setShowScoreModal(true);
      correctlyAnswered(user.email, correctlyAnsweredIds);
    } else {
      console.log("isFavorite: " + isFavorite);
      setIsFavorite(false);
      setCorrectlyAnsweredIds(correctlyAnsweredIds);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }

    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const newQuiz = async () => {
    console.log("user.email", user.email);
    console.log("themaName", themaName);
    try {
      const response = await fetch(
        `https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/miniQuiz/${user.email}/questions?thema=${themaName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      const questions = data.questions.map((question) => {
        const options = [
          question.answerA,
          question.answerB,
          question.answerC,
          question.answerD,
        ];
        const correctOption =
          options[question.correctAnswer.charCodeAt(0) - 65];
        return {
          id: question._id,
          question: question.question,
          options: options,
          correct_option: correctOption,
        };
      });

      setAllQuestions(questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
      setCorrectlyAnsweredIds([]);
      setCorrectlyAnsweredThemas([]);
      setShowScoreModal(false);
      Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const readData = async () => {
      try {
        setMot(motivasyon);
      } catch (error) {
        console.log(error);
      }
    };

    readData();
  }, []);

  const getRandomMot = () => {
    if (!mot || mot.mots.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * mot.mots.length);
    return mot.mots[randomIndex];
  };

  const randomMot = getRandomMot();

  const LoadingScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={COLORS.primary} style={{paddingBottom:20}} />
        <View>
          {randomMot && (
            <View>
              <Text style={{marginTop:10, fontSize:18}}>{randomMot.content}</Text>
              <Text style={{marginTop:15, fontSize:16, fontWeight:"bold"}}>{randomMot.referrer}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 80,
          display: "flex",
          marginLeft: 2,
        }}
      >
        {/* Question */}
        <Text
          style={{
            color: COLORS.black,
            fontSize: 21,
            marginTop: 15,
            lineHeight: 29,
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: 10,
          width: "100%",
          left: 15,
        }}
      >
        {allQuestions &&
          allQuestions[currentQuestionIndex]?.options.map((option) => (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionsDisabled}
              key={option}
              style={{
                borderWidth: 3,
                borderColor:
                  option == correctOption
                    ? COLORS.success
                    : option == currentOptionSelected
                    ? COLORS.error
                    : color1,
                backgroundColor:
                  option == correctOption
                    ? COLORS.success + "20"
                    : option == currentOptionSelected
                    ? COLORS.error + "20"
                    : color1 + "20",
                height: 55,
                borderRadius: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 5,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 18, color: COLORS.black }}>
                {option}
              </Text>

              {/* Show Check Or Cross Icon based on correct answer*/}
              {/* {option == correctOption ? (
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 30 / 2,
                    backgroundColor: COLORS.success,
                    position: "absolute",
                    right: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: 14,
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: COLORS.white,
                      fontSize: 18,
                    }}
                  />
                </View>
              ) : option == currentOptionSelected ? (
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 30 / 2,
                    backgroundColor: COLORS.error,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    style={{
                      color: COLORS.white,
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null} */}
            </TouchableOpacity>
          ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={1}
          style={{
            flex:1,
            marginTop: 0,
            height: "90%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 15,
            borderRadius: 0,
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
          }}
        >
          <View
          onPress={handleNext}
          style={{
            marginTop: 0,
            height: 50,
            width: 150,
            backgroundColor: color1,
            position: "absolute",
            bottom: 300,
            left: 110,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            
          }}
        >

          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              textAlign: "center",
              position: "absolute",
              left: 15,
              fontWeight: "bold",
            }}
          >
            Sonraki
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            style={{
              color: COLORS.white,
              fontSize: 40,
              position: "absolute",
              right: 15,
            }}
          />
        </View>

        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = useMemo(() => {
    if (!allQuestions || allQuestions.length === 0) {
      return "0%";
    }
    return progress.interpolate({
      inputRange: [0, allQuestions.length],
      outputRange: ["0%", "100%"],
    });
  }, [progress, allQuestions]);

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 0,
          backgroundColor: "#00000020", ////
          position: "absolute",
          top: 50, ////
          left: 20,
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 0,
              backgroundColor: `${color1}`,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const noQuestions = () => {
    console.log("no questions")
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: COLORS.black,
            textAlign: "center",
          }}
        >
          Bu kategorideki tüm soruları cevapladınız, diğer kategorilere göz atın.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.secondary} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: COLORS.white,
          position: "relative",
          width: "100%",
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={COLORS.black}
          style={{
            position: "absolute",
            top: 10,
            left: 20,
            zIndex: 10,
          }}
          onPress={() => navigation.goBack()}
        />

        {favLoading ? (
          <ActivityIndicator
            size="small"
            color={color1}
            style={{
              position: "absolute",
              top: 16,
              right: 85,
            }}
          />
        ) : (
          <MaterialCommunityIcons
          onPress={() => Favorite(allQuestions[currentQuestionIndex].id)}
          name={isFavorite ? "heart" : "heart-outline"}
          size={26}
          color={color1}
          style={{
            position: "absolute",
            top: 16,
            right: 85,
          }}
        />
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 16,
              opacity: 1,
              fontWeight: "bold",
              position: "absolute",
              top: 20,
              right: 45,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 16,
              opacity: 1,
              fontWeight: "bold",
              position: "absolute",
              top: 20,
              right: 21,
            }}
          >
            / {allQuestions.length}
          </Text>
        </View>

        {/* ProgressBar */}
        {renderProgressBar()}

        {loading ? (
          <LoadingScreen />
        ) : (
            allQuestions.length === 0 ? (
              noQuestions()
            ) : (
              <>
                {renderQuestion()}
                {renderOptions()}
              </>
            )
        )}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > allQuestions.length / 2 ? "Tebrikler!" : "Ooops!"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      score > allQuestions.length / 2
                        ? COLORS.success
                        : COLORS.error,
                  }}
                >
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.black,
                    fontWeight: "bold",
                  }}
                >
                  / {allQuestions.length}
                </Text>
              </View>

              <TouchableOpacity
                onPress={newQuiz}
                style={{
                  backgroundColor: color1,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Yeni Quiz
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  backgroundColor: color1,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Geri Dön
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
